import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml

def set_table_borders(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(r'''
        <w:tblBorders xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
            <w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/>
            <w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/>
            <w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>
            <w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/>
            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="AAAAAA"/>
            <w:insideV w:val="single" w:sz="4" w:space="0" w:color="AAAAAA"/>
        </w:tblBorders>
    ''')
    tblPr.append(borders)

def generate_form_117(output_path, company_name, reg_no, transferor, transferee, share_count, share_value, distinctive_from, distinctive_to, consideration_type, consideration_amount, transfer_date="10-10-2026"):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)

    p_header = doc.add_paragraph()
    p_header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r1 = p_header.add_run("THE COMPANIES ACT, 1994\n(ACT XVIII OF 1994)\nFORM NO. 117\n")
    r1.bold = True
    r1.font.size = Pt(13)
    r1.font.name = "Times New Roman"
    
    r2 = p_header.add_run("INSTRUMENT OF TRANSFER OF SHARES\n[Pursuant to Section 38]\n\n")
    r2.bold = True
    r2.font.size = Pt(11)

    p_comp = doc.add_paragraph()
    p_comp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_c = p_comp.add_run(f"Name of Company: {company_name.upper()}\nRegistration No: {reg_no}\n")
    r_c.bold = True
    r_c.font.size = Pt(12)

    doc.add_paragraph("_________________________________________________________________________________").alignment = WD_ALIGN_PARAGRAPH.CENTER

    body = doc.add_paragraph()
    body.paragraph_format.line_spacing = 1.2
    body.paragraph_format.space_after = Pt(10)
    
    if consideration_type.lower() == "gift":
        consideration_text = f"in consideration of natural love and affection (Gift / Hiba) without any monetary payment"
    else:
        consideration_text = f"in consideration of the sum of Tk. {consideration_amount:,}/- paid to me by the Transferee"

    body.add_run(
        f"I, {transferor['name']} (Father: {transferor['father_name']}, Mother: {transferor['mother_name']}, "
        f"Address: {transferor['address']}), hereinafter called 'the Transferor', {consideration_text}, "
        f"do hereby transfer to {transferee['name']} (Father: {transferee['father_name']}, Mother: {transferee['mother_name']}, "
        f"Address: {transferee['address']}), hereinafter called 'the Transferee', "
        f"the {share_count:,} ({share_count} in words) Ordinary Shares numbered {distinctive_from} to {distinctive_to} (both inclusive) "
        f"in the undertaking called {company_name.upper()}, to hold unto the said Transferee, their executors, administrators and assigns, "
        f"subject to the several conditions on which I held the same immediately before the execution thereof.\n\n"
        f"And I, the said Transferee, do hereby agree to take the said shares subject to the conditions aforesaid."
    )

    doc.add_paragraph(f"Dated this {transfer_date}").runs[0].bold = True

    # Signature Table
    table = doc.add_table(rows=4, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table)

    cells = table.rows[0].cells
    cells[0].paragraphs[0].add_run("TRANSFEROR:\n\n\n___________________________\nSignature of Transferor\n" + transferor['name']).bold = True
    cells[1].paragraphs[0].add_run("TRANSFEREE:\n\n\n___________________________\nSignature of Transferee\n" + transferee['name']).bold = True

    cells_w = table.rows[1].cells
    cells_w[0].paragraphs[0].add_run("WITNESS TO TRANSFEROR:\n\nSignature: __________________\nName:\nAddress:\nOccupation:")
    cells_w[1].paragraphs[0].add_run("WITNESS TO TRANSFEREE:\n\nSignature: __________________\nName:\nAddress:\nOccupation:")

    cells_co = table.rows[2].cells
    cells_co[0].paragraphs[0].add_run("VERIFICATION BY COMPANY:\n\nEntered in Register of Transfers:\nDate: ____________\nManaging Director")
    cells_co[1].paragraphs[0].add_run("SANCTION OF BOARD OF DIRECTORS:\n\nSanctioned at Board Meeting held on:\nDate: ____________\nChairman / Managing Director")

    doc.save(output_path)
    return output_path

def generate_board_resolution(output_path, company_name, reg_no, reg_address, transfers_list, meeting_date="10th October 2026"):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(f"{company_name.upper()}\n")
    r.bold = True
    r.font.size = Pt(15)
    
    r2 = p.add_run(f"{reg_address}\nRegistration No: {reg_no}\n")
    r2.font.size = Pt(10)

    doc.add_paragraph("_________________________________________________________________________________").alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_t = p_title.add_run("EXTRACT OF THE MINUTES OF THE MEETING OF THE BOARD OF DIRECTORS\nAPPROVING TRANSFER OF SHARES")
    r_t.bold = True
    r_t.font.size = Pt(12)

    p_body = doc.add_paragraph()
    p_body.paragraph_format.line_spacing = 1.15
    p_body.add_run(
        f"A meeting of the Board of Directors of {company_name.upper()} was held at the Registered Office of the company on {meeting_date} at 11:30 AM.\n\n"
        f"AGENDA: CONSIDERATION AND APPROVAL OF TRANSFER OF SHARES\n\n"
        f"The Chairman placed before the Board the transfer deed(s) (Form 117) and share transfer requests.\n"
        f"The Board after due consideration unanimously passed the following resolutions:\n\n"
    )

    for idx, t in enumerate(transfers_list, 1):
        p_res = doc.add_paragraph()
        p_res.paragraph_format.left_indent = Inches(0.3)
        p_res.add_run(
            f"\"RESOLVED THAT the transfer of {t['share_count']:,} Ordinary Shares of Tk. 100/- each "
            f"bearing Distinctive Nos. {t['distinctive_from']} to {t['distinctive_to']} (both inclusive) "
            f"from {t['transferor_name']} to {t['transferee_name']} be and is hereby approved and sanctioned.\""
        ).bold = True

    p_end = doc.add_paragraph()
    p_end.add_run(
        "\n\"RESOLVED FURTHER THAT the Managing Director be and is hereby authorized to register the said transfers in the "
        "Register of Members and issue new/split share certificates accordingly, and submit necessary statutory forms to RJSC.\"\n\n"
        "Certified True Copy:\n\n\n\n"
        "________________________________________\n"
        "Managing Director / Chairman\n"
        f"{company_name.upper()}"
    )

    doc.save(output_path)
    return output_path

def generate_affidavit_stamp(output_path, company_name, transferor, transferee, share_count, consideration_type, consideration_amount, affidavit_date="10-10-2026"):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(1.8) # Leave top for Tk. 300 Non-Judicial stamp printing
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("BEFORE THE NOTARY PUBLIC, DHAKA, BANGLADESH\nAFFIDAVIT\n(IN RESPECT OF TRANSFER OF SHARES)\n\n")
    r.bold = True
    r.font.size = Pt(13)

    p_body = doc.add_paragraph()
    p_body.paragraph_format.line_spacing = 1.25
    
    if consideration_type.lower() == "gift":
        cons_p = f"That out of natural love and affection, I have gifted {share_count:,} Ordinary Shares to my daughter, {transferee['name']}, without any monetary consideration."
    else:
        cons_p = f"That I have sold and transferred {share_count:,} Ordinary Shares to {transferee['name']} against full and final consideration of Tk. {consideration_amount:,}/- which I have duly received."

    p_body.add_run(
        f"I, {transferor['name']}, Father: {transferor['father_name']}, Mother: {transferor['mother_name']}, "
        f"Address: {transferor['address']}, NID No: {transferor['nid_no']}, Nationality: Bangladeshi by birth, "
        f"do hereby solemnly affirm and declare on oath as follows:\n\n"
        f"1. That I am a bona fide citizen of Bangladesh and a shareholder/director of {company_name.upper()}.\n\n"
        f"2. {cons_p}\n\n"
        f"3. That I have executed the Instrument of Transfer (Form 117) voluntarily and in sound mind without any coercion or undue influence.\n\n"
        f"4. That I have no further claim or lien over the said transferred shares and the company is authorized to transfer the same in the name of the Transferee.\n\n"
        f"That the statements made above are true to the best of my knowledge and belief, in witness whereof I sign this Affidavit on this {affidavit_date}.\n\n\n\n"
        "_____________________________\n"
        "Deponent (Transferor)\n\n"
        "The Deponent is known to me and signed in my presence.\n\n"
        "_____________________________\n"
        "Advocate / Notary Public"
    )

    doc.save(output_path)
    return output_path
