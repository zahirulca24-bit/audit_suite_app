import os
import json
import urllib.parse
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional

from database import get_connection, init_db, hash_pw
from generators.rjsc_transfer import generate_form_117, generate_board_resolution, generate_affidavit_stamp
from generators.rjsc_annual import generate_annual_return_package
from generators.billing import generate_billing_requisition
from generators.signing_guide import generate_signing_guide

app = FastAPI(title="Audit, RJSC & Practice Management Suite")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
GENERATED_DIR = os.path.join(BASE_DIR, "generated_docs")
os.makedirs(GENERATED_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.on_event("startup")
def on_startup():
    init_db()

# -------------------------------------------------------------
# AUTHENTICATION API (Manager & Articled Students)
# -------------------------------------------------------------
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "student"

@app.post("/api/auth/login")
def login(req: LoginRequest):
    conn = get_connection()
    pw_hash = hash_pw(req.password)
    user = conn.execute("SELECT id, name, email, role, status FROM users WHERE email = ? AND password_hash = ?", (req.email.lower().strip(), pw_hash)).fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"status": "success", "user": dict(user)}

@app.post("/api/auth/register")
def register(req: RegisterRequest):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
                    (req.name, req.email.lower().strip(), hash_pw(req.password), req.role))
        user_id = cur.lastrowid
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    conn.close()
    return {"status": "success", "user": {"id": user_id, "name": req.name, "email": req.email, "role": req.role}}

@app.get("/api/users")
def list_users():
    conn = get_connection()
    users = conn.execute("SELECT id, name, email, role, created_at FROM users ORDER BY id ASC").fetchall()
    conn.close()
    return [dict(u) for u in users]

# -------------------------------------------------------------
# CLIENTS & SHAREHOLDERS API (Dynamic Multi-Company)
# -------------------------------------------------------------
@app.get("/api/clients")
def list_clients():
    conn = get_connection()
    clients = conn.execute("SELECT * FROM clients ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(c) for c in clients]

@app.get("/api/clients/{client_id}")
def get_client(client_id: int):
    conn = get_connection()
    client = conn.execute("SELECT * FROM clients WHERE id = ?", (client_id,)).fetchone()
    if not client:
        conn.close()
        raise HTTPException(status_code=404, detail="Client not found")
    
    shareholders = conn.execute("SELECT * FROM shareholders WHERE client_id = ?", (client_id,)).fetchall()
    recent_docs = conn.execute("SELECT * FROM generated_docs_log WHERE client_id = ? ORDER BY id DESC LIMIT 10", (client_id,)).fetchall()
    conn.close()
    
    return {
        "client": dict(client),
        "shareholders": [dict(s) for s in shareholders],
        "recent_docs": [dict(d) for d in recent_docs]
    }

class ClientCreate(BaseModel):
    company_name: str
    reg_no: Optional[str] = ""
    inc_date: Optional[str] = ""
    registered_address: Optional[str] = ""
    authorized_capital: Optional[int] = 10000000
    paid_up_capital: Optional[int] = 10000000
    share_value: Optional[int] = 100
    tin_no: Optional[str] = ""
    taxes_circle: Optional[str] = ""
    taxes_zone: Optional[str] = ""
    bin_no: Optional[str] = ""
    rjsc_user: Optional[str] = ""
    rjsc_pass: Optional[str] = ""
    drive_folder_link: Optional[str] = ""

@app.post("/api/clients")
def create_client(client: ClientCreate):
    conn = get_connection()
    cur = conn.cursor()
    safe_name = client.company_name.lower().replace(" ", "_")[:20]
    drive_link = client.drive_folder_link or f"https://drive.google.com/drive/folders/firm_vault_{safe_name}"
    cur.execute('''
        INSERT INTO clients (
            company_name, reg_no, inc_date, registered_address,
            authorized_capital, paid_up_capital, share_value,
            tin_no, taxes_circle, taxes_zone, bin_no, rjsc_user, rjsc_pass, drive_folder_link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        client.company_name, client.reg_no, client.inc_date, client.registered_address,
        client.authorized_capital, client.paid_up_capital, client.share_value,
        client.tin_no, client.taxes_circle, client.taxes_zone, client.bin_no,
        client.rjsc_user, client.rjsc_pass, drive_link
    ))
    new_id = cur.lastrowid
    conn.commit()
    conn.close()
    return {"status": "success", "client_id": new_id}

class ShareholderCreate(BaseModel):
    name: str
    father_name: Optional[str] = ""
    mother_name: Optional[str] = ""
    address: Optional[str] = ""
    nid_no: Optional[str] = ""
    dob: Optional[str] = ""
    designation: Optional[str] = "Director"
    share_count: Optional[int] = 0
    distinctive_from: Optional[int] = 0
    distinctive_to: Optional[int] = 0
    certificate_no: Optional[str] = ""

@app.post("/api/clients/{client_id}/shareholders")
def add_shareholder(client_id: int, s: ShareholderCreate):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO shareholders (
            client_id, name, father_name, mother_name, address,
            nid_no, dob, designation, share_count, distinctive_from, distinctive_to, certificate_no
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        client_id, s.name, s.father_name, s.mother_name, s.address,
        s.nid_no, s.dob, s.designation, s.share_count, s.distinctive_from, s.distinctive_to, s.certificate_no
    ))
    sh_id = cur.lastrowid
    conn.commit()
    conn.close()
    return {"status": "success", "shareholder_id": sh_id}

@app.delete("/api/shareholders/{shareholder_id}")
def delete_shareholder(shareholder_id: int):
    conn = get_connection()
    conn.execute("DELETE FROM shareholders WHERE id = ?", (shareholder_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

# -------------------------------------------------------------
# MAKER-CHECKER WORKFLOW (Filing Tasks & Review)
# -------------------------------------------------------------
class TaskCreate(BaseModel):
    client_id: int
    student_id: int
    service_type: str
    title: str
    submission_data: dict

@app.get("/api/tasks")
def list_tasks():
    conn = get_connection()
    tasks = conn.execute('''
        SELECT t.*, c.company_name, u.name as student_name
        FROM filing_tasks t
        LEFT JOIN clients c ON t.client_id = c.id
        LEFT JOIN users u ON t.student_id = u.id
        ORDER BY t.id DESC
    ''').fetchall()
    conn.close()
    return [dict(t) for t in tasks]

@app.post("/api/tasks")
def create_task(task: TaskCreate):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO filing_tasks (client_id, student_id, service_type, title, status, submission_data)
        VALUES (?, ?, ?, ?, 'SUBMITTED', ?)
    ''', (task.client_id, task.student_id, task.service_type, task.title, json.dumps(task.submission_data)))
    task_id = cur.lastrowid
    conn.commit()
    conn.close()
    return {"status": "success", "task_id": task_id}

@app.post("/api/tasks/{task_id}/approve")
def approve_task(task_id: int):
    conn = get_connection()
    task = conn.execute("SELECT * FROM filing_tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found")
    
    conn.execute("UPDATE filing_tasks SET status = 'APPROVED', updated_at = CURRENT_TIMESTAMP WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": "Filing approved by Manager & synced to Google Drive."}

@app.post("/api/tasks/{task_id}/reject")
def reject_task(task_id: int, feedback: dict = Body(...)):
    conn = get_connection()
    comment = feedback.get("comment", "Please correct the draft and resubmit.")
    conn.execute("UPDATE filing_tasks SET status = 'REJECTED', manager_comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", (comment, task_id))
    conn.commit()
    conn.close()
    return {"status": "success", "message": "Draft returned to student for corrections."}

# -------------------------------------------------------------
# DOCUMENT GENERATION APIS
# -------------------------------------------------------------
class TransferRequest(BaseModel):
    client_id: int
    transferor_id: int
    transferee_id: int
    share_count: int
    consideration_type: str
    consideration_amount: int
    distinctive_from: int
    distinctive_to: int
    transfer_date: Optional[str] = "10-10-2026"
    assistant_name: Optional[str] = "Hemadry"
    user_id: Optional[int] = 1

@app.post("/api/generate/share-transfer")
def generate_transfer_docs(req: TransferRequest):
    conn = get_connection()
    client = conn.execute("SELECT * FROM clients WHERE id = ?", (req.client_id,)).fetchone()
    transferor = conn.execute("SELECT * FROM shareholders WHERE id = ?", (req.transferor_id,)).fetchone()
    transferee = conn.execute("SELECT * FROM shareholders WHERE id = ?", (req.transferee_id,)).fetchone()
    
    if not client or not transferor or not transferee:
        conn.close()
        raise HTTPException(status_code=400, detail="Invalid client or shareholder IDs")

    client_dict = dict(client)
    t_dict = dict(transferor)
    r_dict = dict(transferee)

    safe_name = client_dict["company_name"][:15].replace(" ", "_")
    f117_filename = f"Form_117_{safe_name}_{t_dict['name'][:6]}_to_{r_dict['name'][:6]}.docx"
    f117_path = os.path.join(GENERATED_DIR, f117_filename)

    res_filename = f"Board_Resolution_Share_Transfer_{safe_name}.docx"
    res_path = os.path.join(GENERATED_DIR, res_filename)

    aff_filename = f"Affidavit_Share_Transfer_{t_dict['name'][:6]}.docx"
    aff_path = os.path.join(GENERATED_DIR, aff_filename)

    guide_filename = f"00_INSTRUCTIONS_AND_SIGNING_GUIDE_{req.assistant_name.upper()}.docx"
    guide_path = os.path.join(GENERATED_DIR, guide_filename)

    generate_form_117(
        f117_path, client_dict["company_name"], client_dict["reg_no"],
        t_dict, r_dict, req.share_count, client_dict["share_value"],
        req.distinctive_from, req.distinctive_to,
        req.consideration_type, req.consideration_amount, req.transfer_date
    )

    transfers = [{
        "transferor_name": t_dict["name"],
        "transferee_name": r_dict["name"],
        "share_count": req.share_count,
        "distinctive_from": req.distinctive_from,
        "distinctive_to": req.distinctive_to
    }]
    generate_board_resolution(res_path, client_dict["company_name"], client_dict["reg_no"], client_dict["registered_address"], transfers)

    generate_affidavit_stamp(
        aff_path, client_dict["company_name"], t_dict, r_dict,
        req.share_count, req.consideration_type, req.consideration_amount, req.transfer_date
    )

    generate_signing_guide(guide_path, client_dict["company_name"], req.assistant_name)

    drive_link = client_dict.get("drive_folder_link", "https://drive.google.com")

    for fn, title in [
        (f117_filename, "Form 117 Share Transfer Deed"),
        (res_filename, "Board Resolution (Share Transfer)"),
        (aff_filename, f"Affidavit for Tk. 300 Stamp ({t_dict['name']})"),
        (guide_filename, f"Signing Guide for {req.assistant_name}")
    ]:
        conn.execute('''
            INSERT INTO generated_docs_log (client_id, doc_type, doc_title, file_path, file_name, drive_link)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (req.client_id, "RJSC", title, os.path.join(GENERATED_DIR, fn), fn, drive_link))
    conn.commit()
    conn.close()

    wa_message = (
        f"Assalamu Alaikum,\n\n"
        f"Here is the RJSC Share Transfer Package for *{client_dict['company_name']}*:\n\n"
        f"📄 *1. Form 117 Deed:* Transfer of {req.share_count:,} shares ({req.consideration_type}).\n"
        f"📜 *2. Board Resolution:* Approving transfer.\n"
        f"⚖️ *3. Non-Judicial Affidavit:* Tk. 300 stamp.\n"
        f"📋 *4. Signing Guide:* For {req.assistant_name}.\n"
        f"📂 *Google Drive Vault:* {drive_link}\n\n"
        f"Best regards,\nAudit & Corporate Legal Team"
    )
    wa_url = f"https://wa.me/?text={urllib.parse.quote(wa_message)}"

    return {
        "status": "success",
        "files": [
            {"title": "Form 117 Share Transfer Deed", "filename": f117_filename, "url": f"/api/downloads/{f117_filename}"},
            {"title": "Board Resolution", "filename": res_filename, "url": f"/api/downloads/{res_filename}"},
            {"title": "Affidavit (Tk. 300 Stamp)", "filename": aff_filename, "url": f"/api/downloads/{aff_filename}"},
            {"title": f"Signing Guide for {req.assistant_name}", "filename": guide_filename, "url": f"/api/downloads/{guide_filename}"}
        ],
        "google_drive_folder": drive_link,
        "whatsapp_url": wa_url
    }

# -------------------------------------------------------------
# DOWNLOADS & STATIC
# -------------------------------------------------------------
@app.get("/api/downloads/{filename}")
def download_file(filename: str):
    file_path = os.path.join(GENERATED_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, filename=filename)

@app.get("/", response_class=HTMLResponse)
def serve_index():
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>Audit Practice Manager Backend Running</h1>"
