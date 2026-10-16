import sqlite3
import json
import os
import hashlib

DB_PATH = os.path.join(os.path.dirname(__file__), "audit_suite.db")

def hash_pw(pw: str) -> str:
    return hashlib.sha256(pw.encode('utf-8')).hexdigest()

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    c = conn.cursor()
    
    # 1. Users Table (Manager & Articled Students)
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'student', -- 'manager', 'student'
            status TEXT DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # 2. Clients Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT NOT NULL,
            reg_no TEXT,
            inc_date TEXT,
            registered_address TEXT,
            authorized_capital INTEGER DEFAULT 10000000,
            paid_up_capital INTEGER DEFAULT 10000000,
            share_value INTEGER DEFAULT 100,
            tin_no TEXT,
            taxes_circle TEXT,
            taxes_zone TEXT,
            bin_no TEXT,
            rjsc_user TEXT,
            rjsc_pass TEXT,
            drive_folder_link TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # 3. Shareholders / Directors Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS shareholders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER,
            name TEXT NOT NULL,
            father_name TEXT,
            mother_name TEXT,
            address TEXT,
            nid_no TEXT,
            dob TEXT,
            designation TEXT, -- Managing Director, Chairman, Director, Shareholder
            share_count INTEGER DEFAULT 0,
            distinctive_from INTEGER DEFAULT 0,
            distinctive_to INTEGER DEFAULT 0,
            certificate_no TEXT,
            FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
        )
    ''')

    # 4. Filing Tasks / Maker-Checker Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS filing_tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER,
            student_id INTEGER,
            service_type TEXT NOT NULL, -- 'Share Transfer (117)', 'Annual Return', 'Form IX/XII', 'Billing'
            title TEXT NOT NULL,
            status TEXT DEFAULT 'DRAFT', -- 'DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'
            submission_data TEXT, -- JSON string
            manager_comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients (id),
            FOREIGN KEY (student_id) REFERENCES users (id)
        )
    ''')

    # 5. Generated Documents Log
    c.execute('''
        CREATE TABLE IF NOT EXISTS generated_docs_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER,
            task_id INTEGER,
            doc_type TEXT,
            doc_title TEXT,
            file_path TEXT,
            file_name TEXT,
            drive_link TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()

    # Seed Default Users (Manager & Student)
    c.execute("SELECT COUNT(*) FROM users")
    if c.fetchone()[0] == 0:
        c.execute('''
            INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        ''', ("Audit Firm Manager", "manager@audit.com", hash_pw("admin123"), "manager"))

        c.execute('''
            INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        ''', ("Articled Student (Trainee)", "student@audit.com", hash_pw("student123"), "student"))
        conn.commit()

    # Seed Default Clients if empty
    c.execute("SELECT COUNT(*) FROM clients")
    if c.fetchone()[0] == 0:
        c.execute('''
            INSERT INTO clients (
                company_name, reg_no, inc_date, registered_address,
                authorized_capital, paid_up_capital, share_value,
                tin_no, taxes_circle, taxes_zone, bin_no, rjsc_user, rjsc_pass, drive_folder_link
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            "SILVEE AND SINTHEE TRAVEL AGENCY LTD.",
            "C-118168 of 2014-2015",
            "18/09/2014",
            "177, Mahtab Center (8th Floor), Shaheed Syed Nazrul Islam Saroni, Bijoy Nagar, Dhaka-1000",
            10000000,
            10000000,
            100,
            "123456789012",
            "Circle-150 (Companies)",
            "Taxes Zone 7, Dhaka",
            "001234567-0101",
            "silveetravels",
            "Rjsc@2026!",
            "https://drive.google.com/drive/folders/firm_vault_silvee_sinthee"
        ))
        client_id = c.lastrowid

        shareholders_data = [
            ("Mr. Md. Sakhawat Hossain", "Late Abdul Kader", "Late Rahima Begum", "Dream Tower, Flat B-4, 72 Siddeshwari Road, Dhaka", "19652691512345678", "15/07/1965", "Managing Director", 26000, 49001, 75000, "02"),
            ("Mr. Md. Khairul Alam", "Late Shamsul Haque", "Late Sufia Khatun", "House 12, Road 4, Sector 3, Uttara, Dhaka", "19722691587654321", "10/02/1972", "Director", 25000, 75001, 100000, "03"),
            ("Mrs. Taslima Sakhawat", "Late Nurul Islam", "Late Fatema Begum", "Dream Tower, Flat B-4, 72 Siddeshwari Road, Dhaka", "19752691533344455", "05/11/1975", "Director", 49000, 1, 49000, "01"),
            ("Ms. Sanjida Sakhawat Sinthee", "Mr. Md. Sakhawat Hossain", "Mrs. Momotaz Begum", "Dream Tower, Flat B-4, 72 Siddeshwari Road, Shantinagar TSO-1217, Ramna, Dhaka", "3755171158", "18/04/1998", "Chairman", 0, 0, 0, "")
        ]

        for s in shareholders_data:
            c.execute('''
                INSERT INTO shareholders (
                    client_id, name, father_name, mother_name, address,
                    nid_no, dob, designation, share_count, distinctive_from, distinctive_to, certificate_no
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (client_id, *s))

        # Add second sample company for multi-company demonstration
        c.execute('''
            INSERT INTO clients (
                company_name, reg_no, inc_date, registered_address,
                authorized_capital, paid_up_capital, share_value,
                tin_no, taxes_circle, taxes_zone, bin_no, rjsc_user, rjsc_pass, drive_folder_link
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            "GULSHAN PALACE RESORTS & RESTAURANT LTD.",
            "C-98765 of 2018-2019",
            "12/03/2018",
            "House 45, Road 11, Block D, Banani, Dhaka-1213",
            20000000,
            15000000,
            100,
            "987654321012",
            "Circle-110",
            "Taxes Zone 5, Dhaka",
            "009876543-0202",
            "gulshanpalace",
            "Gulshan@2026",
            "https://drive.google.com/drive/folders/firm_vault_gulshan_palace"
        ))
        client2_id = c.lastrowid
        c.execute('''
            INSERT INTO shareholders (client_id, name, father_name, mother_name, address, nid_no, dob, designation, share_count, distinctive_from, distinctive_to, certificate_no)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (client2_id, "Mr. Anisur Rahman", "Late M. Rahman", "Mrs. S. Rahman", "Banani, Dhaka", "19702691511223344", "01/01/1970", "Managing Director", 150000, 1, 150000, "01"))

        conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database updated with Users, Tasks, and Multi-Client schema.")
