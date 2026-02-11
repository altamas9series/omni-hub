export const siteContent = {
  brand: {
    name: "ClauseCraft",
    nameAccent: "AI",
    tagline: "Contract Summarization & Risk Analysis Agent",
  },

  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Schedule a Demo", href: "#" },
  },

  hero: {
    badge: "Legal & Compliance • Contract AI",
    rotatingHeadlines: [
      "Clause, obligation, and risk extraction",
      "Change and deviation detection between versions",
      "Summaries for fast review and escalation",
    ],
    headline: "Contract Summarization",
    headlineAccent: "& Risk Analysis with AI",
    subheadline:
      "ClauseCraft AI extracts clauses, obligations, risks, and changes to generate concise, actionable summaries. Accelerate contract review, ensure compliance, and reduce legal oversight risk.",
    primaryCta: { label: "See It in Action", href: "#cta" },
    secondaryCta: { label: "Schedule a Demo", href: "#" },
    trust: "Built for legal, compliance, procurement, and audit teams",
    stats: [
      { value: "AI", label: "Clause Extraction" },
      { value: "Risk", label: "Scoring" },
      { value: "Delta", label: "Change Detection" },
      { value: "Minutes", label: "To Summaries" },
    ],
    slides: [
      {
        badge: "Extraction",
        headline: "Clause & Obligation",
        headlineAccent: "Identification",
        subheadline:
          "Capture key terms, renewal dates, obligations, and risks from contracts automatically with structured outputs.",
      },
      {
        badge: "Change Tracking",
        headline: "Deviation & Redline",
        headlineAccent: "Detection",
        subheadline:
          "Highlight differences between contract versions, flag non-standard language, and quantify deviation severity.",
      },
      {
        badge: "Summaries",
        headline: "Plain-Language",
        headlineAccent: "Briefs",
        subheadline:
          "Generate concise summaries with risk scores and required actions so reviewers can decide faster.",
      },
    ],
  },

  scheduleDemo: {
    title: "Schedule a Demo",
    subtitle: "Tell us about your contracts and review workflows — we'll tailor a walkthrough.",
    backToHome: "Back to home",
    form: {
      fullName: "Full name",
      workEmail: "Work email",
      company: "Company",
      phone: "Phone number",
      learn: "What would you like to see?",
      learnPlaceholder: "e.g. Deviation detection vs templates, risk scoring, renewal reminders...",
      submit: "Request demo",
    },
  },

  problems: {
    title: "Sound familiar?",
    subtitle: "Manual review slows deals and leaves room for missed risk.",
    items: [
      {
        icon: "Users",
        title: "Time-Consuming Reviews",
        description:
          "Legal and procurement teams sift through long contracts manually, delaying approvals and negotiations.",
      },
      {
        icon: "FileText",
        title: "Hidden Obligations & Dates",
        description:
          "Renewals, auto-renew clauses, notices, and obligations can be missed without structured extraction.",
      },
      {
        icon: "Clock",
        title: "Missed Deviations",
        description:
          "Redlines and non-standard terms aren't always caught when comparing versions or against playbooks.",
      },
      {
        icon: "Award",
        title: "Unclear Risk Level",
        description:
          "Teams lack a quantified risk score to prioritize review and escalation, slowing decisions.",
      },
      {
        icon: "Layers",
        title: "Fragmented Outputs",
        description:
          "Notes, findings, and versions live in email and docs, making follow-up and audits difficult.",
      },
      {
        icon: "Shield",
        title: "Audit Stress",
        description:
          "Proving what changed and why decisions were made is painful without clear summaries and evidence.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "From contract ingestion to clause extraction, risk scoring, and concise briefs.",
    steps: [
      {
        step: "01",
        icon: "Upload",
        title: "Ingest Contracts",
        description:
          "Drop in contracts, MSAs, SOWs, NDAs, and amendments. Connect DMS/CLM for continuous ingestion.",
      },
      {
        step: "02",
        icon: "Route",
        title: "Extract Clauses & Obligations",
        description:
          "Identify clauses, obligations, renewal and notice dates, parties, and key terms with structured outputs.",
      },
      {
        step: "03",
        icon: "HelpCircle",
        title: "Detect Changes & Deviations",
        description:
          "Compare versions, flag non-standard language, and highlight deviations from playbooks or templates.",
      },
      {
        step: "04",
        icon: "Award",
        title: "Score & Summarize Risk",
        description:
          "Assign risk scores by severity and generate plain-language summaries with required actions and owners.",
      },
      {
        step: "05",
        icon: "Bell",
        title: "Notify & Track",
        description:
          "Send summaries to reviewers, set reminders for renewals and notices, and keep an auditable trail.",
      },
    ],
  },

  features: {
    title: "Why Choose",
    titleAccent: "ClauseCraft AI?",
    subtitle:
      "Contract intelligence to speed review, reduce risk, and improve compliance.",
    items: [
      {
        icon: "UserCheck",
        title: "Clause & Obligation Extraction",
        description:
          "Automatically pull renewal dates, notices, payment terms, SLAs, liabilities, and obligations into structured fields.",
      },
      {
        icon: "HelpCircle",
        title: "Change & Deviation Detection",
        description:
          "Compare versions or against templates/playbooks to highlight non-standard language and redlines to review.",
      },
      {
        icon: "Brain",
        title: "Risk Scoring",
        description:
          "Quantify deviation severity and assign risk levels to prioritize escalations and approvals.",
      },
      {
        icon: "Award",
        title: "Summarized Output",
        description:
          "Generate concise, plain-language briefs with key findings, risks, and required actions for fast decisions.",
      },
      {
        icon: "Zap",
        title: "Renewal & Notice Tracking",
        description:
          "Track renewal windows, notice periods, and obligations with reminders to avoid accidental auto-renewals or breaches.",
      },
      {
        icon: "Shield",
        title: "Compliance & Auditability",
        description:
          "Maintain an auditable trail of findings, versions, and decisions to support regulatory and internal audits.",
      },
    ],
  },

  useCases: {
    title: "Built for legal and compliance",
    subtitle: "Where ClauseCraft AI delivers the most impact.",
    items: [
      {
        persona: "Legal & Compliance",
        icon: "Users",
        title: "Supplier & Client Contracts",
        description:
          "Accelerate review of MSAs, SOWs, NDAs, and DPAs with clause extraction and risk scoring.",
        benefit: "Faster approvals with fewer missed risks",
      },
      {
        persona: "Procurement",
        icon: "GraduationCap",
        title: "Third-Party Agreements",
        description:
          "Compare supplier contracts to templates, flag deviations, and summarize obligations before signature.",
        benefit: "More consistent terms and negotiation leverage",
      },
      {
        persona: "Financial Services",
        icon: "ShieldCheck",
        title: "Regulatory Audits",
        description:
          "Extract risk-related clauses and produce audit-ready summaries for regulatory reviews and exams.",
        benefit: "Reduced audit prep time with defensible outputs",
      },
      {
        persona: "Enterprise Operations",
        icon: "BarChart3",
        title: "Playbook Enforcement",
        description:
          "Ensure contracts adhere to approved language by detecting deviations and routing for escalation.",
        benefit: "Higher compliance with standard terms",
      },
    ],
  },

  testimonials: {
    title: "Trusted by legal and compliance teams",
    subtitle:
      "See how teams speed contract review while reducing risk with ClauseCraft AI.",
    items: [
      {
        name: "Alex Morgan",
        role: "Associate General Counsel",
        company: "Vertex Supply",
        quote:
          "We cut first-pass reviews from hours to minutes. Summaries and risk scores make escalations clear and defensible.",
        rating: 5,
      },
      {
        name: "Priya Nair",
        role: "Head of Procurement",
        company: "GlobalFoundry Partners",
        quote:
          "Deviation detection against our templates surfaces redlines instantly. Negotiations start with facts, not guesswork.",
        rating: 5,
      },
      {
        name: "Daniel Cho",
        role: "Risk & Compliance Lead",
        company: "First Meridian Bank",
        quote:
          "Audit prep is faster. We export clause findings and version diffs with rationale — auditors appreciate the transparency.",
        rating: 5,
      },
      {
        name: "Mara Santos",
        role: "Director, Legal Ops",
        company: "Allied Logistics",
        quote:
          "Renewal reminders and obligation tracking keep us ahead of dates. The summaries make handoffs painless.",
        rating: 5,
      },
    ],
  },

  integrations: {
    title: "Fits your legal and ops stack",
    subtitle: "Connect to CLM, DMS, collaboration, and data platforms.",
    items: [
      { name: "Ironclad", category: "CLM" },
      { name: "Icertis", category: "CLM" },
      { name: "DocuSign CLM", category: "CLM" },
      { name: "SharePoint / Drive", category: "DMS" },
      { name: "Box / Dropbox", category: "DMS" },
      { name: "Slack / Teams", category: "Collaboration" },
      { name: "Microsoft 365", category: "Productivity" },
      { name: "REST API", category: "Integration" },
    ],
  },

  comparison: {
    title: "Manual Review vs ClauseCraft AI",
    subtitle: "See how automated extraction and risk scoring improve contract review.",
    headers: ["", "ClauseCraft AI", "Manual Review"],
    rows: [
      { feature: "Clause extraction", values: ["Automated, structured", "Manual reading"] },
      { feature: "Version diffs", values: ["Automated deviation detection", "Manual redline compare"] },
      { feature: "Risk scoring", values: ["Quantified by severity", "Subjective judgment"] },
      { feature: "Summaries", values: ["Plain-language briefs", "Lengthy notes/emails"] },
      { feature: "Renewal tracking", values: ["Auto reminders & owners", "Spreadsheets/calendars"] },
      { feature: "Auditability", values: ["Logged findings & rationale", "Scattered comments"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle: "Everything you need to know about ClauseCraft AI for contract review.",
    items: [
      {
        question: "What does ClauseCraft AI do?",
        answer:
          "ClauseCraft AI extracts clauses, obligations, risks, and changes from contracts to produce concise summaries with risk scores and required actions.",
      },
      {
        question: "What kinds of documents are supported?",
        answer:
          "MSAs, SOWs, NDAs, DPAs, amendments, supplier/client agreements, and other common commercial contracts in doc, pdf, or text formats.",
      },
      {
        question: "How is risk scored?",
        answer:
          "Risk scores reflect deviation severity, non-standard language, missing protections, and critical dates. Scoring can be tuned to your playbooks.",
      },
      {
        question: "Can it detect changes between versions?",
        answer:
          "Yes. We highlight added/removed language and deviations from templates to show what changed and where to focus.",
      },
      {
        question: "Does it work with our CLM or DMS?",
        answer:
          "We integrate with leading CLM/DMS platforms and offer a REST API. You can also upload files directly.",
      },
      {
        question: "How quickly can we deploy?",
        answer:
          "Most teams start with a pilot in days by uploading sample contracts or connecting a DMS/CLM source.",
      },
      {
        question: "How is data secured?",
        answer:
          "We use encrypted transport and storage, role-based access, and audit logs. Data residency options are available by plan.",
      },
      {
        question: "Can we export summaries and findings?",
        answer:
          "Yes. Summaries, clause tables, and deviation reports can be exported or pushed to your CLM/DMS or shared via links.",
      },
    ],
  },

  cta: {
    headline: "Contract Summarization",
    headlineAccent: "& Risk Analysis",
    description:
      "Deploy ClauseCraft AI to extract clauses, score risk, detect changes, and deliver concise summaries so reviews finish faster with fewer misses.",
    primaryCta: { label: "Schedule a Demo", href: "#" },
    secondaryCta: { label: "Schedule a Demo", href: "#" },
    trust: [
      "Clause & obligation extraction",
      "Change and deviation detection",
      "Risk scoring with rationale",
      "Plain-language summaries & reminders",
    ],
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
      { title: "Services", links: [{ label: "Software Product Engineering", href: "#" }, { label: "Application Modernization", href: "#" }, { label: "Data & Analytics", href: "#" }, { label: "Cloud & Platform Services", href: "#" }, { label: "Extended Engineering Team", href: "#" }] },
      { title: "Industries", links: [{ label: "Healthcare", href: "#" }, { label: "Education", href: "#" }, { label: "Insurance", href: "#" }, { label: "Logistics", href: "#" }, { label: "Travel & Hospitality", href: "#" }, { label: "Marketplace", href: "#" }] },
      { title: "Case Studies", links: [{ label: "Port Management & Logistics", href: "#" }, { label: "Financial Services", href: "#" }, { label: "Supply Chain & Manufacturing", href: "#" }, { label: "Cloud & Platform Services", href: "#" }, { label: "Technology & SaaS", href: "#" }] },
      { title: "Company", links: [{ label: "About Us", href: "#" }, { label: "Careers", href: "#" }, { label: "Blogs", href: "#" }] },
      { title: "Contact Us", links: [{ label: "About Us", href: "#" }, { label: "Careers", href: "#" }, { label: "Blogs", href: "#" }] },
    ],
    copyright: "© 2026 9series Inc.",
  },
};
