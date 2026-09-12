export const WHATSAPP_URL =
  "https://wa.me/9779801234567?text=Hi%20ScheduleMate%20AI%2C%20I%20would%20like%20to%20get%20in%20touch.";

export const APP_URL = "https://schedulemateweb.vercel.app/";

export const SITE = {
  name: "ScheduleMate AI",
  tagline: "AI-Powered Scheduling",
  description:
    "Chat with AI to schedule meetings, book appointments, and manage your Google Calendar effortlessly.",
  url: "https://schedulemate.app",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const HERO = {
  badge: "Early access — 10 free requests",
  title: "Your schedule,\nmanaged by chat.",
  subtitle:
    "Stop juggling calendars. Just tell the AI what you need — 'Book a meeting with Sarah Thursday at 3 PM' — and it's done. Connects to your Google Calendar.",
  primaryCta: { label: "Get Started Free", href: APP_URL },
  secondaryCta: { label: "See How It Works", href: "#how-it-works" },
} as const;

export const FEATURES = [
  {
    icon: "MessageSquare",
    title: "Chat to Schedule",
    description:
      "Just say what you need in plain English. 'Schedule a meeting tomorrow at 10 AM' or 'Find me a free slot this week' — the AI handles it.",
  },
  {
    icon: "Calendar",
    title: "Google Calendar Sync",
    description:
      "Connect your Google Calendar and the AI reads/writes events directly. Everything stays in sync automatically.",
  },
  {
    icon: "Clock",
    title: "Find Free Slots",
    description:
      "Ask the AI to find when you're free. It checks your calendar and suggests the best times for your meetings.",
  },
  {
    icon: "Users",
    title: "Multi-Participant Meetings",
    description:
      "Schedule meetings with multiple people. The AI finds common availability and books the best time for everyone.",
  },
  {
    icon: "RefreshCw",
    title: "Reschedule Easily",
    description:
      "Need to move a meeting? Just tell the AI — 'Move my 3 PM to Friday' — and it handles the reschedule.",
  },
  {
    icon: "MessageCircle",
    title: "Conversation History",
    description:
      "Keep all your scheduling conversations organized. Pick up where you left off in any previous chat.",
  },
] as const;

export const PRODUCT = {
  kicker: "See it in action",
  title: "A chat that books your calendar",
  subtitle:
    "Real screens from the app — book a meeting from a chat message, all through your Google Calendar.",
} as const;

export const HOW_IT_WORKS = {
  title: "From chat to booked in three steps",
  subtitle:
    "From sign-up to your first AI-scheduled meeting in under 2 minutes.",
  steps: [
    {
      number: "01",
      title: "Sign up with email or Google",
      description:
        "Create your free account in seconds. No credit card required.",
      highlight: "Quick 2-minute setup",
    },
    {
      number: "02",
      title: "Connect your Google Calendar",
      description:
        "Link your Google Calendar so the AI can read your schedule and create events for you.",
      highlight: "One-click calendar connection",
    },
    {
      number: "03",
      title: "Chat and let AI handle it",
      description:
        "Just tell the AI what you need. It books, reschedules, and finds free slots — all through natural conversation.",
      highlight: "10 free requests to start",
    },
  ],
} as const;

export const PRICING = {
  kicker: "Pricing",
  title: "Simple plans with room to grow",
  subtitle:
    "Start with a free trial, then pick the plan that fits your club — cloud sync, staff tools, and capacity as you scale.",
  plans: [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Everything you need to try AI scheduling.",
      features: [
        "10 AI scheduling requests",
        "Google Calendar sync",
        "Multi-participant meetings",
        "Conversation history",
        "Works in any browser",
      ],
      cta: { label: "Get Started Free", href: APP_URL },
      featured: true,
    },
    {
      name: "Early Access",
      price: "Soon",
      period: "",
      description: "For power users who want more, sooner.",
      features: [
        "More AI requests",
        "Priority support",
        "Early feature access",
        "Direct feedback line",
      ],
      cta: { label: "Join the Waitlist", href: WHATSAPP_URL },
      featured: false,
    },
  ],
} as const;

export const FAQ = [
  {
    question: "What is ScheduleMate AI?",
    answer:
      "ScheduleMate AI is an AI scheduling assistant. You chat with it naturally — like texting a friend — to schedule meetings, book appointments, and manage your Google Calendar.",
  },
  {
    question: "How does the AI chat work?",
    answer:
      "Just type what you need: 'Book a meeting with John next Tuesday at 2 PM' or 'Find me a free slot this week.' The AI understands natural language and handles the scheduling for you using your Google Calendar.",
  },
  {
    question: "How many free requests do I get?",
    answer:
      "You get 10 free requests when you sign up. Each chat message counts as one request. This lets you try the full experience before deciding.",
  },
  {
    question: "Which calendars do you support?",
    answer:
      "Currently, ScheduleMate AI integrates with Google Calendar. The AI reads and writes events directly to your calendar, keeping everything in sync.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use secure authentication and your calendar data is only used to provide the scheduling service. We never share your data with third parties.",
  },
  {
    question: "Can I connect multiple calendars?",
    answer:
      "You can connect one Google Calendar per account. The AI manages events across your connected calendar and respects your existing schedule.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation needed. ScheduleMate AI works entirely in your web browser. Just sign up, connect your Google Calendar, and start chatting.",
  },
  {
    question: "How do I get help?",
    answer:
      "Reach out through the contact options on this site. Our team can help with setup, calendar connections, and any questions about using the AI assistant.",
  },
] as const;

export const FOOTER = {
  description:
    "AI-powered scheduling through chat. Manage your Google Calendar with natural language.",
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const CTA = {
  title: "Ready to get your schedule under control?",
  subtitle:
    "Start free with 10 AI requests on signup. No credit card required.",
  primaryCta: { label: "Get Started Free", href: APP_URL },
} as const;

export const PRIVACY = {
  title: "Privacy Policy",
  lastUpdated: "September 3, 2026",
  content: [
    {
      heading: "Introduction",
      text: "This Privacy Policy explains how ScheduleMate AI ('we', 'us', or 'our') collects, uses, and protects your personal information when you use our scheduling application and website.",
    },
    {
      heading: "Information We Collect",
      text: "We collect your name and email address when you sign up. When you connect your Google Calendar, we access your calendar data to provide scheduling services. We also store your chat conversations with the AI assistant.",
    },
    {
      heading: "How We Use Your Information",
      text: "We use your information to provide the scheduling service, sync your calendar, and power the AI assistant. Your calendar data is only used to read and create events as instructed by you. We do not sell your personal data to third parties.",
    },
    {
      heading: "Data Security",
      text: "We use industry-standard security measures to protect your data. Your Google Calendar access can be revoked at any time from your account settings.",
    },
    {
      heading: "Contact Us",
      text: "If you have any questions about this Privacy Policy, please contact us at support@schedulemate.app.",
    },
  ],
} as const;

export const TERMS = {
  title: "Terms and Conditions",
  lastUpdated: "September 3, 2026",
  content: [
    {
      heading: "Acceptance of Terms",
      text: "By accessing or using ScheduleMate AI, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the service.",
    },
    {
      heading: "Use of Service",
      text: "ScheduleMate AI provides an AI-powered scheduling assistant. You may use the service for lawful purposes only. You are responsible for maintaining the confidentiality of your account.",
    },
    {
      heading: "AI Assistant",
      text: "Our AI assistant helps with scheduling tasks by reading and writing to your Google Calendar. AI results may not always be accurate, and you are responsible for verifying scheduled events.",
    },
    {
      heading: "Usage Limits",
      text: "Free accounts include a limited number of AI requests. Usage limits may be adjusted by administrators. We reserve the right to modify usage limits with notice.",
    },
    {
      heading: "Intellectual Property",
      text: "All content, features, and functionality of ScheduleMate AI are owned by us and are protected by copyright, trademark, and other intellectual property laws.",
    },
    {
      heading: "Contact Us",
      text: "If you have any questions about these Terms, please contact us at support@schedulemate.app.",
    },
  ],
} as const;
