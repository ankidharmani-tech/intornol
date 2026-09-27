import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('frontend/public/docs', exist_ok=True)

def create_society_noc():
    width, height = 800, 1100
    img = Image.new('RGB', (width, height), color='#FAFAF9')
    draw = ImageDraw.Draw(img)
    
    # Outer formal border
    draw.rectangle([20, 20, width - 20, height - 20], outline='#CBD5E1', width=2)
    draw.rectangle([26, 26, width - 26, height - 26], outline='#E2E8F0', width=1)
    
    # Header Letterhead
    draw.rectangle([30, 30, width - 30, 150], fill='#F1F5F9')
    draw.text((width//2, 50), "SHREE GANESH CO-OPERATIVE HOUSING SOCIETY LTD.", fill='#0F172A', anchor='mm', font=None)
    draw.text((width//2, 75), "Regd. Under MCS Act 1960 • Registration No: BOM/HSG/TC/10492/2012", fill='#475569', anchor='mm', font=None)
    draw.text((width//2, 95), "Plot No. 42, Ram Maruti Road, Naupada, Thane (West) - 400602", fill='#64748B', anchor='mm', font=None)
    draw.text((width//2, 115), "Email: contact@shreeganeshchs.org • Tel: 022-2540-8812", fill='#64748B', anchor='mm', font=None)
    
    draw.line([30, 150, width - 30, 150], fill='#0F172A', width=3)
    draw.line([30, 154, width - 30, 154], fill='#D97706', width=2)
    
    # Meta
    draw.text((50, 180), "Ref: SGCHS/ADM/NOC-2026/089", fill='#334155', font=None)
    draw.text((width - 50, 180), "Date: 20th September 2026", fill='#334155', anchor='ra', font=None)
    
    # Recipient
    draw.text((50, 220), "To,\nThe Assistant Municipal Commissioner,\nNaupada - Kopri Ward Committee #04,\nThane Municipal Corporation (TMC),\nThane (West) - 400602.", fill='#1E293B', font=None)
    
    # Subject
    draw.rectangle([50, 320, width - 50, 355], fill='#FEF3C7', outline='#F59E0B', width=1)
    draw.text((width//2, 337), "SUBJECT: NO OBJECTION CERTIFICATE (NOC) FOR HOME-BASED KITCHEN", fill='#78350F', anchor='mm', font=None)
    
    # Body text
    body = (
        "Respected Sir / Madam,\n\n"
        "This is to certify that Mr. Suresh Mohan Jadhav is the bona fide registered owner of\n"
        "Residential Flat No. 402, B-Wing, 4th Floor in Shree Ganesh Co-op. Hsg. Society Ltd.,\n"
        "situated on Ram Maruti Road, Naupada, Thane (West).\n\n"
        "The Managing Committee of the Society in its meeting held on 14th September 2026 vide\n"
        "Resolution No. 12/2026 has considered the member's application seeking No Objection to\n"
        "conduct a small-scale, domestic home-based packaged food business (Petty FBO under FSSAI).\n\n"
        "The Society hereby confirms that:\n"
        "1. Society maintenance charges for the said flat are cleared with ZERO outstanding dues.\n"
        "2. The applicant has undertaken to comply with fire safety norms and has installed dry powder\n"
        "   fire extinguishers and piped gas safety cutoff valves.\n"
        "3. No commercial nuisance, heavy delivery vehicle congestion, or common area obstruction shall\n"
        "   be caused to fellow residents.\n\n"
        "The Society has NO OBJECTION to the grant of FSSAI Food Business Registration and TMC Ward\n"
        "Health Department commercial sanction for the aforementioned residential premises.\n\n"
        "Thanking you,\n"
        "Yours faithfully,\n"
        "For Shree Ganesh Co-Operative Housing Society Ltd."
    )
    draw.text((50, 380), body, fill='#1E293B', spacing=8, font=None)
    
    # Circular Stamp simulation
    draw.ellipse([100, 880, 240, 1020], outline='#1D4ED8', width=3)
    draw.ellipse([108, 888, 232, 1012], outline='#1D4ED8', width=1)
    draw.text((170, 930), "SHREE GANESH CHS", fill='#1D4ED8', anchor='mm', font=None)
    draw.text((170, 950), "NAUPADA * THANE", fill='#1D4ED8', anchor='mm', font=None)
    draw.text((170, 970), "REG: 10492 / 2012", fill='#1D4ED8', anchor='mm', font=None)
    
    # Signatures
    draw.text((width - 240, 920), "(P. B. Sawant)", fill='#0F172A', font=None)
    draw.text((width - 240, 940), "Hon. Secretary", fill='#64748B', font=None)
    
    draw.text((width - 120, 920), "(K. R. Deshmukh)", fill='#0F172A', font=None)
    draw.text((width - 120, 940), "Chairman", fill='#64748B', font=None)
    
    # Specimen watermark
    draw.text((width//2, 1060), "OFFICIAL CITIZEN SPECIMEN • SHREE GANESH CHS LTD • VERIFIED FORMAT", fill='#94A3B8', anchor='mm', font=None)
    
    img.save('frontend/public/docs/society-noc-specimen.png', 'PNG')
    print("Created society-noc-specimen.png")

def create_property_tax_receipt():
    width, height = 800, 1100
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)
    
    # Border
    draw.rectangle([20, 20, width - 20, height - 20], outline='#0284C7', width=2)
    
    # TMC Top Header Banner
    draw.rectangle([25, 25, width - 25, 140], fill='#0369A1')
    draw.text((width//2, 50), "THANE MUNICIPAL CORPORATION", fill='#FFFFFF', anchor='mm', font=None)
    draw.text((width//2, 72), "ठाणे महानगरपालिका • मालमत्ता कर संकलन विभाग", fill='#BAE6FD', anchor='mm', font=None)
    draw.text((width//2, 94), "ASSESSMENT & PROPERTY TAX DEPARTMENT • CITIZEN E-RECEIPT", fill='#E0F2FE', anchor='mm', font=None)
    draw.text((width//2, 116), "Panchpakhadi, Chandanwadi Road, Thane (West) - 400602", fill='#BAE6FD', anchor='mm', font=None)
    
    # Receipt title
    draw.rectangle([25, 140, width - 25, 180], fill='#F0F9FF')
    draw.text((width//2, 160), "OFFICIAL PROPERTY TAX PAYMENT CHALLAN (2026 - 2027)", fill='#0369A1', anchor='mm', font=None)
    
    # Details Grid
    draw.rectangle([40, 200, width - 40, 460], outline='#CBD5E1', width=1, fill='#F8FAFC')
    
    info_pairs = [
        ("Receipt No / पावती क्र.:", "TMC/PT/2026/889104", "Receipt Date:", "12-Aug-2026"),
        ("Property ID (UPIC):", "04-NAUP-00402-B", "Ward Office:", "04 - Naupada Kopri"),
        ("Assessee Name / नाव:", "SURESH MOHAN JADHAV", "Mobile No:", "+91 98201 XXXXX"),
        ("Property Address:", "Flat 402, Shree Ganesh CHS, Ram Maruti Road, Naupada, Thane (W)", "Pincode:", "400602"),
        ("Property Usage:", "Residential / Flat (Rateable Value: ₹1,20,000)", "Floor / Wing:", "4th Floor / Wing B"),
        ("Payment Mode:", "BBPS Online (MahaOnline / HDFC Gateway)", "Txn Ref No:", "TXN_TMC_99812401")
    ]
    
    y = 220
    for left_lbl, left_val, right_lbl, right_val in info_pairs:
        draw.text((60, y), left_lbl, fill='#475569', font=None)
        draw.text((230, y), left_val, fill='#0F172A', font=None)
        draw.text((450, y), right_lbl, fill='#475569', font=None)
        draw.text((560, y), right_val, fill='#0F172A', font=None)
        y += 38
    
    # Assessment Breakdown Table
    draw.rectangle([40, 480, width - 40, 520], fill='#E2E8F0')
    draw.text((60, 500), "TAX COMPONENT / कर घटक", fill='#1E293B', anchor='lm', font=None)
    draw.text((width - 60, 500), "AMOUNT (₹)", fill='#1E293B', anchor='rm', font=None)
    
    breakdown = [
        ("General Property Tax (सामान्य कर)", "₹ 8,400.00"),
        ("Water Supply Benefit Tax (जललाभ कर)", "₹ 1,850.00"),
        ("Sewerage & Sanitation Tax (मलनिस्सारण कर)", "₹ 1,200.00"),
        ("Education & Employment Guarantee Cess", "₹ 950.00"),
        ("Tree Cess & Municipal Special Environment Tax", "₹ 450.00"),
        ("Early Payment Rebate (5% Incentive discount)", "- ₹ 642.50"),
    ]
    
    y = 540
    for comp, amt in breakdown:
        draw.text((60, y), comp, fill='#334155', font=None)
        draw.text((width - 60, y), amt, fill='#0F172A', anchor='ra', font=None)
        draw.line([50, y + 25, width - 50, y + 25], fill='#F1F5F9', width=1)
        y += 35
        
    # Total Box
    draw.rectangle([40, y + 10, width - 40, y + 60], fill='#ECFDF5', outline='#10B981', width=2)
    draw.text((60, y + 35), "TOTAL PAID AMOUNT (एकूण भरणा) :", fill='#065F46', anchor='lm', font=None)
    draw.text((width - 60, y + 35), "₹ 12,207.50 (TWELVE THOUSAND TWO HUNDRED SEVEN ONLY)", fill='#065F46', anchor='rm', font=None)
    
    # Big Green Stamp
    draw.rectangle([width - 250, y + 90, width - 70, y + 160], outline='#16A34A', width=3)
    draw.text((width - 160, y + 115), "TMC MUNICIPAL DESK", fill='#16A34A', anchor='mm', font=None)
    draw.text((width - 160, y + 135), "PAID & SETTLED", fill='#16A34A', anchor='mm', font=None)
    
    # QR Code placeholder
    draw.rectangle([60, y + 80, 160, y + 180], fill='#F8FAFC', outline='#64748B', width=2)
    draw.text((110, y + 130), "[ QR CODE ]\nScan to Verify", fill='#475569', anchor='mm', font=None)
    
    # Footer Notice
    draw.text((width//2, 1050), "This is a computer generated statutory tax receipt and does not require physical signature.\nVerify online at https://propertytax.thanecity.gov.in using UPIC: 04-NAUP-00402-B", fill='#64748B', anchor='mm', font=None)
    
    img.save('frontend/public/docs/property-tax-receipt-specimen.png', 'PNG')
    print("Created property-tax-receipt-specimen.png")

create_society_noc()
create_property_tax_receipt()
