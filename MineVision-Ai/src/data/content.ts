export const siteContent = {
  brand: {
    name: "MineVision",
    nameAccent: "AI",
    tagline: "Data Mining & Insight Discovery Agent for Heavy Industry Safety",
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
    badge: "Data Analytics • Real-Time Safety",
    rotatingHeadlines: [
      "Real-time safety intelligence for mines",
      "Computer vision PPE & zone compliance",
      "IoT-driven hazard detection & predictive alerts",
    ],
    headline: "Real-Time Safety Intelligence",
    headlineAccent: "for Mining Operations",
    subheadline:
      "MineVision AI fuses computer vision and IoT signals to detect hazards, monitor PPE and zones, and surface predictive insights that reduce incidents, downtime, and compliance risk.",
    primaryCta: { label: "See It in Action", href: "#cta" },
    secondaryCta: { label: "Schedule a Demo", href: "#" },
    trust: "Built for mining and heavy industries needing continuous safety assurance",
    stats: [
      { value: "24/7", label: "Computer Vision" },
      { value: "IoT", label: "Sensor Fusion" },
      { value: "Predictive", label: "Maintenance Alerts" },
      { value: "ESG", label: "Compliance Dashboards" },
    ],
    slides: [
      {
        badge: "Real-Time Detection",
        headline: "Computer Vision Safety",
        headlineAccent: "for Mines & Plants",
        subheadline:
          "Continuous PPE and zone compliance monitoring across open-pit and underground environments to prevent unsafe entry and behaviors.",
      },
      {
        badge: "IoT + Vision",
        headline: "Sensor Fusion",
        headlineAccent: "for Hazard Detection",
        subheadline:
          "Integrate environmental sensors (gas, dust, vibration) with camera feeds to detect hazards sooner and trigger automated workflows.",
      },
      {
        badge: "Predictive Intelligence",
        headline: "Maintenance & ESG",
        headlineAccent: "Dashboards",
        subheadline:
          "Predictive maintenance alerts and compliance dashboards that track incidents, actions, and ESG readiness in one place.",
      },
    ],
  },

  scheduleDemo: {
    title: "Schedule a Demo",
    subtitle: "Tell us about your site and safety goals — we'll tailor a walkthrough.",
    backToHome: "Back to home",
    form: {
      fullName: "Full name",
      workEmail: "Work email",
      company: "Company",
      phone: "Phone number",
      learn: "What would you like to see?",
      learnPlaceholder: "e.g. PPE detection in our underground mine, vibration-triggered shutdowns...",
      submit: "Request demo",
    },
  },

  problems: {
    title: "Sound familiar?",
    subtitle: "Manual monitoring and siloed data leave safety gaps in high-risk sites.",
    items: [
      {
        icon: "Users",
        title: "Limited Visibility Across Sites",
        description:
          "Cameras, sensors, and logs are disconnected. Supervisors lack a single, real-time view to catch hazards before they escalate.",
      },
      {
        icon: "FileText",
        title: "Reactive Incident Response",
        description:
          "Teams find out about unsafe entry, missing PPE, or equipment anomalies after the fact — not while they are happening.",
      },
      {
        icon: "Clock",
        title: "Data Without Insight",
        description:
          "Sensor readings, camera footage, and logs are siloed. There's no automated analytics to surface patterns or predictive risks.",
      },
      {
        icon: "Award",
        title: "Compliance and ESG Pressure",
        description:
          "Proof of safety actions, incident follow-up, and environmental metrics is scattered, making audits slow and stressful.",
      },
      {
        icon: "Layers",
        title: "Downtime from Preventable Issues",
        description:
          "Unplanned stoppages from avoidable hazards or equipment failures drive cost and delay production targets.",
      },
      {
        icon: "Shield",
        title: "Inconsistent PPE & Zone Control",
        description:
          "Manual checks miss violations. Workers unknowingly enter restricted zones or operate without required PPE.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "From camera and sensor data to proactive detection, alerts, and ESG reporting.",
    steps: [
      {
        step: "01",
        icon: "Upload",
        title: "Connect Vision & IoT",
        description:
          "Ingest camera feeds (RTSP/IP) and environmental or equipment sensors (gas, dust, vibration, temperature, proximity).",
      },
      {
        step: "02",
        icon: "Route",
        title: "Fusion & Detection",
        description:
          "Computer vision tracks PPE and zone compliance while IoT data flags anomalies. Signals are fused to reduce false positives.",
      },
      {
        step: "03",
        icon: "HelpCircle",
        title: "Real-Time Alerts",
        description:
          "Trigger alerts to control rooms, radios, SMS, or maintenance systems. Send evidence clips and sensor context automatically.",
      },
      {
        step: "04",
        icon: "Award",
        title: "Dashboards & ESG",
        description:
          "Track incidents, response times, maintenance actions, and environmental metrics. Export for audits and ESG reporting.",
      },
      {
        step: "05",
        icon: "Activity",
        title: "Predictive Maintenance",
        description:
          "Use vibration and performance trends to flag equipment needing service before failure, reducing downtime and repair costs.",
      },
    ],
  },

  features: {
    title: "Why Choose",
    titleAccent: "MineVision AI?",
    subtitle:
      "Real-time vision + IoT analytics to cut incidents, downtime, and compliance risk.",
    items: [
      {
        icon: "UserCheck",
        title: "PPE & Zone Compliance",
        description:
          "Detect hard hats, vests, eyewear, and safe-zone adherence with continuous computer vision across pits, shafts, and plants.",
      },
      {
        icon: "HelpCircle",
        title: "Hazard & Incident Detection",
        description:
          "Identify unsafe entry, vehicle-pedestrian proximity, spills, smoke, and other hazards with evidence clips for rapid triage.",
      },
      {
        icon: "Brain",
        title: "Sensor Fusion Analytics",
        description:
          "Combine camera detections with gas, dust, vibration, and temperature sensors to strengthen confidence and reduce false alarms.",
      },
      {
        icon: "Award",
        title: "Predictive Maintenance",
        description:
          "Surface early warning signals for haul trucks, conveyors, and crushers to schedule maintenance before breakdowns.",
      },
      {
        icon: "Zap",
        title: "Automated Workflows",
        description:
          "Send alerts to radios, SMS, control rooms, or CMMS; log actions and evidence for investigations automatically.",
      },
      {
        icon: "Shield",
        title: "ESG & Compliance Dashboards",
        description:
          "Track incidents, response times, emissions, and corrective actions. Export audit-ready reports for regulators and ESG teams.",
      },
    ],
  },

  useCases: {
    title: "Built for mining and heavy industry",
    subtitle: "Where MineVision AI delivers the most impact.",
    items: [
      {
        persona: "Open-Pit Mines",
        icon: "Users",
        title: "Haul Roads, Pits, and Stockpiles",
        description:
          "Monitor haul truck zones, loading areas, and stockpiles for PPE, proximity, and unauthorized entry with camera + IoT fusion.",
        benefit: "Fewer high-energy incidents and stoppages",
      },
      {
        persona: "Underground Mines",
        icon: "GraduationCap",
        title: "Tunnels, Shafts, and Headframes",
        description:
          "Detect PPE and restricted-zone breaches in low light; integrate gas and vibration sensors to alert crews instantly.",
        benefit: "Improved worker protection in constrained spaces",
      },
      {
        persona: "Plant & Processing",
        icon: "ShieldCheck",
        title: "Crushers, Conveyors, and Mills",
        description:
          "Flag unsafe behaviors near conveyors and rotating equipment; predict maintenance needs from vibration and temperature trends.",
        benefit: "Lower downtime and safer operations",
      },
      {
        persona: "Safety & Compliance",
        icon: "BarChart3",
        title: "ESG and Regulatory Reporting",
        description:
          "Consolidate incidents, evidence, and responses with environmental metrics for audits and ESG disclosures.",
        benefit: "Faster audits with defensible data trail",
      },
    ],
  },

  testimonials: {
    title: "Trusted by safety and operations teams",
    subtitle:
      "See how mining and heavy industry leaders use MineVision AI to cut incidents and downtime.",
    items: [
      {
        name: "Sofia Ramirez",
        role: "HSE Manager",
        company: "Andean Copper",
        quote:
          "MineVision AI gives us real-time PPE and zone compliance across multiple pits. We've reduced near-misses and have evidence for every alert.",
        rating: 5,
      },
      {
        name: "Liam O'Connor",
        role: "Operations Director",
        company: "Northern Minerals",
        quote:
          "Sensor fusion cut false alarms. Maintenance gets vibration-based alerts days before a breakdown — downtime is trending down.",
        rating: 5,
      },
      {
        name: "Priya Deshmukh",
        role: "Compliance Lead",
        company: "Global Ore",
        quote:
          "Incident evidence, response times, and environmental metrics are centralized. Audits that took weeks now take hours.",
        rating: 5,
      },
      {
        name: "Ethan Price",
        role: "Plant Superintendent",
        company: "Iron Ridge",
        quote:
          "MineVision's proximity alerts and automated workflows have already prevented stoppages on our conveyor line.",
        rating: 5,
      },
    ],
  },

  integrations: {
    title: "Fits your OT, IoT, and safety stack",
    subtitle: "Connect cameras, sensors, control rooms, and data platforms.",
    items: [
      { name: "IP/RTSP Cameras", category: "Vision" },
      { name: "Modbus / OPC-UA", category: "IoT" },
      { name: "SCADA / DCS", category: "Control" },
      { name: "OSIsoft PI", category: "Historian" },
      { name: "Azure IoT", category: "Cloud" },
      { name: "AWS IoT Core", category: "Cloud" },
      { name: "Kafka", category: "Streaming" },
      { name: "REST API", category: "Integration" },
    ],
  },

  comparison: {
    title: "Manual Monitoring vs MineVision AI",
    subtitle: "See how automated detection and sensor fusion reduce risk and downtime.",
    headers: ["", "MineVision AI", "Manual Monitoring"],
    rows: [
      { feature: "Detection", values: ["Vision + IoT, 24/7", "Spot checks, delayed"] },
      { feature: "PPE & zones", values: ["Automated with evidence clips", "Manual observation"] },
      { feature: "Alerts", values: ["Real-time, routed to workflows", "Radio/phone, inconsistent"] },
      { feature: "Maintenance", values: ["Predictive from trends", "Run-to-failure"] },
      { feature: "Compliance", values: ["Dashboards & audit exports", "Spreadsheets & paper"] },
      { feature: "False positives", values: ["Reduced via sensor fusion", "High or unknown"] },
    ],
  },

  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle: "Everything you need to know about MineVision AI for safety intelligence.",
    items: [
      {
        question: "What does MineVision AI do?",
        answer:
          "MineVision AI delivers real-time safety intelligence for mining and heavy industry. It uses computer vision and IoT sensor data to detect PPE and zone violations, hazards, and maintenance risks with automated alerts and dashboards.",
      },
      {
        question: "How do you integrate with existing cameras and sensors?",
        answer:
          "We connect to IP/RTSP cameras and OT/IoT data via Modbus, OPC-UA, SCADA/DCS, or cloud IoT hubs. We also offer a REST API and streaming connectors like Kafka for custom pipelines.",
      },
      {
        question: "How do you reduce false positives?",
        answer:
          "We fuse camera detections with sensor context (gas, dust, vibration, temperature) and location/zone data. This raises confidence, suppresses noise, and provides evidence clips with readings.",
      },
      {
        question: "Can alerts trigger actions automatically?",
        answer:
          "Yes. Alerts can route to radios, SMS, email, control rooms, ticketing/CMMS, or webhooks. You can automate lockouts, stoppages, or maintenance tickets based on policy.",
      },
      {
        question: "Is it suitable for underground environments?",
        answer:
          "Yes. We support low-light and thermal camera inputs and fuse with underground gas, vibration, and proximity sensors to maintain coverage where visibility is limited.",
      },
      {
        question: "How quickly can we deploy?",
        answer:
          "Typical pilots connect priority cameras and sensors within days. Full rollouts depend on network access and site count; we stage deployments to minimize disruption.",
      },
      {
        question: "How is data secured?",
        answer:
          "We follow standard enterprise security practices, support data residency where required, and offer role-based access with audit trails. Camera streams are processed with secure transport.",
      },
      {
        question: "What reporting is available?",
        answer:
          "Dashboards cover incidents, alert response times, maintenance signals, and ESG metrics. Export evidence and logs for audits, regulators, or insurers.",
      },
    ],
  },

  cta: {
    headline: "Real-Time Safety Intelligence",
    headlineAccent: "for Mining & Heavy Industry",
    description:
      "Deploy MineVision AI to detect hazards sooner, enforce PPE and zone rules automatically, and keep production running safely.",
    primaryCta: { label: "See a Live Demo", href: "#" },
    secondaryCta: { label: "Talk to Us", href: "#" },
    trust: [
      "Computer vision PPE & zone compliance",
      "Sensor fusion for hazard detection",
      "Predictive maintenance insights",
      "ESG and compliance-ready dashboards",
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
          { label: "Demo", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "Security", href: "#" },
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
          { label: "Compliance", href: "#" },
        ],
      },
    ],
  },
};
