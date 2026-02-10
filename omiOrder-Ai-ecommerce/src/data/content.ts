export const siteContent = {
  brand: {
    name: "OmniOrder",
    nameAccent: "AI",
    tagline: "eCommerce & Order Management Agent",
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
    trust: "Trusted by eCommerce brands, retailers, and fulfillment teams",
    stats: [
      { value: "Real-time", label: "Order Tracking" },
      { value: "AI", label: "Stock Forecasts" },
      { value: "SLA", label: "Fulfillment Tracking" },
      { value: "Exception", label: "Alerts" },
    ],
    /** Carousel slides: each has its own badge, headline, accent, and description */
    slides: [
      {
        badge: "REAL-TIME ORDER INTELLIGENCE",
        headline: "Smart Order",
        headlineAccent: "Tracking",
        description:
          "Real-time order status across channels with exception alerts. Know the moment a shipment is delayed or needs attention.",
      },
      {
        badge: "DEMAND & SUPPLY OPTIMIZATION",
        headline: "AI-Driven",
        headlineAccent: "Inventory Forecasting",
        description:
          "Predict stock needs and automate reorder points. Reduce stockouts and overstock with accuracy that improves over time.",
      },
      {
        badge: "FULFILLMENT & SLA VISIBILITY",
        headline: "Fulfillment Performance",
        headlineAccent: "at a Glance",
        description:
          "Dashboard for on-time rates, carrier and warehouse performance. Clear metrics so you can improve speed and reliability.",
      },
      {
        badge: "UNIFIED COMMERCE AGENT",
        headline: "Orders, Inventory",
        headlineAccent: "& Fulfillment Together",
        description:
          "One intelligent agent for orders, inventory, and customer fulfillment. Optimize supply and demand while automating order tasks — for eCommerce, retail, and logistics.",
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
      learnPlaceholder: "e.g. How OmniOrder can help us with orders, inventory, and fulfillment...",
      submit: "Request demo",
    },
  },

  problems: {
    title: "Sound familiar?",
    subtitle: "Order chaos and inventory guesswork cost time and customers.",
    items: [
      {
        icon: "Clock",
        title: "Orders Lost in Spreadsheets & Email",
        description:
          "Tracking orders across channels and systems is manual. Delays and errors lead to missed shipments and unhappy customers.",
      },
      {
        icon: "EyeOff",
        title: "No Visibility Into Exceptions",
        description:
          "When something goes wrong — late carrier, out-of-stock, address issue — you find out too late. No real-time exception alerts.",
      },
      {
        icon: "Layers",
        title: "Inventory Either Stockout or Overstock",
        description:
          "Guessing demand leads to stockouts that kill sales or overstock that ties up cash. You need forecasting, not gut feel.",
      },
      {
        icon: "FileText",
        title: "Fulfillment Performance Is a Black Box",
        description:
          "Are you hitting SLAs? Which carriers or warehouses underperform? Without a clear dashboard, you can't improve.",
      },
      {
        icon: "Lock",
        title: "Channels and Systems Don't Talk",
        description:
          "Store, marketplaces, and fulfillment systems are disconnected. Manual rekeying and sync issues slow everything down.",
      },
      {
        icon: "DollarSign",
        title: "Manual Order Tasks Don't Scale",
        description:
          "As volume grows, manual order management and inventory updates become a bottleneck. Automation is the only way to keep up.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "From orders to fulfillment — intelligent tracking, forecasting, and automation.",
    steps: [
      {
        step: "01",
        icon: "Plug",
        title: "Connect Stores, Marketplaces & Fulfillment",
        description:
          "Connect your eCommerce store, marketplaces, and fulfillment or warehouse systems. One place to see every order and inventory signal.",
      },
      {
        step: "02",
        icon: "Brain",
        title: "Orders Synced & Tracked in Real Time",
        description:
          "OmniOrder AI syncs orders and provides real-time tracking with exception alerts. Know immediately when something needs attention.",
      },
      {
        step: "03",
        icon: "BarChart3",
        title: "AI Forecasts Inventory & Demand",
        description:
          "AI-driven stock forecasting optimizes supply and demand. Reduce stockouts and overstock while automating replenishment decisions.",
      },
      {
        step: "04",
        icon: "Send",
        title: "Analytics, SLAs & Automated Order Tasks",
        description:
          "Dashboard for fulfillment performance and SLA tracking. Automate routine order tasks so your team focuses on exceptions and growth.",
      },
    ],
  },

  features: {
    title: "Why Choose",
    titleAccent: "OmniOrder AI?",
    subtitle:
      "Smart order tracking, inventory optimization, and fulfillment analytics in one intelligent agent.",
    items: [
      {
        icon: "Clock",
        title: "Smart Order Tracking",
        description:
          "Real-time order updates with exception alerts. See status across channels and get notified the moment a shipment is delayed, out of stock, or needs intervention — so you can act before the customer complains.",
      },
      {
        icon: "Target",
        title: "Inventory Optimization",
        description:
          "AI-driven stock forecasting that balances supply and demand. Reduce stockouts and excess inventory, and automate reorder points so you never miss a sale or tie up cash in dead stock.",
      },
      {
        icon: "BarChart3",
        title: "Analytics Dashboard",
        description:
          "Fulfillment performance and SLA tracking in one place. See which carriers and warehouses perform, where delays happen, and how to improve — with clear metrics for leadership.",
      },
      {
        icon: "Plug",
        title: "Unified Order & Inventory View",
        description:
          "Connect stores, marketplaces, and fulfillment systems for a single source of truth. No more switching tabs or reconciling spreadsheets.",
      },
      {
        icon: "Shield",
        title: "Automated Order & Fulfillment Tasks",
        description:
          "Automate routine order tasks so your team can focus on exceptions and customer experience. From status updates to allocation rules — less manual work, more accuracy.",
      },
    ],
  },

  useCases: {
    title: "Built for commerce and fulfillment",
    subtitle: "See how eCommerce brands, retail, and logistics use OmniOrder AI.",
    items: [
      {
        persona: "eCommerce Brands",
        icon: "ShoppingCart",
        title: "Retail & D2C Order Management",
        description:
          "Manage orders from your store and marketplaces in one place. Real-time tracking, exception alerts, and inventory forecasting so you sell more and fulfill faster.",
        benefit: "One dashboard, fewer missed shipments",
      },
      {
        persona: "Retail Operations",
        icon: "Building2",
        title: "Multi-Location Inventory & Orders",
        description:
          "Unify inventory and orders across locations and channels. AI-driven stock levels and fulfillment performance help you optimize allocation and SLAs.",
        benefit: "Better in-stock rates, clearer SLAs",
      },
      {
        persona: "Logistics & Fulfillment",
        icon: "TrendingUp",
        title: "Fulfillment Management Systems",
        description:
          "Track fulfillment performance and SLA compliance at scale. Exception alerts and analytics help 3PLs and internal fulfillment teams improve speed and reliability.",
        benefit: "Faster resolution, better visibility",
      },
      {
        persona: "Operations Teams",
        icon: "Briefcase",
        title: "Order & Inventory Automation",
        description:
          "Automate order tasks and inventory updates so ops can focus on exceptions and growth. Predictive accuracy on demand and supply keeps operations lean and responsive.",
        benefit: "Less manual work, more accuracy",
      },
    ],
  },

  testimonials: {
    title: "Trusted by eCommerce and operations teams",
    subtitle:
      "See what brands and fulfillment teams say about OmniOrder AI.",
    items: [
      {
        name: "Sarah Chen",
        role: "Head of Operations",
        company: "Meridian Retail",
        quote:
          "We finally have one place for all our orders and inventory. Real-time alerts mean we fix issues before customers notice. Fulfillment SLAs have never been clearer.",
        rating: 5,
      },
      {
        name: "Marcus Rivera",
        role: "VP Supply Chain",
        company: "Velocity Commerce",
        quote:
          "AI-driven forecasting cut our stockouts by 40% and reduced excess inventory. Order tracking and exception alerts saved our team hours every week.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        role: "E-Commerce Director",
        company: "Apex Brands",
        quote:
          "The analytics dashboard is a game-changer. We see exactly where we're missing SLAs and which carriers perform. Leadership loves the visibility.",
        rating: 5,
      },
      {
        name: "James Thornton",
        role: "Fulfillment Manager",
        company: "Nova Logistics",
        quote:
          "Automated order tasks and unified tracking let us scale without adding headcount. OmniOrder AI is now central to how we run fulfillment.",
        rating: 5,
      },
    ],
  },

  integrations: {
    title: "Connects to your commerce stack",
    subtitle: "Stores, marketplaces, fulfillment, and warehouses. API and pre-built connectors.",
    items: [
      { name: "Shopify", category: "eCommerce" },
      { name: "WooCommerce", category: "eCommerce" },
      { name: "Amazon", category: "Marketplace" },
      { name: "ShipStation", category: "Fulfillment" },
      { name: "NetSuite", category: "ERP" },
      { name: "SAP", category: "ERP" },
      { name: "BigCommerce", category: "eCommerce" },
      { name: "WMS", category: "Warehouse" },
      { name: "REST API", category: "Integration" },
    ],
  },

  comparison: {
    title: "Manual Order Management vs OmniOrder AI",
    subtitle: "See how we stack up: real-time tracking, AI forecasting, and fulfillment analytics.",
    headers: ["", "OmniOrder AI", "Manual / Spreadsheets"],
    rows: [
      { feature: "Order tracking", values: ["Real-time + exception alerts", "Manual checks, delayed"] },
      { feature: "Inventory planning", values: ["AI-driven forecasting", "Guesswork, spreadsheets"] },
      { feature: "Fulfillment visibility", values: ["Dashboard, SLA tracking", "Fragmented, no SLA view"] },
      { feature: "Channels & systems", values: ["Unified view, one place", "Multiple tools, rekeying"] },
      { feature: "Order task automation", values: ["Automated updates & rules", "Manual only"] },
      { feature: "Supply & demand", values: ["Optimized, predictive", "Reactive, ad hoc"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle: "Everything you need to know about OmniOrder AI.",
    items: [
      {
        question: "What is smart order tracking?",
        answer:
          "Smart order tracking gives you real-time order status across channels and systems, plus exception alerts when something goes wrong — delays, out-of-stock, address issues — so you can act before the customer complains.",
      },
      {
        question: "How does AI-driven inventory forecasting work?",
        answer:
          "OmniOrder AI uses your order history, seasonality, and demand signals to forecast stock needs. You get recommended reorder points and quantities to reduce stockouts and overstock, with accuracy that improves over time.",
      },
      {
        question: "What does the analytics dashboard show?",
        answer:
          "The dashboard shows fulfillment performance and SLA tracking: on-time shipment rates, carrier and warehouse performance, exception trends, and key metrics so you can see where to improve.",
      },
      {
        question: "Which eCommerce and fulfillment systems do you integrate with?",
        answer:
          "We connect to major eCommerce platforms (e.g. Shopify, WooCommerce, BigCommerce), marketplaces, and fulfillment or warehouse systems. We also offer a REST API for custom integrations.",
      },
      {
        question: "Can we get alerts when orders are at risk?",
        answer:
          "Yes. You get real-time exception alerts for late shipments, stock issues, address problems, and other events you define. Alerts can be sent via email, in-app, or through your existing tools.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most teams are live within days. Connect your store, marketplaces, and fulfillment systems, configure your alerts and dashboard, and start tracking. No lengthy IT projects.",
      },
      {
        question: "Is OmniOrder AI suitable for multi-location or 3PL?",
        answer:
          "Yes. OmniOrder AI is built for eCommerce brands with multiple locations, retailers, and logistics or 3PL operations. You get a unified view of orders and inventory with fulfillment and SLA visibility.",
      },
      {
        question: "What order tasks can be automated?",
        answer:
          "We support automation for status updates, allocation rules, basic replenishment triggers, and notifications. You define the rules; OmniOrder AI executes them so your team focuses on exceptions.",
      },
      {
        question: "How is our order and inventory data secured?",
        answer:
          "We use enterprise-grade security: encryption in transit and at rest, access controls, and compliance-ready practices. Your data is used only to run the agent and is not shared with third parties.",
      },
      {
        question: "Can we export data or integrate with our BI tools?",
        answer:
          "Yes. You can export data and use our API for reporting and BI. Many teams feed OmniOrder AI metrics into their existing dashboards and data pipelines.",
      },
    ],
  },

  cta: {
    headline: "Optimize Orders & Fulfillment",
    headlineAccent: "with Predictive Accuracy",
    description:
      "Join eCommerce brands and fulfillment teams who manage orders, inventory, and SLAs with one intelligent agent.",
    primaryCta: { label: "Start Free Trial", href: "#" },
    secondaryCta: { label: "See Live Demo", href: "#" },
    trust: [
      "No credit card required",
      "Free trial",
      "Quick connect to your store",
      "Real-time tracking from day one",
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
