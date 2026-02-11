/**
 * Landing page and app content – single source of truth.
 * Structure aligned with OmniOrder / 9series landing pattern.
 */

export const siteContent = {
  brand: {
    name: "Omni",
    nameAccent: "Reagent",
    tagline: "EPA PFAS Reporting Made Simple with AI",
  },

  nav: {
    links: [
      { label: "The Challenge", href: "#problem" },
      { label: "How It Works", href: "#solution" },
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Schedule a Demo", href: "/schedule-demo" },
  },

  hero: {
    badge: "October 2026 EPA Deadline Approaching",
    headline: "EPA PFAS Reporting",
    headlineAccent: "Made Simple with AI",
    description:
      "Automatically scan 12 years of documents to identify PFAS substances and generate your EPA submission—in weeks, not months.",
    primaryCta: { label: "Schedule a Demo", href: "/schedule-demo" },
    trust: "Trusted by manufacturers across automotive, electronics, and industrial sectors",
    stats: [
      { value: "12,000+", label: "PFAS Chemicals Identified" },
      { value: "90 Days", label: "Average Completion Time" },
      { value: "90%", label: "Cost Savings vs Consultants" },
      { value: "99%+", label: "Accuracy Rate" },
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
      learnPlaceholder: "e.g. How OmniReagent can help with EPA PFAS reporting...",
      submit: "Request demo",
    },
  },

  problems: {
    badge: "Critical Compliance Deadline",
    title: "The October 2026 Deadline Is",
    titleAccent: "Closer Than You Think",
    subtitle:
      "If your company manufactured or imported PFAS-containing products between 2011-2022, you're required to report to the EPA under TSCA Section 8(a)(7).",
    items: [
      {
        icon: "FileSearch",
        title: "12 Years of Records",
        description:
          "Review thousands of invoices, shipping documents, and supplier communications from 2011-2022",
      },
      {
        icon: "AlertTriangle",
        title: "12,000+ PFAS Chemicals",
        description:
          "Identify substances appearing as trade names, CAS numbers, or generic descriptions like 'fluoropolymer coating'",
      },
      {
        icon: "Building2",
        title: "Complex Supply Chains",
        description: "Your suppliers may not even know what's in the materials they sold you",
      },
      {
        icon: "Scale",
        title: "'Known or Reasonably Ascertainable'",
        description:
          "The EPA standard requires exhaustive due diligence across your entire documentation",
      },
      {
        icon: "Globe",
        title: "Public Disclosure",
        description:
          "Your PFAS data becomes public record with potential litigation and market access risks",
      },
    ],
    traditionalTitle: "The Traditional Approach",
    traditionalBody:
      "Hiring environmental consultants typically falls within the five to six figure range and can take several months of manual document review. Even then, accuracy is not always guaranteed.",
    traditionalCta: "There's a better way.",
  },

  howItWorks: {
    title: "AI-Powered PFAS Compliance",
    titleAccent: "in 90 Days",
    subtitle:
      "Our platform combines advanced document intelligence with chemical expertise to automate your entire PFAS reporting process.",
    steps: [
      {
        step: "01",
        icon: "Upload",
        title: "Upload Your Documents",
        description:
          "Simply provide your historical invoices, purchase orders, bills of lading, and supplier documentation from 2011-2022. We accept PDFs, scanned images, Excel files, emails—any format.",
      },
      {
        step: "02",
        icon: "Brain",
        title: "AI Extraction & Analysis",
        items: [
          "Extracts product names, suppliers, quantities, and dates from messy documents",
          "Identifies potential PFAS substances using trade names, CAS numbers, and chemical descriptions",
          "Maps your supply chain to flag high-risk suppliers and materials",
          "Cross-references against EPA's PFAS database (12,000+ substances)",
        ],
      },
      {
        step: "03",
        icon: "UserCheck",
        title: "Expert Review & Validation",
        description:
          "Our compliance experts review AI-flagged items for accuracy, resolve ambiguities, and ensure regulatory compliance.",
      },
      {
        step: "04",
        icon: "FileCheck",
        title: "EPA Submission Package",
        items: [
          "Detailed PFAS inventory by chemical, year, and volume",
          "Supplier documentation and chain of custody",
          "Gap analysis and recommendations",
          "Draft EPA Form ready for CDX portal submission",
        ],
      },
    ],
    timelineLabel: "Timeline:",
    timelineValue: "60-90 days from document upload to final report",
  },

  benefits: {
    title: "Why Choose Our",
    titleAccent: "AI-First Approach?",
    subtitle:
      "Combine the precision of AI with expert human oversight for unmatched compliance confidence.",
    items: [
      {
        icon: "Clock",
        title: "10x Faster Than Manual Review",
        description:
          "What takes consultants 6-12 months, our AI completes in 60-90 days. Meet the October 2026 deadline with time to spare.",
      },
      {
        icon: "DollarSign",
        title: "90%+ Cost Savings",
        description:
          "Typical consultant fees: $50K-$200K. Our solution: Starting at $15K for mid-market companies. Enterprise-grade compliance at a fraction of the cost.",
      },
      {
        icon: "Target",
        title: "Superior Accuracy",
        description:
          "AI eliminates human error in document review. Every extraction is traceable, auditable, and backed by our compliance guarantee.",
      },
      {
        icon: "Shield",
        title: "Complete Audit Trail",
        description:
          "Full transparency into every AI decision. Show EPA exactly how you identified each PFAS substance with complete documentation.",
      },
      {
        icon: "Users",
        title: "No Disruption to Your Team",
        description:
          "We handle the heavy lifting. Your team spends hours, not months, on compliance—freeing them to focus on core business.",
      },
      {
        icon: "Compass",
        title: "Future-Proof Compliance",
        description:
          "Optional ongoing monitoring ensures new products are screened for PFAS before they enter your supply chain.",
      },
    ],
  },

  features: {
    title: "Enterprise-Grade Features",
    titleAccent: "Built for Compliance",
    subtitle:
      "Everything you need to transform complex document review into automated, intelligent processing.",
    items: [
      {
        icon: "FileSearch",
        title: "Intelligent Document Processing",
        items: [
          "OCR for scanned invoices and legacy documents",
          "Multi-language support (English, Chinese, Japanese, German)",
          "Automatic data extraction from tables, headers, line items",
          "Handles PDFs, images, Excel, CSV, emails",
        ],
      },
      {
        icon: "Brain",
        title: "Chemical Intelligence",
        items: [
          "12,000+ PFAS substance database (EPA CompTox)",
          "Trade name to CAS number mapping",
          "Synonym recognition ('Teflon' → 'PTFE' → CAS# → PFAS structure)",
          "Automatic structural formula validation",
        ],
      },
      {
        icon: "Building2",
        title: "Supply Chain Mapping",
        items: [
          "Supplier risk scoring based on industry and geography",
          "Automated supplier outreach templates",
          "Document request tracking",
          "Gap identification for missing data",
        ],
      },
      {
        icon: "FileCheck",
        title: "Compliance Reporting",
        items: [
          "Pre-built EPA submission templates",
          "Year-by-year chemical inventory",
          "Volume calculations and unit conversions",
          "Supporting documentation package",
        ],
      },
      {
        icon: "Shield",
        title: "Data Security",
        items: [
          "SOC 2 Type II certified",
          "End-to-end encryption",
          "Role-based access controls",
          "Cloud or on-premise deployment options",
        ],
      },
      {
        icon: "HeadphonesIcon",
        title: "Expert Support",
        items: [
          "Dedicated compliance manager",
          "Chemical expert review of flagged items",
          "Regulatory guidance and interpretation",
          "EPA submission support",
        ],
      },
    ],
  },

  industries: {
    title: "Built for Complex Supply Chains",
    titleAccent: "Across Industries",
    items: [
      {
        icon: "Car",
        title: "Automotive & Transportation",
        description: "Components, electronics, seals, gaskets, coatings, lubricants",
      },
      {
        icon: "Cpu",
        title: "Electronics Manufacturing",
        description: "PCBs, wire harnesses, conformal coatings, connector systems",
      },
      {
        icon: "Factory",
        title: "Industrial Equipment",
        description: "Hydraulic systems, sealing solutions, pumps, valves, machinery",
      },
      {
        icon: "Plane",
        title: "Aerospace & Defense",
        description: "High-performance seals, specialized coatings, electronic components",
      },
      {
        icon: "Shirt",
        title: "Textiles & Apparel",
        description: "Waterproof fabrics, stain-resistant treatments, outdoor gear",
      },
      {
        icon: "Stethoscope",
        title: "Medical Devices",
        description: "Gaskets, tubing, coatings for pharmaceutical equipment",
      },
    ],
  },

  comparison: {
    title: "Why We're Different from",
    titleAccent: "Traditional Solutions",
    headers: ["Feature", "Traditional Consultants", "Generic Compliance Software", "Our AI Solution"],
    rows: [
      { feature: "Time to Complete", values: ["6-12 months", "3-6 months (manual input)", "60-90 days"] },
      { feature: "Cost", values: ["$50K-$200K", "$25K-$100K/year", "Starting at $15K"] },
      { feature: "Document Intelligence", values: ["Manual review", "User must enter data", "Automatic extraction"] },
      { feature: "Accuracy", values: ["Human error risk", "Depends on user input", "AI + expert validation"] },
      { feature: "Audit Trail", values: ["Limited documentation", "Database logs", "Complete AI decision trail"] },
      { feature: "Scalability", values: ["Limited by headcount", "Limited by user capacity", "Unlimited documents"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    items: [
      {
        question: "What if I don't have digital records from 2011-2022?",
        answer:
          "We can work with scanned documents, photos of paper files, or even physical documents you ship to us. Our OCR technology handles even poor-quality scans.",
      },
      {
        question: "How accurate is the AI?",
        answer:
          "Our AI achieves 90%+ accuracy on PFAS identification, and every flagged item is reviewed by our chemical experts. We provide a compliance guarantee backed by our track record.",
      },
      {
        question: "What if my suppliers don't respond to information requests?",
        answer:
          "We provide templated outreach, follow-up sequences, and alternative research methods. Our experts can often identify PFAS based on product descriptions, industry standards, and CAS number databases even without direct supplier confirmation.",
      },
      {
        question: "Can you handle international documents in other languages?",
        answer:
          "Yes. We process documents in English, Chinese (Simplified/Traditional), Japanese, German, and other major languages. Our AI is trained on multilingual chemical nomenclature.",
      },
      {
        question: "Do you actually submit to the EPA for us?",
        answer:
          "We provide a complete, submission-ready package and guide you through the EPA's CDX portal. For an additional fee, we can handle the actual portal submission on your behalf.",
      },
      {
        question: "What happens after the October 2026 deadline?",
        answer:
          "We offer optional ongoing compliance monitoring to screen new products and suppliers for PFAS before they enter your supply chain—preventing future compliance issues.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes. We're SOC 2 Type II certified with end-to-end encryption, role-based access controls, and strict data retention policies. We can also deploy on-premise for enterprises with special security requirements.",
      },
      {
        question: "How is this different from hiring a law firm or consultant?",
        answer:
          "Traditional consultants charge $200-$400/hour and take 6-12 months. We use AI to automate 80% of the work, then layer in expert review. You get better results faster and at 10x lower cost.",
      },
      {
        question: "What if the EPA changes the requirements?",
        answer:
          "We monitor regulatory changes daily and update our platform automatically. Any changes to reporting requirements are reflected in your submission package at no additional cost.",
      },
      {
        question: "Can I see a demo first?",
        answer:
          "Absolutely. Book a 30-minute demo to see the platform in action with sample data from your industry.",
      },
    ],
  },

  timeline: {
    badge: "20 Months Remaining",
    title: "Time Is",
    titleAccent: "Running Out",
    steps: [
      { label: "Now - March 2026", description: "Document gathering and AI processing (60-90 days)" },
      { label: "April - June 2026", description: "Expert review and gap filling (60 days)" },
      { label: "July - August 2026", description: "Final submission preparation (30 days)" },
      { label: "September 2026", description: "Buffer for EPA portal issues/corrections (30 days)" },
      { label: "October 13, 2026", description: "DEADLINE", isDeadline: true },
    ],
    warning: "Companies starting in Q3 2026 may not have sufficient time to complete compliance, especially if supplier data requests take months.",
    warningBold: "Companies starting in Q3 2026",
    cta: "Start Your Assessment Today",
  },

  risks: {
    badge: "Don't Risk It",
    title: "The Cost of",
    titleAccent: "Non-Compliance",
    items: [
      { icon: "Scale", title: "Regulatory Penalties", description: "EPA violations can result in fines up to $50,000+ per day for non-compliance. Late or incomplete submissions may trigger audits and enforcement actions." },
      { icon: "Globe", title: "Public Disclosure", description: "Your PFAS data becomes public record. Incomplete or inaccurate reporting exposes you to competitor intelligence gathering, investor scrutiny, and NGO targeting." },
      { icon: "Users", title: "Litigation Risk", description: "PFAS is the 'next asbestos.' Companies with undocumented PFAS use face increased liability in environmental contamination lawsuits and product liability claims." },
      { icon: "TrendingDown", title: "Market Access", description: "Customers and retailers (especially in EU markets) are requiring PFAS declarations. Without documentation, you may lose key customer relationships and supply chain partnerships." },
    ],
    cta: "Get Compliant Now",
  },

  cta: {
    headline: "Don't Face the EPA Deadline",
    headlineAccent: "Alone",
    description:
      "Join forward-thinking manufacturers who are leveraging AI to simplify PFAS compliance.",
    trust: [
      "30-minute call to scope your project",
      "No credit card required",
      "Free compliance assessment",
      "Expert consultation included",
    ],
    primaryCta: { label: "Schedule a Demo", href: "/schedule-demo" },
  },

  footer: {
    logo: "9series-logo",
    logoAlt: "9series",
    tagline:
      "Your AI-First Technology Partner. We transform businesses with intelligent solutions that scale.",
    social: [
      { label: "LinkedIn", href: "#", icon: "Linkedin" },
      { label: "Facebook", href: "#", icon: "Facebook" },
      { label: "Instagram", href: "#", icon: "Instagram" },
      { label: "Twitter", href: "#", icon: "Twitter" },
      { label: "YouTube", href: "#", icon: "Youtube" },
    ],
    ratings: [
      { score: "4.8", logo: "clutch", logoAlt: "Clutch" },
      { score: "4.5", logo: "google", logoAlt: "Google" },
    ],
    linkGroups: [
      {
        title: "Services",
        links: [
          { label: "Software Product Engineering", href: "#" },
          { label: "Application Modernization", href: "#" },
          { label: "Data & Analytics", href: "#" },
          { label: "Cloud & Platform Services", href: "#" },
          { label: "Extended Engineering Team", href: "#" },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Healthcare", href: "#" },
          { label: "Education", href: "#" },
          { label: "Insurance", href: "#" },
          { label: "Logistics", href: "#" },
          { label: "Travel & Hospitality", href: "#" },
          { label: "Marketplace", href: "#" },
        ],
      },
      {
        title: "Case Studies",
        links: [
          { label: "Port Management & Logistics", href: "#" },
          { label: "Financial Services", href: "#" },
          { label: "Supply Chain & Manufacturing", href: "#" },
          { label: "Cloud & Platform Services", href: "#" },
          { label: "Technology & SaaS", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Blogs", href: "#" },
        ],
      },
      {
        title: "Contact Us",
        links: [
          { label: "About Us", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Blogs", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 9series Inc.",
  },
};
