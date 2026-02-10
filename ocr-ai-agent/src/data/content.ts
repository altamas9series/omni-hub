export const siteContent = {
  brand: {
    name: "OCR",
    nameAccent: "AI Agent",
    tagline: "Advanced OCR & Data Capture Agent",
  },

  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Schedule a Demo", href: "/schedule-demo" },
  },

  hero: {
    badge: "AI-Powered Document Intelligence",
    rotatingHeadlines: [
      "High-Accuracy OCR with Layout-Aware Processing",
      "Digitize Documents at Scale in Minutes",
      "Form Extraction & Validation, Automatically",
    ],
    headline: "Turn Paper into Structured Data",
    headlineAccent: "with Advanced OCR & Data Capture",
    subheadline:
      "Layout-aware OCR that enables data digitization, form extraction, and validation at scale. From identity forms to compliance records — capture every field accurately and push data straight into your systems.",
    primaryCta: { label: "Start Free Trial", href: "#cta" },
    secondaryCta: { label: "Schedule a Demo", href: "/schedule-demo" },
    trust: "Trusted by government, financial, and industrial organizations",
    stats: [
      { value: "99%+", label: "OCR Accuracy" },
      { value: "50+", label: "Languages" },
      { value: "10x", label: "Faster Capture" },
      { value: "ERP/CRM/DMS", label: "Integrations" },
    ],
    slides: [
      {
        badge: "AI-Powered Document Intelligence",
        headline: "Turn Paper into Structured Data",
        headlineAccent: "with Advanced OCR & Data Capture",
        subheadline:
          "Layout-aware OCR that enables data digitization, form extraction, and validation at scale. From identity forms to compliance records — capture every field accurately.",
      },
      {
        badge: "Scale in Minutes",
        headline: "Digitize Documents at Scale",
        headlineAccent: "High-Accuracy, Layout-Aware Processing",
        subheadline:
          "AI understands document structure — tables, forms, blocks — not just characters. Push extracted data straight into ERP, CRM, and DMS.",
      },
      {
        badge: "Form Extraction & Validation",
        headline: "From Scan to Structured Data",
        headlineAccent: "Automatically Mapped & Validated",
        subheadline:
          "Document scanning and field recognition with form field mapping and validation. Language-aware extraction for multi-language forms.",
      },
    ],
  },

  scheduleDemo: {
    title: "Schedule a Demo",
    subtitle: "Tell us a bit about yourself and we'll get back to you soon.",
    backToHome: "Back to home",
    form: {
      fullName: "Full name",
      workEmail: "Work email",
      company: "Company",
      phone: "Phone number",
      learn: "What would you like to learn?",
      learnPlaceholder: "e.g. How OCR AI Agent can help us with document capture and form extraction...",
      submit: "Request demo",
    },
  },

  problems: {
    title: "Sound familiar?",
    subtitle: "Manual data entry and basic OCR hold teams back.",
    items: [
      {
        icon: "Clock",
        title: "Manual Data Entry Eats Hours",
        description:
          "Staff retype information from forms, permits, and documents into systems. Error-prone and impossible to scale as volume grows.",
      },
      {
        icon: "FileText",
        title: "Generic OCR Misses Layout & Context",
        description:
          "Standard OCR treats every document the same. Forms, tables, and multi-language text need layout-aware processing — not just character recognition.",
      },
      {
        icon: "Layers",
        title: "No Form Field Mapping or Validation",
        description:
          "Even when you extract text, you still have to map fields and validate data. Without automation, quality and compliance suffer.",
      },
      {
        icon: "EyeOff",
        title: "Data Stuck in Silos",
        description:
          "Scanned documents sit in folders or legacy tools. ERP, CRM, and DMS systems stay disconnected — no single source of truth.",
      },
      {
        icon: "Lock",
        title: "Compliance & Audit Risk",
        description:
          "Identity verification, financial onboarding, and permits require traceability. Manual processes make audits slow and leave gaps.",
      },
      {
        icon: "Hourglass",
        title: "Backlogs of Paper and PDFs",
        description:
          "Permits, onboarding forms, and utility documentation pile up. Processing at scale needs intelligent capture, not more headcount.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "From document to structured data — layout-aware and validated.",
    steps: [
      {
        step: "01",
        icon: "Plug",
        title: "Connect Sources & Upload Documents",
        description:
          "Upload scans, PDFs, or connect to scanners and existing repositories. Support for batch uploads and API ingestion from your workflows.",
      },
      {
        step: "02",
        icon: "Brain",
        title: "Layout-Aware OCR Processing",
        description:
          "AI understands document structure — tables, forms, blocks — not just characters. High-accuracy extraction that respects layout and context.",
      },
      {
        step: "03",
        icon: "FileStack",
        title: "Field Recognition & Data Validation",
        description:
          "Document scanning and field recognition with form field mapping and validation. Language-aware character extraction for multi-language forms.",
      },
      {
        step: "04",
        icon: "Send",
        title: "Push to ERP, CRM & DMS",
        description:
          "Extracted and validated data flows into your ERP, CRM, and DMS systems. No rekeying — digitization that connects to your stack.",
      },
    ],
  },

  features: {
    title: "Why Choose",
    titleAccent: "OCR AI Agent?",
    subtitle:
      "High-accuracy OCR with layout-aware processing, form extraction, and enterprise integrations.",
    items: [
      {
        icon: "FileStack",
        title: "Document Scanning & Field Recognition",
        description:
          "Scan and recognize document layout, tables, and form fields automatically. From identity documents to permits and compliance forms — capture structure and content in one pass.",
      },
      {
        icon: "Target",
        title: "Language-Aware Character Extraction",
        description:
          "Support for 50+ languages and scripts. Language-aware extraction ensures names, addresses, and identifiers are read correctly across global forms and documents.",
      },
      {
        icon: "BarChart3",
        title: "Form Field Mapping & Data Validation",
        description:
          "Map extracted text to your schema and validate against rules. Ensure data quality before it reaches ERP, CRM, or DMS — fewer errors and faster onboarding.",
      },
      {
        icon: "Plug",
        title: "Integration with ERP, CRM & DMS",
        description:
          "Native connectors and APIs for leading ERP, CRM, and document management systems. Digitization that feeds your existing tools — no data silos.",
      },
      {
        icon: "Shield",
        title: "Audit-Ready & Compliant",
        description:
          "Full traceability from source document to structured record. Meet compliance requirements for identity verification, financial onboarding, and regulatory records.",
      },
    ],
  },

  useCases: {
    title: "Built for every sector",
    subtitle: "See how government, finance, and industry use OCR AI Agent for document digitization.",
    items: [
      {
        persona: "Government",
        icon: "Landmark",
        title: "Identity Verification & Permit Forms",
        description:
          "Process identity documents, permit applications, and government forms at scale. Layout-aware OCR and validation keep data accurate and audit-ready.",
        benefit: "Faster citizen services, fewer manual errors",
      },
      {
        persona: "Financial Services",
        icon: "CreditCard",
        title: "Onboarding & Compliance Records",
        description:
          "Digitize KYC forms, onboarding documents, and compliance records. Extract and validate data for CRM and core systems while meeting regulatory requirements.",
        benefit: "Shorter onboarding, full audit trail",
      },
      {
        persona: "Mining & Utilities",
        icon: "Building2",
        title: "Documentation Digitization",
        description:
          "Convert permits, safety records, and utility documentation into structured data. Integrate with DMS and operations systems for a single source of truth.",
        benefit: "Paper backlog cleared, data in one place",
      },
      {
        persona: "Legal & Compliance",
        icon: "Briefcase",
        title: "Contracts & Regulatory Filings",
        description:
          "Extract key fields from contracts and regulatory submissions. Form field mapping and validation ensure data is ready for legal and compliance workflows.",
        benefit: "Faster review, consistent data quality",
      },
    ],
  },

  testimonials: {
    title: "Trusted by operations and compliance teams",
    subtitle:
      "See what teams say about digitizing documents at scale with OCR AI Agent.",
    items: [
      {
        name: "Sarah Chen",
        role: "Operations Director",
        company: "State Permit Authority",
        quote:
          "We cut permit form processing from days to hours. Layout-aware OCR and field mapping mean we finally have one pipeline from paper to our DMS. Accuracy is consistently high.",
        rating: 5,
      },
      {
        name: "Marcus Rivera",
        role: "Head of Compliance",
        company: "Meridian Financial",
        quote:
          "Onboarding and compliance records are now digitized end-to-end. We extract, validate, and push into our CRM — audit trails are complete and our team focuses on exceptions, not data entry.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        role: "Documentation Lead",
        company: "Apex Mining Co",
        quote:
          "Permits and safety documentation used to sit in filing cabinets. OCR AI Agent got everything into our DMS with proper field mapping. Search and compliance are finally under control.",
        rating: 5,
      },
      {
        name: "James Thornton",
        role: "IT Director",
        company: "Nova Utilities",
        quote:
          "Integration with our ERP was straightforward. We upload batches, get validated data out, and our legacy paper backlog is shrinking every month. ROI was clear within a quarter.",
        rating: 5,
      },
    ],
  },

  integrations: {
    title: "Fits your existing stack",
    subtitle: "Connect to ERP, CRM, DMS, and document sources. API and pre-built connectors.",
    items: [
      { name: "SAP", category: "ERP" },
      { name: "Salesforce", category: "CRM" },
      { name: "Microsoft DMS", category: "DMS" },
      { name: "Oracle", category: "ERP" },
      { name: "HubSpot", category: "CRM" },
      { name: "SharePoint", category: "DMS" },
      { name: "Google Drive", category: "Storage" },
      { name: "Box", category: "Storage" },
      { name: "REST API", category: "Integration" },
    ],
  },

  comparison: {
    title: "Manual Data Entry vs OCR AI Agent",
    subtitle: "See how we stack up: high-accuracy OCR, form validation, and system integration at scale.",
    headers: ["", "OCR AI Agent", "Manual / Basic OCR"],
    rows: [
      { feature: "Processing approach", values: ["Layout-aware, AI-driven", "Character-only or manual"] },
      { feature: "Form field mapping", values: ["Automatic mapping & validation", "Manual mapping"] },
      { feature: "Languages", values: ["50+ language-aware", "Limited or single"] },
      { feature: "ERP/CRM/DMS integration", values: ["Native connectors & API", "Manual export/import"] },
      { feature: "Accuracy at scale", values: ["99%+ with validation", "Variable, error-prone"] },
      { feature: "Audit & compliance", values: ["Full traceability", "Gaps and rework"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle: "Everything you need to know about OCR AI Agent.",
    items: [
      {
        question: "What document types are supported?",
        answer:
          "We support scanned images, PDFs (including multi-page), and photos of documents. Forms, tables, identity documents, permits, and mixed layout documents are all handled with layout-aware processing.",
      },
      {
        question: "How does layout-aware processing work?",
        answer:
          "Our AI understands document structure — blocks, tables, form fields — not just raw text. That means higher accuracy for forms and structured documents, and correct mapping of fields to your schema.",
      },
      {
        question: "Which languages are supported?",
        answer:
          "We support 50+ languages with language-aware character extraction. Names, addresses, and identifiers in identity and compliance documents are read accurately across scripts and locales.",
      },
      {
        question: "Can we integrate with our ERP, CRM, or DMS?",
        answer:
          "Yes. We offer pre-built connectors for major ERP, CRM, and DMS systems, plus a REST API for custom integrations. Extracted and validated data can be pushed automatically into your systems.",
      },
      {
        question: "Is data validated before it reaches our systems?",
        answer:
          "Yes. Form field mapping and data validation rules ensure only quality data is sent to your ERP, CRM, or DMS. You can define rules and required fields so bad data is caught before integration.",
      },
      {
        question: "How long does implementation take?",
        answer:
          "Most teams are processing documents within days. Connect your sources, define document types and field mappings, and configure integrations. No lengthy IT projects — we support quick pilots.",
      },
      {
        question: "Is it suitable for compliance and audits?",
        answer:
          "Yes. We provide full traceability from source document to structured record, which supports identity verification, financial onboarding, and regulatory compliance requirements.",
      },
      {
        question: "What about batch and volume?",
        answer:
          "OCR AI Agent is built for scale. Batch uploads and API ingestion are supported, so you can digitize large backlogs and run ongoing capture at high volume.",
      },
      {
        question: "How is our document data secured?",
        answer:
          "We use enterprise-grade security: encryption in transit and at rest, access controls, and compliance-ready practices. Document data is processed according to your retention and privacy policies.",
      },
      {
        question: "Can we export data if we stop using the service?",
        answer:
          "Yes. You can export extracted data and metadata at any time. We support standard formats and assist with data portability as per our policy.",
      },
    ],
  },

  cta: {
    headline: "Digitize at Scale",
    headlineAccent: "with Confidence",
    description:
      "Join government, financial, and industrial teams who turned paper and PDFs into structured data with high-accuracy OCR and validation.",
    primaryCta: { label: "Start Free Trial", href: "#" },
    secondaryCta: { label: "See Live Demo", href: "#" },
    trust: [
      "No credit card required",
      "Free trial with sample documents",
      "Quick setup with your document types",
      "ERP/CRM/DMS integration support",
    ],
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "How It Works", href: "#how-it-works" },
          { label: "Features", href: "#features" },
          { label: "Security", href: "#" },
          { label: "Demo", href: "#cta" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "Integrations", href: "#" },
          { label: "Webinars", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Contact", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Press", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Data Security", href: "#" },
          { label: "GDPR", href: "#" },
        ],
      },
    ],
  },
};
