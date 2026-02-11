export const siteContent = {
  brand: {
    name: "OmniMR",
    nameAccent: "AI",
    tagline: "Market Research Data Analysis Agent",
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
    primaryCta: { label: "Start Free Trial", href: "#cta" },
    secondaryCta: { label: "Schedule a Demo", href: "/schedule-demo" },
    trust: "Trusted by market research firms and enterprises running CX/EX research",
    stats: [
      { value: "NL", label: "Insight Extraction" },
      { value: "Sentiment", label: "& Themes" },
      { value: "Predictive", label: "Segmentation" },
      { value: "Interactive", label: "Dashboards" },
    ],
    /** Carousel slides: each has its own badge, headline, accent, and description */
    slides: [
      {
        badge: "ANALYTICS & INSIGHTS",
        headline: "Natural Language",
        headlineAccent: "Insight Extraction",
        description:
          "Ask questions in plain language and get answers from your survey or panel data. OmniMR AI surfaces key findings without manual coding or complex queries.",
      },
      {
        badge: "QUALITATIVE & QUANTITATIVE",
        headline: "Sentiment & Theme",
        headlineAccent: "Categorization",
        description:
          "Automatically detect sentiment and group responses into themes. Turn open-ended feedback and verbatims into structured, actionable insights.",
      },
      {
        badge: "SEGMENTATION & MODELING",
        headline: "Predictive",
        headlineAccent: "Segmentation Modeling",
        description:
          "Identify high-value segments and predict behavior from your research data. Model drivers of satisfaction, loyalty, and conversion with AI.",
      },
      {
        badge: "MARKET RESEARCH AGENT",
        headline: "Interactive Data",
        headlineAccent: "Visualization Dashboards",
        description:
          "Build and share dashboards that bring survey and panel data to life. Trend detection, cross-tabs, and insight generation in one intelligent agent — for brand, campaign, and CX/EX research.",
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
      learnPlaceholder: "e.g. How OmniMR AI can help with brand analysis, CX/EX research, or Qualtrics data...",
      submit: "Request demo",
    },
  },

  problems: {
    title: "Sound familiar?",
    subtitle: "Manual coding, scattered insights, and slow reporting hold research teams back.",
    items: [
      {
        icon: "Clock",
        title: "Open-Ended Data Stuck in Spreadsheets",
        description:
          "Verbatims and qualitative responses take forever to code and summarize. Manual tagging is inconsistent and doesn't scale across projects.",
      },
      {
        icon: "EyeOff",
        title: "No Clear View of Sentiment or Themes",
        description:
          "Hard to see what respondents really feel or which themes repeat. Sentiment and theme categorization are done ad hoc or not at all.",
      },
      {
        icon: "Layers",
        title: "Segmentation Is Guesswork",
        description:
          "Identifying meaningful segments and predicting behavior requires heavy lifting. Without modeling, you miss high-value audiences and drivers.",
      },
      {
        icon: "FileText",
        title: "Insights Buried in Raw Data",
        description:
          "Survey and panel data pile up, but turning them into clear insights and stories is slow. Stakeholders wait weeks for reports.",
      },
      {
        icon: "Lock",
        title: "Qualtrics and Platforms Don't Think",
        description:
          "CX/EX and survey tools collect data but don't automate trend detection or insight generation. You still do the analysis manually.",
      },
      {
        icon: "DollarSign",
        title: "Dashboards Don't Tell the Story",
        description:
          "Static charts and exports don't support natural language questions or predictive views. You need interactive, AI-powered visualization.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "From survey and panel data to trends, segments, and actionable insights.",
    steps: [
      {
        step: "01",
        icon: "Plug",
        title: "Connect Your Research Data",
        description:
          "Connect Qualtrics, survey platforms, or panel data sources. OmniMR AI ingests qualitative and quantitative data for analysis.",
      },
      {
        step: "02",
        icon: "Brain",
        title: "Natural Language Insight Extraction",
        description:
          "Ask questions in plain language. Get answers, summaries, and key findings from your data without writing code or building complex queries.",
      },
      {
        step: "03",
        icon: "BarChart3",
        title: "Sentiment, Themes & Predictive Segmentation",
        description:
          "AI categorizes sentiment and themes automatically. Run predictive segmentation models to identify segments and drivers of behavior.",
      },
      {
        step: "04",
        icon: "Send",
        title: "Interactive Dashboards & Reports",
        description:
          "Build and share visualization dashboards. Trend detection and insight generation keep stakeholders informed with minimal manual reporting.",
      },
    ],
  },

  features: {
    title: "Why Choose",
    titleAccent: "OmniMR AI?",
    subtitle:
      "AI-powered research assistant for qualitative and quantitative data analysis — trend detection, segmentation, and insight generation in one agent.",
    items: [
      {
        icon: "MessageSquare",
        title: "Natural Language Insight Extraction",
        description:
          "Ask questions in plain language and get answers from survey or panel data. No coding or complex query building — just ask and get key findings, summaries, and trends surfaced automatically.",
      },
      {
        icon: "Heart",
        title: "Sentiment & Theme Categorization",
        description:
          "Automatically detect sentiment and group open-ended responses into themes. Turn verbatims and qualitative feedback into structured, actionable categories for brand and campaign analysis.",
      },
      {
        icon: "Target",
        title: "Predictive Segmentation Modeling",
        description:
          "Identify high-value segments and model drivers of satisfaction, loyalty, and conversion. AI-powered segmentation that scales across projects and datasets.",
      },
      {
        icon: "BarChart3",
        title: "Interactive Data Visualization Dashboards",
        description:
          "Build and share dashboards that bring research data to life. Trend detection, cross-tabs, and insight generation in one place — so stakeholders get answers fast.",
      },
      {
        icon: "Plug",
        title: "Built for Research Workflows",
        description:
          "Designed for market research firms and enterprises running CX/EX research. Integrates with Qualtrics and similar platforms so you analyze where your data already lives.",
      },
    ],
  },

  useCases: {
    title: "Built for market research and CX/EX",
    subtitle: "See how research firms and enterprises use OmniMR AI for brand, campaign, and experience research.",
    items: [
      {
        persona: "Market Research Firms",
        icon: "TrendingUp",
        title: "Brand & Campaign Analysis",
        description:
          "Conduct brand and campaign analysis at scale. Natural language insight extraction, sentiment and theme categorization, and predictive segmentation turn survey and panel data into clear, client-ready insights.",
        benefit: "Faster insights, consistent quality",
      },
      {
        persona: "Enterprises",
        icon: "Building2",
        title: "CX/EX Research (Qualtrics & Similar)",
        description:
          "Manage customer and employee experience research through Qualtrics or similar platforms. Automate trend detection, segmentation, and insight generation so you act on feedback without manual analysis bottlenecks.",
        benefit: "One agent for qualitative and quantitative",
      },
      {
        persona: "Insights Teams",
        icon: "BarChart3",
        title: "Survey & Panel Data Analysis",
        description:
          "Turn survey and panel data into trends, segments, and dashboards. From open-ended coding to predictive modeling — less manual work, more repeatable insight generation.",
        benefit: "Scale analysis without scaling headcount",
      },
      {
        persona: "Strategy & Product",
        icon: "Briefcase",
        title: "Voice of Customer & Theme Reporting",
        description:
          "Get sentiment and theme reports on demand. Interactive dashboards and natural language Q&A let strategy and product teams explore research data without waiting on analysts.",
        benefit: "Self-serve insights, faster decisions",
      },
    ],
  },

  testimonials: {
    title: "Trusted by market research and insights teams",
    subtitle:
      "See what research firms and enterprises say about OmniMR AI.",
    items: [
      {
        name: "Sarah Chen",
        role: "Director of Insights",
        company: "Meridian Research",
        quote:
          "Natural language extraction changed how we deliver to clients. We ask questions and get answers from survey data in minutes. Sentiment and theme categorization are now consistent across every project.",
        rating: 5,
      },
      {
        name: "Marcus Rivera",
        role: "VP Customer Experience",
        company: "Velocity Corp",
        quote:
          "Our Qualtrics data finally has a brain. OmniMR AI automates trend detection and segmentation so we act on CX feedback without drowning in manual analysis. Dashboards are a hit with leadership.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        role: "Head of Market Research",
        company: "Apex Insights",
        quote:
          "Predictive segmentation modeling and interactive dashboards let us do more with the same team. Brand and campaign analysis is faster and more repeatable. Clients love the clarity.",
        rating: 5,
      },
      {
        name: "James Thornton",
        role: "EX Research Lead",
        company: "Nova Enterprises",
        quote:
          "We run employee experience research at scale. OmniMR AI handles sentiment, themes, and insight generation so we focus on action. It's become central to how we do CX/EX research.",
        rating: 5,
      },
    ],
  },

  integrations: {
    title: "Connects to your research stack",
    subtitle: "Survey platforms, panel data, and experience management. API and pre-built connectors.",
    items: [
      { name: "Qualtrics", category: "Experience Management" },
      { name: "SurveyMonkey", category: "Survey" },
      { name: "Typeform", category: "Survey" },
      { name: "Alchemer", category: "Survey" },
      { name: "Panel Providers", category: "Panel Data" },
      { name: "CSV / Excel", category: "Import" },
      { name: "Google Forms", category: "Survey" },
      { name: "Microsoft Forms", category: "Survey" },
      { name: "REST API", category: "Integration" },
    ],
  },

  comparison: {
    title: "Manual Research Analysis vs OmniMR AI",
    subtitle: "See how we stack up: natural language insights, sentiment/themes, segmentation, and dashboards.",
    headers: ["", "OmniMR AI", "Manual / Spreadsheets"],
    rows: [
      { feature: "Insight extraction", values: ["Natural language Q&A, automated", "Manual coding, ad hoc"] },
      { feature: "Sentiment & themes", values: ["AI categorization, consistent", "Manual tagging, inconsistent"] },
      { feature: "Segmentation", values: ["Predictive modeling, scalable", "Rule-based or guesswork"] },
      { feature: "Dashboards", values: ["Interactive, trend detection", "Static charts, exports"] },
      { feature: "Trend detection", values: ["Automated, continuous", "Manual review only"] },
      { feature: "CX/EX & Qualtrics", values: ["Integrated analysis layer", "Export and analyze elsewhere"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle: "Everything you need to know about OmniMR AI.",
    items: [
      {
        question: "What is natural language insight extraction?",
        answer:
          "You ask questions in plain language (e.g. 'What do customers say about pricing?') and OmniMR AI answers using your survey or panel data. No coding or complex queries — key findings and summaries are generated automatically.",
      },
      {
        question: "How does sentiment and theme categorization work?",
        answer:
          "OmniMR AI analyzes open-ended responses and verbatims to detect sentiment and group them into themes. This turns qualitative data into structured, actionable categories so you can track trends and report consistently.",
      },
      {
        question: "What is predictive segmentation modeling?",
        answer:
          "We use your research data to identify meaningful segments and model drivers of behavior (e.g. satisfaction, loyalty, conversion). You get segments and predictions that scale across projects and datasets.",
      },
      {
        question: "What do the interactive dashboards show?",
        answer:
          "Dashboards combine trend detection, cross-tabs, and insight generation. You can build and share visualizations, ask natural language questions, and keep stakeholders updated with minimal manual reporting.",
      },
      {
        question: "Does OmniMR AI work with Qualtrics?",
        answer:
          "Yes. OmniMR AI is built for enterprises managing CX/EX research through Qualtrics or similar platforms. We connect to your data so you can automate trend detection, segmentation, and insight generation where your surveys already live.",
      },
      {
        question: "Who is OmniMR AI for?",
        answer:
          "Market research firms conducting brand or campaign analysis, and enterprises running customer or employee experience (CX/EX) research. Anyone who needs to analyze qualitative and quantitative survey or panel data at scale.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most teams are analyzing data within days. Connect your survey or panel source, configure dashboards and models, and start asking questions. No lengthy IT projects.",
      },
      {
        question: "Can we use our own panel or survey data?",
        answer:
          "Yes. OmniMR AI ingests data from Qualtrics, survey platforms, panel providers, and CSV/Excel. We also offer a REST API for custom pipelines.",
      },
      {
        question: "How is our research data secured?",
        answer:
          "We use enterprise-grade security: encryption in transit and at rest, access controls, and compliance-ready practices. Your data is used only to run the agent and is not shared with third parties.",
      },
      {
        question: "Can we export insights or integrate with BI?",
        answer:
          "Yes. You can export data and use our API for reporting and BI. Many teams feed OmniMR AI insights into existing dashboards and workflows.",
      },
    ],
  },

  cta: {
    headline: "Turn Research Data Into",
    headlineAccent: "Actionable Insights",
    description:
      "Join market research firms and enterprises who automate trend detection, segmentation, and insight generation with one intelligent agent.",
    primaryCta: { label: "Start Free Trial", href: "#" },
    secondaryCta: { label: "See Live Demo", href: "#" },
    trust: [
      "No credit card required",
      "Free trial",
      "Connect Qualtrics or survey data",
      "Natural language insights from day one",
    ],
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "How It Works", href: "#how-it-works" },
          { label: "Features", href: "#features" },
          { label: "Integrations", href: "#" },
          { label: "Demo", href: "#cta" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "Guides", href: "#" },
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
