import os
import subprocess
import shutil
import sys
import tkinter as tk
from tkinter import messagebox, filedialog
import customtkinter as ctk

# Configure CustomTkinter Appearance
ctk.set_appearance_mode("System")  # "Dark", "Light", "System"
ctk.set_default_color_theme("blue")  # "blue", "green", "dark-blue"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "generated_docs")
os.makedirs(OUTPUT_DIR, exist_ok=True)
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Import Generator Engines
from generators.rjsc_transfer import generate_form_117, generate_board_resolution, generate_affidavit_stamp
from generators.rjsc_annual import generate_annual_return_package
from generators.billing import generate_billing_requisition
from generators.signing_guide import generate_signing_guide


class RJSCDesktopApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("RJSC Corporate Automation Suite - CA Firm Edition (100% Local Desktop)")
        self.geometry("1100x720")
        self.minsize(980, 650)

        # Main Layout (Sidebar + Content View)
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=1)

        self.create_sidebar()
        self.create_content_frames()

        # Select Default Tab
        self.select_tab("share_transfer")

    # -------------------------------------------------------------
    # SIDEBAR NAVIGATION
    # -------------------------------------------------------------
    def create_sidebar(self):
        self.sidebar_frame = ctk.CTkFrame(self, width=240, corner_radius=0)
        self.sidebar_frame.grid(row=0, column=0, sticky="nsew")
        self.sidebar_frame.grid_rowconfigure(7, weight=1)

        self.logo_label = ctk.CTkLabel(
            self.sidebar_frame,
            text="🏛️ RJSC SUITE\nCA FIRM EDITION",
            font=ctk.CTkFont(size=18, weight="bold")
        )
        self.logo_label.grid(row=0, column=0, padx=20, pady=(25, 20))

        self.btn_tab1 = ctk.CTkButton(
            self.sidebar_frame,
            text="🏢 Share Transfer (Form 117)",
            command=lambda: self.select_tab("share_transfer")
        )
        self.btn_tab1.grid(row=1, column=0, padx=15, pady=8, sticky="ew")

        self.btn_tab2 = ctk.CTkButton(
            self.sidebar_frame,
            text="📅 Annual Returns (Form X)",
            command=lambda: self.select_tab("annual_return")
        )
        self.btn_tab2.grid(row=2, column=0, padx=15, pady=8, sticky="ew")

        self.btn_tab3 = ctk.CTkButton(
            self.sidebar_frame,
            text="💰 CA Official Billing",
            command=lambda: self.select_tab("billing")
        )
        self.btn_tab3.grid(row=3, column=0, padx=15, pady=8, sticky="ew")

        self.btn_tab4 = ctk.CTkButton(
            self.sidebar_frame,
            text="👥 Board Reconstitution",
            command=lambda: self.select_tab("board")
        )
        self.btn_tab4.grid(row=4, column=0, padx=15, pady=8, sticky="ew")

        self.btn_open_folder = ctk.CTkButton(
            self.sidebar_frame,
            text="📂 Open Output Folder",
            fg_color="#2b8a3e",
            hover_color="#237032",
            command=self.open_output_folder
        )
        self.btn_open_folder.grid(row=5, column=0, padx=15, pady=(20, 10), sticky="ew")

        # Appearance mode
        self.appearance_label = ctk.CTkLabel(self.sidebar_frame, text="Appearance Mode:", font=ctk.CTkFont(size=11))
        self.appearance_label.grid(row=8, column=0, padx=20, pady=(10, 0))
        self.appearance_option = ctk.CTkOptionMenu(
            self.sidebar_frame,
            values=["System", "Dark", "Light"],
            command=ctk.set_appearance_mode
        )
        self.appearance_option.grid(row=9, column=0, padx=20, pady=(5, 20))

    # -------------------------------------------------------------
    # CONTENT FRAMES
    # -------------------------------------------------------------
    def create_content_frames(self):
        # 1. Share Transfer Frame
        self.frame_share_transfer = ctk.CTkScrollableFrame(self, corner_radius=10)
        self.setup_share_transfer_view(self.frame_share_transfer)

        # 2. Annual Return Frame
        self.frame_annual_return = ctk.CTkScrollableFrame(self, corner_radius=10)
        self.setup_annual_return_view(self.frame_annual_return)

        # 3. Billing Frame
        self.frame_billing = ctk.CTkScrollableFrame(self, corner_radius=10)
        self.setup_billing_view(self.frame_billing)

        # 4. Board Reconstitution Frame
        self.frame_board = ctk.CTkScrollableFrame(self, corner_radius=10)
        self.setup_board_view(self.frame_board)

    def select_tab(self, tab_name):
        self.frame_share_transfer.grid_forget()
        self.frame_annual_return.grid_forget()
        self.frame_billing.grid_forget()
        self.frame_board.grid_forget()

        if tab_name == "share_transfer":
            self.frame_share_transfer.grid(row=0, column=1, padx=20, pady=20, sticky="nsew")
        elif tab_name == "annual_return":
            self.frame_annual_return.grid(row=0, column=1, padx=20, pady=20, sticky="nsew")
        elif tab_name == "billing":
            self.frame_billing.grid(row=0, column=1, padx=20, pady=20, sticky="nsew")
        elif tab_name == "board":
            self.frame_board.grid(row=0, column=1, padx=20, pady=20, sticky="nsew")

    # -------------------------------------------------------------
    # VIEW 1: SHARE TRANSFER (FORM 117 + SET A)
    # -------------------------------------------------------------
    def setup_share_transfer_view(self, parent):
        lbl_title = ctk.CTkLabel(
            parent,
            text="🏢 Share Transfer & Board Induction Engine (Form 117)",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        lbl_title.pack(anchor="w", pady=(5, 15))

        # Quick Demo Button
        btn_demo = ctk.CTkButton(
            parent,
            text="🎲 Quick Fill Demo Data (Silvee & Sinthee)",
            fg_color="#495057",
            command=self.fill_demo_share_transfer
        )
        btn_demo.pack(anchor="w", pady=(0, 15))

        # Grid inputs
        grid_f = ctk.CTkFrame(parent)
        grid_f.pack(fill="x", pady=5)
        grid_f.grid_columnconfigure((0, 1), weight=1)

        # Company details
        self.st_company_name = self.add_field(grid_f, "Company Name:", "SILVEE AND SINTHEE TRAVEL AGENCY LTD.", 0, 0)
        self.st_reg_no = self.add_field(grid_f, "Registration No:", "C-118168", 0, 1)
        self.st_company_address = self.add_field(grid_f, "Registered Address:", "177, Mahtab Center (8th Floor), Bijoy Nagar, Dhaka", 1, 0, colspan=2)

        # Transferor
        lbl_t1 = ctk.CTkLabel(grid_f, text="--- Transferor (হস্তান্তরকারী / বিক্রেতা বা পিতা) ---", font=ctk.CTkFont(weight="bold"))
        lbl_t1.grid(row=2, column=0, columnspan=2, pady=(15, 5), sticky="w")
        self.st_transferor_name = self.add_field(grid_f, "Transferor Full Name:", "MD. SAKHAWAT HOSSAIN", 3, 0)
        self.st_transferor_father = self.add_field(grid_f, "Father's Name:", "Raich Uddin Prodhan", 3, 1)
        self.st_transferor_nid = self.add_field(grid_f, "NID / Passport:", "372 388 9212", 4, 0)
        self.st_transferor_address = self.add_field(grid_f, "Residential Address:", "Dream Tower, Flat-4B, 72 Siddeshwari Road, Dhaka", 4, 1)

        # Transferee
        lbl_t2 = ctk.CTkLabel(grid_f, text="--- Transferee (গ্রহীতা / ক্রেতা বা কন্যা) ---", font=ctk.CTkFont(weight="bold"))
        lbl_t2.grid(row=5, column=0, columnspan=2, pady=(15, 5), sticky="w")
        self.st_transferee_name = self.add_field(grid_f, "Transferee Full Name:", "SANJIDA SAKHAWAT SINTHEE", 6, 0)
        self.st_transferee_father = self.add_field(grid_f, "Father's Name:", "Md. Sakhawat Hossain", 6, 1)
        self.st_transferee_nid = self.add_field(grid_f, "NID No:", "375 517 1158", 7, 0)
        self.st_transferee_address = self.add_field(grid_f, "Residential Address:", "Dream Tower, Flat B-4, 72 Siddeshwari Road, Dhaka", 7, 1)

        # Shares specifics
        lbl_t3 = ctk.CTkLabel(grid_f, text="--- Share & Consideration Details ---", font=ctk.CTkFont(weight="bold"))
        lbl_t3.grid(row=8, column=0, columnspan=2, pady=(15, 5), sticky="w")
        self.st_share_count = self.add_field(grid_f, "Number of Shares:", "25000", 9, 0)
        self.st_face_value = self.add_field(grid_f, "Face Value per Share (BDT):", "100", 9, 1)
        self.st_dist_from = self.add_field(grid_f, "Distinctive Number (From):", "49001", 10, 0)
        self.st_dist_to = self.add_field(grid_f, "Distinctive Number (To):", "74000", 10, 1)

        # Consideration Mode
        lbl_mode = ctk.CTkLabel(grid_f, text="Transfer Mode:", font=ctk.CTkFont(size=12))
        lbl_mode.grid(row=11, column=0, padx=10, pady=(5, 0), sticky="w")
        self.st_mode = ctk.CTkOptionMenu(grid_f, values=["Gift / Heba (পিতা-কন্যা/স্বামী-স্ত্রী দান)", "Sale (বাণিজ্যিক বিক্রয়)"])
        self.st_mode.grid(row=12, column=0, padx=10, pady=(0, 10), sticky="ew")

        self.st_consideration_amt = self.add_field(grid_f, "Consideration Amount (If Sale):", "0", 11, 1)
        self.st_date = self.add_field(grid_f, "Execution Date (DD-MM-YYYY):", "10-10-2026", 13, 0)

        # Action Button
        btn_generate_st = ctk.CTkButton(
            parent,
            text="🚀 GENERATE FULL SHARE TRANSFER PACKAGE (Word & PDF)",
            font=ctk.CTkFont(size=15, weight="bold"),
            height=45,
            fg_color="#102c57",
            hover_color="#0a1d3a",
            command=self.execute_share_transfer_gen
        )
        btn_generate_st.pack(fill="x", pady=(20, 10))

        self.st_status_label = ctk.CTkLabel(parent, text="", font=ctk.CTkFont(size=13, weight="bold"))
        self.st_status_label.pack(anchor="w", pady=5)

    def fill_demo_share_transfer(self):
        self.st_company_name.delete(0, tk.END)
        self.st_company_name.insert(0, "SILVEE AND SINTHEE TRAVEL AGENCY LTD.")
        self.st_reg_no.delete(0, tk.END)
        self.st_reg_no.insert(0, "C-118168")
        self.st_share_count.delete(0, tk.END)
        self.st_share_count.insert(0, "25000")
        self.st_date.delete(0, tk.END)
        self.st_date.insert(0, "10-10-2026")
        messagebox.showinfo("Demo Loaded", "Demo data filled successfully! Click 'Generate' to test.")

    def execute_share_transfer_gen(self):
        try:
            c_name = self.st_company_name.get().strip()
            c_reg = self.st_reg_no.get().strip()
            c_addr = self.st_company_address.get().strip()

            transferor = {
                "name": self.st_transferor_name.get().strip(),
                "father": self.st_transferor_father.get().strip(),
                "nid": self.st_transferor_nid.get().strip(),
                "address": self.st_transferor_address.get().strip()
            }
            transferee = {
                "name": self.st_transferee_name.get().strip(),
                "father": self.st_transferee_father.get().strip(),
                "nid": self.st_transferee_nid.get().strip(),
                "address": self.st_transferee_address.get().strip()
            }

            shares = int(self.st_share_count.get().strip())
            face_val = int(self.st_face_value.get().strip())
            dist_from = int(self.st_dist_from.get().strip())
            dist_to = int(self.st_dist_to.get().strip())
            mode_text = self.st_mode.get()
            cons_type = "Gift" if "Gift" in mode_text else "Sale"
            cons_amt = int(self.st_consideration_amt.get().strip() or "0")
            date_val = self.st_date.get().strip()

            out_prefix = c_name.replace(" ", "_")[:20]
            f117_path = os.path.join(OUTPUT_DIR, f"{out_prefix}_Form_117.docx")
            res_path = os.path.join(OUTPUT_DIR, f"{out_prefix}_Board_Resolution.docx")
            aff_path = os.path.join(OUTPUT_DIR, f"{out_prefix}_Affidavit_Tk300.docx")

            self.st_status_label.configure(text="Generating Form 117...", text_color="blue")
            self.update()

            generate_form_117(
                output_path=f117_path,
                company_name=c_name,
                reg_no=c_reg,
                transferor=transferor,
                transferee=transferee,
                share_count=shares,
                share_value=face_val,
                distinctive_from=dist_from,
                distinctive_to=dist_to,
                consideration_type=cons_type,
                consideration_amount=cons_amt,
                transfer_date=date_val
            )

            transfers_list = [{
                "transferor_name": transferor["name"],
                "transferee_name": transferee["name"],
                "shares": shares,
                "share_value": face_val,
                "type": cons_type,
                "consideration": cons_amt,
                "from_dist": dist_from,
                "to_dist": dist_to
            }]
            generate_board_resolution(res_path, c_name, c_reg, c_addr, transfers_list, meeting_date=date_val)
            generate_affidavit_stamp(aff_path, c_name, transferor, transferee, shares, cons_type, cons_amt, affidavit_date=date_val)

            self.st_status_label.configure(
                text="✅ SUCCESS! Form 117, Board Resolution & Affidavits Generated in output folder!",
                text_color="green"
            )
            messagebox.showinfo("Success", f"All documents generated successfully!\nSaved to: {OUTPUT_DIR}")
        except Exception as e:
            self.st_status_label.configure(text=f"❌ Error: {e}", text_color="red")
            messagebox.showerror("Error", str(e))

    # -------------------------------------------------------------
    # VIEW 2: ANNUAL RETURN (FORM X + SET B)
    # -------------------------------------------------------------
    def setup_annual_return_view(self, parent):
        lbl_title = ctk.CTkLabel(
            parent,
            text="📅 Annual Return (Schedule X) Multi-Year Backlog Engine",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        lbl_title.pack(anchor="w", pady=(5, 15))

        grid_f = ctk.CTkFrame(parent)
        grid_f.pack(fill="x", pady=5)
        grid_f.grid_columnconfigure((0, 1), weight=1)

        self.ar_company_name = self.add_field(grid_f, "Company Name:", "SILVEE AND SINTHEE TRAVEL AGENCY LTD.", 0, 0)
        self.ar_reg_no = self.add_field(grid_f, "Registration No:", "C-118168", 0, 1)
        self.ar_reg_address = self.add_field(grid_f, "Registered Address:", "177, Mahtab Center (8th Floor), Bijoy Nagar, Dhaka", 1, 0, colspan=2)

        self.ar_fy = self.add_field(grid_f, "Financial Year (e.g. 2024-2025):", "2024-2025", 2, 0)
        self.ar_agm_no = self.add_field(grid_f, "AGM Number (e.g. 11th):", "11th", 2, 1)
        self.ar_notice_date = self.add_field(grid_f, "Notice Date:", "14-02-2026", 3, 0)
        self.ar_agm_date = self.add_field(grid_f, "AGM Date:", "28-02-2026", 3, 1)
        self.ar_auditor = self.add_field(grid_f, "Auditor Firm Name (DVC Verified):", "FAMES & R, Chartered Accountants", 4, 0, colspan=2)

        btn_generate_ar = ctk.CTkButton(
            parent,
            text="🚀 GENERATE ANNUAL RETURN SET (Notice, Minutes, Directors' Report & Form X)",
            font=ctk.CTkFont(size=14, weight="bold"),
            height=45,
            fg_color="#0b7285",
            hover_color="#085260",
            command=self.execute_annual_return_gen
        )
        btn_generate_ar.pack(fill="x", pady=(20, 10))
        self.ar_status_label = ctk.CTkLabel(parent, text="", font=ctk.CTkFont(size=13, weight="bold"))
        self.ar_status_label.pack(anchor="w", pady=5)

    def execute_annual_return_gen(self):
        try:
            c_name = self.ar_company_name.get().strip()
            c_reg = self.ar_reg_no.get().strip()
            c_addr = self.ar_reg_address.get().strip()
            fy = self.ar_fy.get().strip()
            agm_no = self.ar_agm_no.get().strip()
            notice_d = self.ar_notice_date.get().strip()
            agm_d = self.ar_agm_date.get().strip()
            auditor = self.ar_auditor.get().strip()

            year_config = {
                "year_label": fy,
                "agm_no": agm_no,
                "notice_date": notice_d,
                "agm_date": agm_d,
                "auditor_name": auditor
            }
            shareholders = [
                {"name": "Taslima Sakhawat", "father": "Md. Fazlul Huq", "address": "Dhaka", "shares": 49000},
                {"name": "Md. Sakhawat Hossain", "father": "Raich Uddin Prodhan", "address": "Dhaka", "shares": 26000},
                {"name": "Md. Khairul Alam", "father": "Md. Sahiduzzaman", "address": "Dhaka", "shares": 25000}
            ]

            generate_annual_return_package(OUTPUT_DIR, c_name, c_reg, c_addr, year_config, shareholders)
            self.ar_status_label.configure(
                text=f"✅ SUCCESS! Full Annual Return Set for {fy} Generated in Output Folder!",
                text_color="green"
            )
            messagebox.showinfo("Success", f"Annual Return for {fy} generated successfully!")
        except Exception as e:
            self.ar_status_label.configure(text=f"❌ Error: {e}", text_color="red")
            messagebox.showerror("Error", str(e))

    # -------------------------------------------------------------
    # VIEW 3: CA OFFICIAL BILLING (1.5% STAMP + 15% VAT)
    # -------------------------------------------------------------
    def setup_billing_view(self, parent):
        lbl_title = ctk.CTkLabel(
            parent,
            text="💰 CA Official Billing Requisition (Airtight 1.5% Stamp + 15% VAT)",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        lbl_title.pack(anchor="w", pady=(5, 15))

        grid_f = ctk.CTkFrame(parent)
        grid_f.pack(fill="x", pady=5)
        grid_f.grid_columnconfigure((0, 1), weight=1)

        self.bill_company_name = self.add_field(grid_f, "Client Company Name:", "SILVEE AND SINTHEE TRAVEL AGENCY LTD.", 0, 0)
        self.bill_address = self.add_field(grid_f, "Client Address:", "177, Mahtab Center (8th Floor), Bijoy Nagar, Dhaka-1000", 0, 1)

        self.bill_share_value = self.add_field(grid_f, "Transferred Share Value (BDT):", "4900000", 1, 0)
        self.bill_rjsc_cost = self.add_field(grid_f, "Corporate Secretarial & Advisory Fee (BDT):", "35000", 1, 1)
        self.bill_register = self.add_field(grid_f, "Share Register & Certificates (BDT):", "10000", 2, 0)
        self.bill_documentation = self.add_field(grid_f, "Documentation & Stamping (BDT):", "15000", 2, 1)
        self.bill_ctc = self.add_field(grid_f, "Certified True Copies - CTC (BDT):", "5000", 3, 0)
        self.bill_date = self.add_field(grid_f, "Bill Date:", "15 October 2026", 3, 1)

        btn_generate_bill = ctk.CTkButton(
            parent,
            text="🚀 GENERATE AIRTIGHT CA BILLING REQUISITION (Word & PDF)",
            font=ctk.CTkFont(size=14, weight="bold"),
            height=45,
            fg_color="#e8590c",
            hover_color="#c94a08",
            command=self.execute_billing_gen
        )
        btn_generate_bill.pack(fill="x", pady=(20, 10))
        self.bill_status_label = ctk.CTkLabel(parent, text="", font=ctk.CTkFont(size=13, weight="bold"))
        self.bill_status_label.pack(anchor="w", pady=5)

    def execute_billing_gen(self):
        try:
            c_name = self.bill_company_name.get().strip()
            c_addr = self.bill_address.get().strip()
            s_val = float(self.bill_share_value.get().strip() or "0")
            c_prof = float(self.bill_rjsc_cost.get().strip() or "35000")
            c_reg = float(self.bill_register.get().strip() or "10000")
            c_doc = float(self.bill_documentation.get().strip() or "15000")
            c_ctc = float(self.bill_ctc.get().strip() or "5000")
            b_date = self.bill_date.get().strip()

            # Calculations
            stamp_duty = s_val * 0.015
            statutory_sub = stamp_duty + 1000.0  # + Form 117/XII fee
            vat_15 = statutory_sub * 0.15
            item1_total = statutory_sub + vat_15

            items = [
                {
                    "sn": "1.",
                    "desc": f"Statutory Government Fees, 1.5% Ad-Valorem Stamp Duty & Applicable VAT (As per NBR & Treasury Challan):\n"
                            f"• 1.5% Stamp Duty on BDT {s_val:,.2f} = Tk. {stamp_duty:,.2f}\n"
                            f"• Statutory Filing Fees for Form 117 (02 Sets) & Form XII = Tk. 1,000.00\n"
                            f"• Add: 15% Statutory Government VAT = Tk. {vat_15:,.2f}",
                    "amount": f"{item1_total:,.2f}"
                },
                {
                    "sn": "2.",
                    "desc": "Professional Fees for Corporate Secretarial Advisory, Board Reconstitution & Regulatory Scrutiny under Companies Act 1994",
                    "amount": f"{c_prof:,.2f}"
                },
                {
                    "sn": "3.",
                    "desc": "Statutory Updation of Register of Members, Transfer Registers & Issuance of Share Certificates (Sec. 34 & 38)",
                    "amount": f"{c_reg:,.2f}"
                },
                {
                    "sn": "4.",
                    "desc": "Legal Documentation, Non-Judicial Stamping, Notary Public Attestation & Digital Filing Charges",
                    "amount": f"{c_doc:,.2f}"
                },
                {
                    "sn": "5.",
                    "desc": "Cost of Certified True Copies (CTC) Procurement from RJSC",
                    "amount": f"{c_ctc:,.2f}"
                }
            ]

            out_bill_docx = os.path.join(OUTPUT_DIR, f"{c_name[:15]}_CA_BILLING_REQUISITION.docx")
            generate_billing_requisition(
                output_path=out_bill_docx,
                client_name=c_name,
                client_address=c_addr,
                invoice_no="FAMES/RJSC/2026/01",
                bill_date=b_date,
                items=items,
                advance_paid=0
            )

            total_bill = item1_total + c_prof + c_reg + c_doc + c_ctc
            self.bill_status_label.configure(
                text=f"✅ SUCCESS! Total Bill: BDT {total_bill:,.2f} (Saved to Word in Output Folder)",
                text_color="green"
            )
            messagebox.showinfo("Success", f"Billing Requisition Generated!\nTotal: BDT {total_bill:,.2f}")
        except Exception as e:
            self.bill_status_label.configure(text=f"❌ Error: {e}", text_color="red")
            messagebox.showerror("Error", str(e))

    # -------------------------------------------------------------
    # VIEW 4: BOARD RECONSTITUTION
    # -------------------------------------------------------------
    def setup_board_view(self, parent):
        lbl_title = ctk.CTkLabel(
            parent,
            text="👥 Board Reconstitution & Directorship Engine (Form IX & XII)",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        lbl_title.pack(anchor="w", pady=(5, 15))

        lbl_info = ctk.CTkLabel(
            parent,
            text="This module prepares Form IX (Candidate Consent) and Form XII (Return of Directors) for new appointments or resignations.",
            font=ctk.CTkFont(size=12)
        )
        lbl_info.pack(anchor="w", pady=(0, 15))

    # -------------------------------------------------------------
    # HELPER UTILITIES
    # -------------------------------------------------------------
    def add_field(self, parent, label_text, default_val, row, col, colspan=1):
        lbl = ctk.CTkLabel(parent, text=label_text, font=ctk.CTkFont(size=12))
        lbl.grid(row=row * 2, column=col, columnspan=colspan, padx=10, pady=(5, 0), sticky="w")
        entry = ctk.CTkEntry(parent, width=320 if colspan == 1 else 660)
        entry.insert(0, default_val)
        entry.grid(row=row * 2 + 1, column=col, columnspan=colspan, padx=10, pady=(0, 10), sticky="ew")
        return entry

    def open_output_folder(self):
        if os.path.exists(OUTPUT_DIR):
            os.startfile(OUTPUT_DIR)
        else:
            messagebox.showwarning("Warning", "Output directory does not exist yet.")


if __name__ == "__main__":
    app = RJSCDesktopApp()
    app.mainloop()
