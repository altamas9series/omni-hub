export const siteContent = {
  brand: {
    name: "TalentMatch",
    nameAccent: "AI",
    tagline: "Intelligent Candidate Matching Agent for HR & Talent Teams",
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
    badge: "HR & Talent • AI Matching",
    rotatingHeadlines: [
      "AI resume parsing & JD matching",
      "Predictive fit scoring & ranking",
      "Automated outreach, scheduling, and screening",
    ],
    headline: "Intelligent Candidate Matching",
    headlineAccent: "for HR & Talent Teams",
    subheadline:
      "End-to-end recruitment intelligence that parses resumes, matches candidates to job descriptions, and automates first-round assessments to accelerate shortlisting and improve hiring quality.",
    primaryCta: { label: "See It in Action", href: "#cta" },
    secondaryCta: { label: "Schedule a Demo", href: "#" },
    trust: "Built for recruitment teams, high-volume hiring, and internal mobility",
    stats: [
      { value: "AI", label: "Resume Parsing" },
      { value: "Fit", label: "Predictive Scoring" },
      { value: "Auto", label: "Outreach & Scheduling" },
      { value: "Insights", label: "Feedback Reports" },
    ],
    slides: [
      {
        badge: "Parsing & Matching",
        headline: "Resume Parsing",
        headlineAccent: "& JD Matching",
        subheadline:
          "Extract skills, experience, and qualifications from resumes, map to job descriptions, and surface top matches automatically.",
      },
      {
        badge: "Predictive Ranking",
        headline: "Fit Scoring",
        headlineAccent: "& Shortlists",
        subheadline:
          "Predictive models rank candidates by role fit, culture/skills match, and likelihood to advance so recruiters focus on the best slate first.",
      },
      {
        badge: "Automation",
        headline: "AI Outreach",
        headlineAccent: "& Screening",
        subheadline:
          "Trigger personalized outreach, schedule interviews, run virtual screenings, and generate auto feedback reports for candidates.",
      },
    ],
  },

  scheduleDemo: {
    title: "Schedule a Demo",
    subtitle: "Tell us about your roles and hiring volume — we'll tailor a walkthrough.",
    backToHome: "Back to home",
    form: {
      fullName: "Full name",
      workEmail: "Work email",
      company: "Company",
      phone: "Phone number",
      learn: "What would you like to see?",
      learnPlaceholder: "e.g. Fit scoring for data roles, outreach automation, internal mobility recommendations...",
      submit: "Request demo",
    },
  },

  problems: {
    title: "Sound familiar?",
    subtitle: "Manual screening and slow scheduling bottleneck hiring and frustrate candidates.",
    items: [
      {
        icon: "Users",
        title: "Time-Consuming Resume Review",
        description:
          "Recruiters spend hours scanning resumes and still risk missing qualified talent, especially in high-volume roles.",
      },
      {
        icon: "FileText",
        title: "Slow JD-Candidate Alignment",
        description:
          "Matching candidates to changing job descriptions is manual and inconsistent, leading to weak shortlists or bias.",
      },
      {
        icon: "Clock",
        title: "Bottlenecked Scheduling",
        description:
          "Coordinating outreach and interview times slows time-to-first-touch and leaves candidates waiting.",
      },
      {
        icon: "Award",
        title: "No Early Signal on Fit",
        description:
          "Recruiters discover dealbreakers late because there is no quick, virtual screening step or structured auto feedback.",
      },
      {
        icon: "Layers",
        title: "Fragmented Candidate Data",
        description:
          "Profiles, notes, and assessment results sit in different tools, making collaboration and reporting harder.",
      },
      {
        icon: "Shield",
        title: "Internal Talent Overlooked",
        description:
          "Existing employees who could fill roles are hard to surface without automated internal matching.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "From JD and resume ingestion to predictive fit scoring, outreach, and screening.",
    steps: [
      {
        step: "01",
        icon: "Upload",
        title: "Ingest JDs & Resumes",
        description:
          "Import job descriptions and candidate resumes from ATS or files. Extract skills, experience, education, and intent signals.",
      },
      {
        step: "02",
        icon: "Route",
        title: "Parse & Normalize",
        description:
          "Standardize titles, skills, and entities with AI parsing so different resumes and JDs can be compared fairly.",
      },
      {
        step: "03",
        icon: "HelpCircle",
        title: "Predictive Fit Scoring",
        description:
          "Rank candidates by fit to the JD and preferred signals (skills, tenure, location, seniority). Generate shortlists instantly.",
      },
      {
        step: "04",
        icon: "Award",
        title: "Outreach & Scheduling",
        description:
          "Trigger AI outreach, collect availability, and auto-schedule interviews with calendar sync for recruiters and hiring managers.",
      },
      {
        step: "05",
        icon: "MessageSquare",
        title: "Virtual Screening & Feedback",
        description:
          "Run virtual screenings and generate auto feedback reports so candidates get timely responses and recruiters focus on top fits.",
      },
    ],
  },

  features: {
    title: "Why Choose",
    titleAccent: "TalentMatch AI?",
    subtitle:
      "End-to-end recruitment intelligence to lift hiring quality and speed.",
    items: [
      {
        icon: "UserCheck",
        title: "Resume Parsing & JD Matching",
        description:
          "Extract skills and experience from resumes and align them to role requirements with structured, comparable profiles.",
      },
      {
        icon: "HelpCircle",
        title: "Predictive Fit Scoring",
        description:
          "ML models score and rank candidates for each JD using skills, tenure, location, and historical hiring signals.",
      },
      {
        icon: "Brain",
        title: "AI Outreach & Scheduling",
        description:
          "Automate personalized outreach, collect availability, and schedule interviews across calendars and time zones.",
      },
      {
        icon: "Award",
        title: "Virtual Screening & Feedback",
        description:
          "Lightweight virtual screenings produce structured summaries and auto feedback reports for candidates.",
      },
      {
        icon: "Zap",
        title: "Internal Mobility Suggestions",
        description:
          "Surface qualified internal talent for open roles to reduce time-to-fill and support career growth.",
      },
      {
        icon: "Shield",
        title: "Compliance & Fairness",
        description:
          "Transparent criteria, audit-friendly logs, and configurable policies help reduce bias and support compliant hiring.",
      },
    ],
  },

  useCases: {
    title: "Built for HR & Talent",
    subtitle: "Where TalentMatch AI delivers the most impact.",
    items: [
      {
        persona: "Recruitment Firms",
        icon: "Users",
        title: "High-Volume Placements",
        description:
          "Speed JD-to-candidate matching, automate outreach, and deliver ranked slates to clients faster.",
        benefit: "Higher placement speed and quality",
      },
      {
        persona: "Enterprise HR",
        icon: "GraduationCap",
        title: "Corporate & Technical Roles",
        description:
          "Prioritize top-fit candidates for specialized roles with predictive scoring and structured screening summaries.",
        benefit: "Reduced time-to-shortlist with better fit",
      },
      {
        persona: "Operations & Hourly",
        icon: "ShieldCheck",
        title: "Frontline & Seasonal Hiring",
        description:
          "Handle spikes in volume with automated parsing, ranking, and scheduling while keeping candidate comms responsive.",
        benefit: "Faster fills without sacrificing quality",
      },
      {
        persona: "Internal Mobility",
        icon: "BarChart3",
        title: "Role Moves & Redeployment",
        description:
          "Surface internal candidates that match open roles and provide transparent rationale for managers and employees.",
        benefit: "Better retention and fairer opportunities",
      },
    ],
  },

  testimonials: {
    title: "Trusted by recruitment and talent teams",
    subtitle:
      "See how hiring teams use TalentMatch AI to improve slate quality and speed.",
    items: [
      {
        name: "Amira Patel",
        role: "Director of Talent Acquisition",
        company: "Northbridge Tech",
        quote:
          "Fit scores and ranked slates cut our screening time in half. Recruiters now start with the best candidates and keep candidates warm automatically.",
        rating: 5,
      },
      {
        name: "Diego Martinez",
        role: "Partner, Recruiting",
        company: "TalentWorks",
        quote:
          "Clients see stronger shortlists faster. Outreach and scheduling are on autopilot, so we spend time closing, not chasing calendars.",
        rating: 5,
      },
      {
        name: "Leah Song",
        role: "Head of People Ops",
        company: "BrightMart",
        quote:
          "Virtual screening summaries make debriefs fast. Internal mobility suggestions helped us fill roles without going to market.",
        rating: 5,
      },
      {
        name: "Jonas Weber",
        role: "VP HR",
        company: "LogiTrans",
        quote:
          "Scheduling bottlenecks are gone. Candidates get quick responses and hiring managers see a consistent, scored slate every time.",
        rating: 5,
      },
    ],
  },

  integrations: {
    title: "Fits your ATS and HR stack",
    subtitle: "Connect to your ATS, calendars, messaging, and data platforms.",
    items: [
      { name: "Greenhouse", category: "ATS" },
      { name: "Lever", category: "ATS" },
      { name: "Workday", category: "HRIS" },
      { name: "SAP SuccessFactors", category: "HRIS" },
      { name: "iCIMS", category: "ATS" },
      { name: "Outlook / Google Calendar", category: "Scheduling" },
      { name: "Slack / Teams", category: "Collaboration" },
      { name: "REST API", category: "Integration" },
    ],
  },

  comparison: {
    title: "Manual Hiring vs TalentMatch AI",
    subtitle: "See how automated parsing, fit scoring, and outreach accelerate hiring.",
    headers: ["", "TalentMatch AI", "Manual Hiring"],
    rows: [
      { feature: "Resume review", values: ["AI parsing & JD matching", "Manual scanning"] },
      { feature: "Shortlisting", values: ["Predictive fit scoring", "Subjective sorting"] },
      { feature: "Outreach & scheduling", values: ["Automated with calendar sync", "Emails and back-and-forth"] },
      { feature: "Screening", values: ["Virtual + structured feedback", "Unstructured calls"] },
      { feature: "Internal candidates", values: ["Auto suggestions by fit", "Often overlooked"] },
      { feature: "Candidate experience", values: ["Fast touchpoints & feedback", "Slow responses"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle: "Everything you need to know about TalentMatch AI for recruiting.",
    items: [
      {
        question: "What does TalentMatch AI do?",
        answer:
          "TalentMatch AI parses resumes, matches them to job descriptions, scores candidate fit, and automates outreach, scheduling, and virtual screening to speed hiring.",
      },
      {
        question: "How do you parse resumes and JDs?",
        answer:
          "We extract skills, experience, education, and entities, then normalize titles and skills so we can compare candidates and roles consistently.",
      },
      {
        question: "How is fit score calculated?",
        answer:
          "Models consider JD requirements, skills alignment, tenure, location, seniority, and historical outcomes. Scores and rationales are transparent and tunable.",
      },
      {
        question: "Can you automate outreach and scheduling?",
        answer:
          "Yes. We send personalized outreach, gather availability, and book time on integrated calendars for recruiters and hiring managers.",
      },
      {
        question: "Do you support internal mobility?",
        answer:
          "Yes. We match internal employees to open roles using the same parsing and scoring, helping you fill faster and grow talent.",
      },
      {
        question: "How quickly can we get started?",
        answer:
          "Typical pilots connect to your ATS and calendars in days. You can start with priority roles and expand once scoring is calibrated.",
      },
      {
        question: "How is candidate data secured?",
        answer:
          "We use enterprise-grade security, encrypted transport, role-based access, and audit logs. Data residency options are available by plan.",
      },
      {
        question: "Does it integrate with our ATS?",
        answer:
          "We integrate with leading ATS platforms and provide a REST API for custom pipelines. Calendars and messaging tools are supported for scheduling and outreach.",
      },
    ],
  },

  cta: {
    headline: "Intelligent Candidate Matching",
    headlineAccent: "for HR & Talent Teams",
    description:
      "Deploy TalentMatch AI to parse resumes, rank candidates by fit, automate outreach and scheduling, and deliver faster shortlists with higher quality.",
    primaryCta: { label: "Schedule a Demo", href: "#" },
    secondaryCta: { label: "Schedule a Demo", href: "#" },
    trust: [
      "Resume parsing & JD matching",
      "Predictive fit scoring & ranking",
      "AI outreach and scheduling automation",
      "Virtual screening with feedback reports",
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
