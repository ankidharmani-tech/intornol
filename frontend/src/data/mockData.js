export const CITIES = [
  {
    id: 'thane',
    name: 'Thane, MH',
    state: 'Maharashtra',
    district: 'Thane',
    authority: 'Thane Municipal Corporation (TMC)',
    department: 'Health & Sanitation / Ward Licensing Dept',
    zone: 'Naupada - Kopri Ward Committee #4',
    officer: 'Dr. R. K. Shinde (PIO & Assistant Commissioner)',
    officeAddress: 'Panchpakhadi, Chandanwadi Road, Thane (W) - 400602',
    phone: '+91 22 2533 1590',
    timings: 'Mon - Fri: 10:30 AM – 4:30 PM (Counter 6)',
    feesBreakdown: { fssai: 100, municipal: 500, total: 600 },
    daysEstimate: 22,
  },
  {
    id: 'pune',
    name: 'Pune, MH',
    state: 'Maharashtra',
    district: 'Pune',
    authority: 'Pune Municipal Corporation (PMC)',
    department: 'Health & Food Licensing Division',
    zone: 'Shivajinagar - Ghole Road Ward',
    officer: 'S. V. Kulkarni (Chief Health Inspector)',
    officeAddress: 'PMC Main Building, Shivajinagar, Pune - 411005',
    phone: '+91 20 2550 1000',
    timings: 'Mon - Fri: 10:00 AM – 4:00 PM',
    feesBreakdown: { fssai: 100, municipal: 650, total: 750 },
    daysEstimate: 18,
  },
  {
    id: 'mumbai',
    name: 'Mumbai Suburban, MH',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    authority: 'Brihanmumbai Municipal Corporation (BMC)',
    department: 'Public Health Department / Trade Licences',
    zone: 'K-West Ward (Andheri West)',
    officer: 'P. D. Sawant (Executive Health Officer)',
    officeAddress: 'Paliram Road, Off S.V. Road, Andheri West, Mumbai - 400058',
    phone: '+91 22 2623 9131',
    timings: 'Mon - Fri: 10:30 AM – 3:30 PM',
    feesBreakdown: { fssai: 100, municipal: 800, total: 900 },
    daysEstimate: 25,
  }
];

export const FREQUENT_INTENTS = [
  { label: 'Home Food Kitchen (FSSAI)', query: 'I want to start a home-based food business in Thane' },
  { label: 'Retail Shop & Est. (Gumasta)', query: 'Register a new retail grocery shop under Gumasta in Thane' },
  { label: 'Commercial Power Connection', query: 'Apply for commercial electricity meter MSEDCL Thane' },
  { label: 'Building Renovation NOC', query: 'Get structural renovation NOC from Thane Municipal Corporation' },
  { label: 'Domicile & Income Certificate', query: 'Apply for Tahsildar income and domicile certificate in Thane' },
];

export const ROADMAP_STEPS = [
  {
    id: 'step_1',
    number: '01',
    title: 'Aadhaar Verification & KYC',
    subLabel: 'UIDAI Identity Confirmation',
    mode: 'online',
    status: 'completed',
    fee: 0,
    days: 1,
    portal: 'UIDAI MyAadhaar Portal',
    url: 'https://myaadhaar.uidai.gov.in',
    phone: '1947',
    phoneLabel: 'UIDAI Citizen Helpline (Toll-Free)',
    docsRequired: ['Aadhaar linked with mobile OTP', 'Original laminated Aadhaar'],
    description: 'Verify demographic details (Name, DOB, Gender). Ensure mobile number is linked for Instant e-OTP signing during FSSAI submission.',
    authority: 'Unique Identification Authority of India',
    confidence: '99% Grounded',
    badge: 'Verified',
  },
  {
    id: 'step_2',
    number: '02',
    title: 'Premises Proof & Landlord NOC',
    subLabel: 'Address & Tenancy Compliance',
    mode: 'hybrid',
    status: 'completed',
    fee: 0,
    days: 3,
    portal: 'IGR Maharashtra e-Registration',
    url: 'https://igrmaharashtra.gov.in',
    phone: '+91 20 2605 6526',
    phoneLabel: 'IGR Maharashtra Helpline',
    docsRequired: ['MSEDCL Electricity Bill (<90 days)', 'Registered Rent Agreement with Clause 7 NOC'],
    description: 'Ensure premises address matches electricity consumer account. If rented, obtain landlord signature on Form B consent declaring home kitchen use.',
    authority: 'Inspector General of Registration & Stamps, Maharashtra',
    confidence: '95% Grounded',
    badge: 'Verified',
  },
  {
    id: 'step_3',
    number: '03',
    title: 'FSSAI Basic Registration (Form A)',
    subLabel: 'Food Safety & Standards Authority',
    mode: 'online',
    status: 'active',
    fee: 100,
    days: 7,
    portal: 'FoSCoS Central Portal',
    url: 'https://foscos.fssai.gov.in',
    phone: '1800-112-100',
    phoneLabel: 'FSSAI National Toll-Free Support Desk',
    docsRequired: ['Applicant Photo', 'Govt ID Proof', 'Premises Proof', 'Food Category List'],
    description: 'Submit Form A on FoSCoS portal for petty food business (< ₹12L turnover). Online digital certificate auto-issued upon inspection waiver.',
    authority: 'Food Safety and Standards Authority of India (FSSAI)',
    confidence: '94% Grounded',
    badge: 'Next Up',
  },
  {
    id: 'step_4',
    number: '04',
    title: 'TMC Municipal Health NOC & Trade License',
    subLabel: 'Ward Level Desk Clearance',
    mode: 'offline',
    status: 'pending',
    fee: 500,
    days: 14,
    portal: 'TMC Seva Kendra / Citizen Desk',
    url: 'https://thanecity.gov.in',
    phone: '+91 22 2533 1590',
    phoneLabel: 'TMC Health Licensing Desk (Room 108)',
    docsRequired: ['FSSAI Registration Copy', 'Property Tax Receipt', 'NOC from Society/Landlord', 'Kitchen Sanitation Checklist'],
    description: 'Visit Naupada Ward Office (Counter 6). Submit physical dossier with payment challan. Sanitary inspector conducts physical desk review.',
    authority: 'Thane Municipal Corporation - Public Health Dept',
    confidence: '91% Grounded',
    badge: 'Final Step',
  }
];

export const CHECKLIST_ITEMS = [
  {
    id: 'chk_aadhaar',
    title: 'Aadhaar Card with Mobile OTP',
    category: 'Identity Proof',
    badge: 'Ready',
    badgeType: 'success',
    checked: true,
    commonRejection: 'Name spelling mismatch with bank passbook or expired mobile linkage.',
    link: 'https://myaadhaar.uidai.gov.in',
    docId: 'doc_aadhaar'
  },
  {
    id: 'chk_elec',
    title: 'MSEDCL Paid Electricity Bill (<90 Days)',
    category: 'Address Proof',
    badge: 'Ready',
    badgeType: 'success',
    checked: true,
    commonRejection: 'Bills older than 3 months or faint dot-matrix prints without paid receipt stamp.',
    link: 'https://wss.mahadiscom.in',
    docId: 'doc_address_proof'
  },
  {
    id: 'chk_rent',
    title: 'Registered Rent Agreement + Owner NOC',
    category: 'Premises Tenancy',
    badge: 'In Review',
    badgeType: 'warning',
    checked: false,
    commonRejection: 'Notarized agreement on plain ₹100 stamp paper instead of registered e-stamp agreement.',
    link: 'https://igrmaharashtra.gov.in',
    docId: 'doc_rent_agreement'
  },
  {
    id: 'chk_kitchen',
    title: 'Kitchen & Prep Area Photo (2 Angles)',
    category: 'Physical Inspection',
    badge: 'Action Required',
    badgeType: 'error',
    checked: false,
    commonRejection: 'Close-up blurry photos without visible tiled splashbacks or fire extinguisher.',
    link: 'https://thanecity.gov.in',
    docId: 'doc_shop_photo'
  },
  {
    id: 'chk_fssai_form',
    title: 'Form A Self-Declaration Draft',
    category: 'Statutory Filing',
    badge: 'Ready',
    badgeType: 'success',
    checked: true,
    commonRejection: 'Incorrect turnover bracket selected (>₹12L triggers state license scrutiny).',
    link: 'https://foscos.fssai.gov.in',
    docId: 'doc_form_a'
  }
];

export const DOCUMENT_GUIDES = [
  {
    id: 'doc_aadhaar',
    stepNumber: '1',
    categoryTag: 'Mandatory Identity Proof',
    title: '1. Aadhaar Card (Applicant)',
    holderName: 'SURESH M. JADHAV',
    dob: '14/08/1984',
    docNumber: 'XXXX XXXX 4892 (Masked)',
    instruction: 'Carry original plastic Aadhaar card or laminated colored e-Aadhaar printout with clear Name and DOB matching all municipal filings.',
    rejectionReason: 'Blurred QR code or name mismatch with Bank Passbook (e.g. Suresh vs Sureshchandra).',
    actionText: 'Download e-Aadhaar via UIDAI portal',
    actionUrl: 'https://myaadhaar.uidai.gov.in',
    hasThis: true,
    type: 'aadhaar'
  },
  {
    id: 'doc_address_proof',
    stepNumber: '2',
    categoryTag: 'Valid Address Proof',
    title: '2. Electricity Bill (MSEDCL / Adani)',
    provider: 'MAHAVITARAN (MSEDCL)',
    consumerNo: '015629841203',
    billingMonth: 'Jan 2025 (Under 90 Days)',
    premisesAddress: 'Flat 304, Shivneri CHS, Naupada, Thane (W) - 400602',
    stamp: 'PAID RECEIPT STAMP',
    instruction: 'Carry bill from any of the last 3 months. Consumer name should match applicant or landlord with matching address details.',
    rejectionReason: 'Bills older than 90 days or faint dot-matrix prints without visible payment receipt mark.',
    actionText: 'Get MSEDCL duplicate bill online',
    actionUrl: 'https://wss.mahadiscom.in',
    hasThis: true,
    type: 'electricity'
  },
  {
    id: 'doc_rent_agreement',
    stepNumber: '3',
    categoryTag: 'Premises Ownership Proof',
    title: '3. Registered Rent Agreement + NOC',
    govtLabel: 'GOVT. OF MAHARASHTRA e-STAMP',
    subLabel: 'IGR SUB-REGISTRAR',
    clauseText: 'Clause 7 (Mandatory Commercial Rider): "The licensor permits the licensee to operate home-based packaging & catering from kitchen zone."',
    instruction: 'Carry certified true copy of registered agreement (11-month minimum validity) with owner signature and NOC certificate.',
    rejectionReason: 'Only notarized agreement without Sub-Registrar seal or missing commercial rider clause.',
    actionText: 'Verify agreement via IGR Maharashtra',
    actionUrl: 'https://igrmaharashtra.gov.in',
    hasThis: false,
    type: 'rent'
  },
  {
    id: 'doc_shop_photo',
    stepNumber: '4',
    categoryTag: 'Physical Inspection Spec',
    title: '4. Kitchen & Prep Area Photo',
    specHeader: 'Food Prep Hygiene Standards (FDA Sec 31)',
    checklist: [
      'Stainless steel counter or non-porous working surface',
      'Wash basin with constant running water connection',
      'Covered pedal trash bin with segregation label',
      'Domestic ABC Dry Powder Fire Extinguisher (2kg)'
    ],
    instruction: 'Print two 4x6 inch color photographs showing the full workspace and safety equipment clearly.',
    rejectionReason: 'Poor lighting, showing unfinished brick walls, unsegregated trash, or lack of pest control barrier.',
    actionText: 'Download TMC Sanitation Guidelines PDF',
    actionUrl: 'https://thanecity.gov.in',
    hasThis: false,
    type: 'kitchen'
  }
];

export const CLARIFYING_QUESTIONS = [
  {
    id: 'premises_type',
    question: 'Where will your food preparation and packaging physically take place?',
    options: [
      { id: 'home', label: 'Residential Home Kitchen (Within standard flat/house)', recommended: true },
      { id: 'commercial', label: 'Commercial Galat / Rented Shop premises' },
      { id: 'cloud_kitchen', label: 'Shared Industrial Cloud Kitchen' }
    ],
    selected: 'home'
  },
  {
    id: 'ownership_type',
    question: 'What is your tenancy status for this registered premises?',
    options: [
      { id: 'rented', label: 'Rented flat (Requires Landlord NOC & Agreement)', recommended: true },
      { id: 'owned', label: 'Self-owned / Family owned (Requires Property Tax bill)' },
      { id: 'cooperative', label: 'Cooperative Society allotted' }
    ],
    selected: 'rented'
  },
  {
    id: 'food_category',
    question: 'What type of food products will you be manufacturing or dispatching?',
    options: [
      { id: 'packaged_snacks', label: 'Packaged Dry Snacks / Farsan / Spices (Shelf life > 30 days)', recommended: true },
      { id: 'hot_meals', label: 'Daily Cooked Meals / Tiffin Delivery Service' },
      { id: 'bakery_dairy', label: 'Bakery Confectionery or Milk-based items' }
    ],
    selected: 'packaged_snacks'
  },
  {
    id: 'turnover',
    question: 'What is your anticipated annual turnover bracket for year 1?',
    options: [
      { id: 'under_12L', label: 'Under ₹12 Lakhs / year (Eligible for Basic ₹100 Registration)', recommended: true },
      { id: '12L_to_20Cr', label: '₹12 Lakhs to ₹20 Crores (Requires State License ₹2000/yr)' }
    ],
    selected: 'under_12L'
  }
];

export const NEW_SCHEMES = [
  {
    id: 'scheme_pmegp',
    title: 'PM Employment Generation Programme (PMEGP)',
    category: 'Subsidy & Seed Capital',
    department: 'Ministry of MSME / KVIC',
    benefit: 'Up to 35% capital subsidy for food processing micro-units',
    eligibility: 'Pass 8th standard, age 18+, project cost up to ₹25 Lakhs',
    deadline: 'Open Year-Round (Rolling Admissions)',
    matchScore: '96% Profile Match'
  },
  {
    id: 'scheme_mudra',
    title: 'Pradhan Mantri MUDRA Yojana (Shishu Category)',
    category: 'Collateral-Free Loan',
    department: 'Dept of Financial Services',
    benefit: 'Collateral-free working capital loan up to ₹50,000 at subsidized interest',
    eligibility: 'Home-based vendors, micro-enterprises with valid Aadhaar and FSSAI receipt',
    deadline: 'Continuous at all nationalized bank branches',
    matchScore: '92% Profile Match'
  },
  {
    id: 'scheme_annapurna',
    title: 'Annapurna Mahila Sashaktikaran Scheme',
    category: 'State Women Entrepreneurship',
    department: 'Maharashtra State Mahila Vikas Mahamandal',
    benefit: '₹50,000 grant for kitchen equipment (utensils, gas burners, packaging machines)',
    eligibility: 'Women catering operators in urban municipal jurisdictions (TMC / PMC)',
    deadline: 'Next Batch Closes: 31st Oct 2026',
    matchScore: '89% Profile Match'
  }
];

export const ADMIN_QUEUE_ITEMS = [
  {
    id: 'rev_1042',
    service: 'TMC Trade License (Naupada Ward)',
    sourceUrl: 'https://thanecity.gov.in/services/health/trade-license-v3.html',
    extractedFee: '₹500 (Flat municipal fee for home food up to 5 HP)',
    extractedDays: '14 Days (Statutory Right to Public Service Guarantee)',
    confidence: 0.94,
    extractedAt: '27 Sep 2026, 14:22',
    riskTier: 'Low Risk',
    status: 'Pending Review'
  },
  {
    id: 'rev_1043',
    service: 'FSSAI FoSCoS Petty Food Registration',
    sourceUrl: 'https://foscos.fssai.gov.in/notices/gazette-notification-2026.pdf',
    extractedFee: '₹100 / year (No late penalty if renewed 30 days prior)',
    extractedDays: '7 Days average turnaround',
    confidence: 0.98,
    extractedAt: '27 Sep 2026, 11:05',
    riskTier: 'Low Risk',
    status: 'Pending Review'
  },
  {
    id: 'rev_1044',
    service: 'Maharashtra Pollution Control Board (MPCB) Green Category Consent',
    sourceUrl: 'https://mpcb.gov.in/consent-management/green-units.html',
    extractedFee: 'Exempt for domestic cottage food processing under 12L',
    extractedDays: 'Exemption Certificate Instant',
    confidence: 0.88,
    extractedAt: '26 Sep 2026, 18:40',
    riskTier: 'Medium Risk',
    status: 'Requires Manual Check'
  }
];

export const TASKS_DATA = {
  ongoing: [
    {
      id: 'task_food_business',
      title: 'Home-Based Food Business (FSSAI + TMC License)',
      shortTitle: 'Home-Based Food Business',
      category: 'Food Safety & Trade',
      status: 'Step 3: Ward Desk Verification',
      progress: 60,
      trackingId: 'APP-TMH-FSS-2026-88914',
      authority: 'Thane Municipal Corporation & FSSAI',
      department: 'Health & Ward Sanitation Desk',
      deskLocation: 'Panchpakhadi Ward Office, Room 108, Counter 4',
      handlingOfficer: 'Dr. R. K. Shinde (Assistant Municipal Commissioner)',
      contactPhone: '+91 22 2533 1590 (Ext. 204)',
      estimatedCompletion: '12 Oct 2026 (15 Days RTS Mandate)',
      totalCost: '₹600 (₹100 Paid • ₹500 Counter)',
      timeline: [
        {
          id: 'step_1',
          number: '01',
          title: 'Central FSSAI Registration (Form A)',
          date: '22 Sep 2026 • 11:30 AM',
          status: 'completed',
          statusLabel: 'Completed & Certified',
          summary: 'Online FoSCoS application submitted and ₹100 statutory regulatory fee settled.',
          description: 'The applicant filed Central Food Safety Registration Form A on the FoSCoS portal. Payment reference #MH-TXN-90214 was verified and settled. Digital 14-digit FSSAI Registration number was provisionally granted and QR code generated.',
          authority: 'Food Safety & Standards Authority of India (Central Portal)',
          fee: '₹100 (Online Payment Received)',
          mandate: 'FSSAI Act 2006, Sec 31(1)',
          govLink: 'https://foscos.fssai.gov.in',
          govPortalName: 'FSSAI FoSCoS Portal',
          helplinePhone: '1800-112-100',
          phoneLabel: 'FSSAI National Toll-Free Support Desk',
          docsRequired: ['Aadhaar Card (Self-attested)', 'Passport Photograph', 'Utility Electricity Bill proof of kitchen address'],
          verificationRemarks: 'Digital verification completed. Printout with valid QR code is ready for ward inspection.'
        },
        {
          id: 'step_2',
          number: '02',
          title: 'Document Dossier & Self-Attestation',
          date: '24 Sep 2026 • 03:15 PM',
          status: 'completed',
          statusLabel: 'Dossier Prepared',
          summary: 'Physical document bundle prepared with registered leave & license and kitchen safety layout.',
          description: 'The citizen compiled the physical 5-point dossier required by TMC Ward Health Department. Includes registered rent agreement, electricity bill, and photo of 1kg ABC dry-powder fire extinguisher.',
          authority: 'Citizen Document Verification Protocol',
          fee: 'No charge',
          mandate: 'TMC Ward Standing Order 2021',
          govLink: 'https://igrmaharashtra.gov.in',
          govPortalName: 'IGR Maharashtra e-Registration Portal',
          helplinePhone: '+91 20 2605 6526',
          phoneLabel: 'IGR Maharashtra Citizen Helpline',
          docsRequired: ['Registered Leave & License / Ownership Title', 'Recent Electricity Bill (< 2 months)', 'Kitchen Photograph showing Fire Extinguisher'],
          verificationRemarks: 'All 3 primary address proofs cross-matched with Aadhaar KYC.'
        },
        {
          id: 'step_3',
          number: '03',
          title: 'TMC Municipal Ward Desk Verification',
          date: 'Active • Scheduled 28 Sep 2026, 10:30 AM',
          status: 'in_progress',
          statusLabel: 'Active In-Progress',
          summary: 'Physical verification of society NOC, trade declaration, and counter fee payment at Counter 4.',
          description: 'Applicant must report physically to TMC Naupada-Kopri Ward Office, Room 108. Counter Officer #4 will verify the original society NOC, inspect food handling cleanliness declaration, and collect ₹500 statutory fee.',
          authority: 'Thane Municipal Corporation - Naupada-Kopri Ward Office',
          fee: '₹500 (Payable at Ward Desk Counter 4 via Cash/Ward DD)',
          mandate: 'Maharashtra Municipal Corporations Act Sec 376 & RTS Act 2015',
          govLink: 'https://thanecity.gov.in',
          govPortalName: 'Thane Municipal Citizen Services Portal',
          helplinePhone: '+91 22 2533 1590',
          phoneLabel: 'TMC Naupada-Kopri Ward Counter 4',
          docsRequired: ['Signed Housing Society / Landlord NOC', 'Physical Printout of Form A with QR Code', '₹500 exact cash or Municipal DD'],
          verificationRemarks: 'Queue Token #18 reserved. Counter opens at 10:30 AM.'
        },
        {
          id: 'step_4',
          number: '04',
          title: 'Sanitary Food Safety Ward Inspection',
          date: 'Estimated 04 Oct 2026',
          status: 'upcoming',
          statusLabel: 'Pending Step 3 Clearance',
          summary: 'TMC Sanitary Inspector spot inspection or certified kitchen hygiene affidavit verification.',
          description: 'Following counter document clearance, Ward Health Inspector performs random spot audit of the home kitchen to ensure hygiene standards, adequate ventilation, and pest separation before certificate signoff.',
          authority: 'TMC Health Department & Food Safety Inspection Wing',
          fee: 'Nil (Included in ₹500 Counter Fee)',
          mandate: 'Maharashtra Public Health & Food Hygiene Norms 2018',
          govLink: 'https://thanecity.gov.in/health',
          govPortalName: 'TMC Public Health & Sanitation Wing',
          helplinePhone: '+91 22 2537 1010',
          phoneLabel: 'TMC Health Control Room Helpline',
          docsRequired: ['Food handler hygiene self-declaration', 'Clean potable water test report (municipal supply)'],
          verificationRemarks: 'Will be scheduled within 5 days after Counter 4 physical dossier submission.'
        },
        {
          id: 'step_5',
          number: '05',
          title: 'Final Joint Municipal Trade Accreditation',
          date: 'Target Grant: 12 Oct 2026',
          status: 'upcoming',
          statusLabel: 'Final Delivery Milestone',
          summary: 'Issuance of dual-authorized commercial permit under Maharashtra Right to Services Act.',
          description: 'The Assistant Municipal Commissioner signs the joint certificate. The permanent Trade License and Food Business Operator permit is released on the Aaple Sarkar portal and dispatched via registered Speed Post to citizen premises.',
          authority: 'TMC Executive Health Officer & FSSAI Joint Board',
          fee: 'Nil (Final Delivery)',
          mandate: 'Maharashtra Right to Public Services Act (RTS Guarantee: 15 Working Days)',
          govLink: 'https://aaplesarkar.mahaonline.gov.in',
          govPortalName: 'Aaple Sarkar Maharashtra Citizen Portal',
          helplinePhone: '1800-120-8040',
          phoneLabel: 'Maharashtra RTS Act Citizen Toll-Free Desk',
          docsRequired: ['All preceding stamped receipts', 'Signed Token Clearance Slip'],
          verificationRemarks: 'Direct delivery to residential address and downloadable from citizen dashboard.'
        }
      ]
    },
    {
      id: 'task_solar',
      title: 'Rooftop Solar Net-Metering (MSEDCL)',
      shortTitle: 'Rooftop Solar Net-Metering',
      category: 'Renewable Energy & Power',
      status: 'Step 2: Technical Feasibility Review',
      progress: 35,
      trackingId: 'APP-MSEDCL-SOL-2026-4412',
      authority: 'Maharashtra State Electricity Distribution Co. (MSEDCL)',
      department: 'Thane Urban Circle / Renewable Energy Cell',
      deskLocation: 'Wagle Estate Sub-Division Office',
      handlingOfficer: 'Er. Sandeep Patil (Executive Engineer)',
      contactPhone: '+91 22 2582 3110',
      estimatedCompletion: '24 Oct 2026 (30 Days RTS Mandate)',
      totalCost: '₹1,200 Statutory Processing Fee',
      timeline: [
        {
          id: 'step_s1',
          number: '01',
          title: 'Online Application & Consumer Number Binding',
          date: '15 Sep 2026 • 02:00 PM',
          status: 'completed',
          statusLabel: 'Completed',
          summary: 'Application submitted on Mahavitaran Solar portal and consumer ID linked.',
          description: 'Submitted load sanction request for 3kW on-grid rooftop solar plant with consumer connection #0287103981.',
          authority: 'Mahavitaran Portal (MSEDCL)',
          fee: '₹500 (Online Processing Fee Settled)',
          mandate: 'MERC Grid Interactive Solar Regulations 2019',
          docsRequired: ['MSEDCL Electricity Bill', 'Property Tax Receipt', 'Aadhaar Card'],
          verificationRemarks: 'Technical eligibility cleared for LT-1 domestic tariff.'
        },
        {
          id: 'step_s2',
          number: '02',
          title: 'Technical Feasibility & Distribution Transformer Check',
          date: 'Active • Review In-Progress',
          status: 'in_progress',
          statusLabel: 'Active In-Progress',
          summary: 'Transformer capacity check (80% load cap verification) by Sub-divisional Engineer.',
          description: 'Field engineer evaluates whether the local distribution transformer at Naupada Sector 2 has capacity for additional reverse power flow.',
          authority: 'MSEDCL Wagle Estate Sub-Division',
          fee: 'Nil',
          mandate: 'MERC Regulations Sec 6.3',
          docsRequired: ['Empanelled Solar Vendor Work Proposal', 'Inverter Specification Sheet'],
          verificationRemarks: 'Inspection report expected within 3 business days.'
        },
        {
          id: 'step_s3',
          number: '03',
          title: 'Bi-directional Net Meter Procurement & Testing',
          date: 'Upcoming',
          status: 'upcoming',
          statusLabel: 'Pending Feasibility',
          summary: 'Meter testing at MSEDCL Testing Lab and issuance of seal.',
          description: 'Purchase and lab accuracy calibration of dual-register bi-directional smart meter.',
          authority: 'MSEDCL Central Testing Lab, Kalwa',
          fee: '₹700 (Testing & Sealing Fee)',
          mandate: 'Central Electricity Authority Regulations',
          docsRequired: ['Vendor invoice', 'Meter calibration certificate'],
          verificationRemarks: 'Pending technical sanction.'
        },
        {
          id: 'step_s4',
          number: '04',
          title: 'Final Synchronization & Commercial Commissioning',
          date: 'Target: 24 Oct 2026',
          status: 'upcoming',
          statusLabel: 'Final Milestone',
          summary: 'Joint inspection, net meter installation, and commercial connection energization.',
          description: 'Physical meter replacement and signing of the 25-year Interconnection Agreement.',
          authority: 'MSEDCL & Chief Electrical Inspector (CEI Maharashtra)',
          fee: 'Nil',
          mandate: 'RTS Act Mandated 30 Days',
          docsRequired: ['25-Year Interconnection Agreement', 'Work Completion Certificate'],
          verificationRemarks: 'First generation bill will reflect export credit units.'
        }
      ]
    }
  ],
  upcoming: [
    {
      id: 'task_fire_noc',
      title: 'Commercial Fire Safety NOC Renewal',
      shortTitle: 'Fire Safety NOC Renewal',
      category: 'Public Safety',
      status: 'Application Draft Saved',
      progress: 10,
      trackingId: 'APP-TMC-FIRE-2026-1049',
      authority: 'Thane Fire Services Department',
      department: 'Central Fire Station, Balkum',
      deskLocation: 'Balkum Fire Headquarters, Counter 2',
      handlingOfficer: 'Station Officer V. M. Jadhav',
      contactPhone: '+91 22 2542 2222',
      estimatedCompletion: '30 Oct 2026',
      totalCost: '₹1,500 Municipal Inspection Fee',
      timeline: [
        {
          id: 'step_f1',
          number: '01',
          title: 'Form B Licensed Agency Maintenance Certificate',
          date: 'Upcoming • In Draft',
          status: 'upcoming',
          statusLabel: 'Draft',
          summary: 'Procure biannual Form B compliance certificate from government-approved fire agency.',
          description: 'Audit of fire extinguishers, hose reel, and emergency smoke detectors in commercial establishment.',
          authority: 'Directorate of Maharashtra Fire Services',
          fee: '₹1,000 (Agency charges)',
          mandate: 'Maharashtra Fire Prevention and Life Safety Measures Act 2006',
          docsRequired: ['Current NOC Copy', 'Form B Certificate', 'Building Plan'],
          verificationRemarks: 'Agency inspection pending.'
        }
      ]
    },
    {
      id: 'task_water_conn',
      title: 'Commercial Water Connection Regularization',
      shortTitle: 'Water Connection Regularization',
      category: 'Municipal Infrastructure',
      status: 'Awaiting Ward Survey',
      progress: 0,
      trackingId: 'APP-TMC-WAT-2026-9042',
      authority: 'Thane Municipal Corporation Water Supply Dept',
      department: 'Water Works Division',
      deskLocation: 'Panchpakhadi HQ, Room 204',
      handlingOfficer: 'Executive Engineer (Water Supply)',
      contactPhone: '+91 22 2533 1590',
      estimatedCompletion: '05 Nov 2026',
      totalCost: '₹3,200 Security Deposit & Pipeline Fee',
      timeline: []
    }
  ],
  completed: [
    {
      id: 'task_gumasta',
      title: 'Shop & Establishment (Gumasta License)',
      shortTitle: 'Gumasta License',
      category: 'Labor & Employment',
      status: 'Fully Cleared & Issued',
      progress: 100,
      trackingId: 'MH-GUM-2026-004921',
      authority: 'Government of Maharashtra Labor Department',
      department: 'Labor Commissionerate Thane',
      deskLocation: 'Online Aaple Sarkar Portal',
      handlingOfficer: 'Inspector of Shops & Establishments',
      contactPhone: '+91 22 2536 8812',
      estimatedCompletion: 'Completed 10 Sep 2026',
      totalCost: '₹200 Statutory Fee (Paid)',
      timeline: [
        {
          id: 'step_g1',
          number: '01',
          title: 'Online Form A Registration',
          date: '02 Sep 2026',
          status: 'completed',
          statusLabel: 'Completed',
          summary: 'Form submitted on Aaple Sarkar portal with owner Aadhaar KYC.',
          description: 'Commercial shop registration filed online with Aadhaar biometric verification.',
          authority: 'Labor Department Maharashtra',
          fee: '₹200 (Paid)',
          mandate: 'Maharashtra Shops and Establishments Act 2017',
          docsRequired: ['Aadhaar', 'PAN', 'Shop Front Photograph'],
          verificationRemarks: 'KYC verified instantaneously.'
        },
        {
          id: 'step_g2',
          number: '02',
          title: 'Immediate Digital License Grant',
          date: '10 Sep 2026',
          status: 'completed',
          statusLabel: 'Completed',
          summary: 'Digitally signed Form C Intimation Receipt issued.',
          description: 'Official Gumasta Certificate generated with digital signature of Labor Officer.',
          authority: 'Labor Commissionerate Thane',
          fee: 'Nil',
          mandate: 'Ease of Doing Business Reform',
          docsRequired: ['Form C Certificate'],
          verificationRemarks: 'Certificate issued with lifetime validity for < 10 employees.'
        }
      ]
    }
  ]
};

