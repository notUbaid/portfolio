export const hero = {
  name: "UBAID KHAN",
  roles: [
    "full-stack developer",
    "ui designer",
    "club president",
    "professional hackathon attendee",
  ],
  tagline: "this is not another AI-generated portfolio.",
};

export const about = {
  heading: "the lore",
  paragraphs: [
    "3rd year Computer Engineering student at IAR, Gandhinagar. Yes, the university no one have heard of, had to improvise because of core computer engineering branch.",
    "I build things that actually ship. Metro apps with real users heading to Google Play, pharmacy systems that reduce medicine waste by 74%, and RL environments submitted to Meta hackathons.",
    "I run the Computer Society & Gaming Club. Built our tournament portal from scratch, organized events open to all colleges, ran the committee. Before that I was Digital Head for CSGC and STEM Club, which is a fancy way of saying I made a lot of posters.",
    "I've been in the top teams at multiple national-level hackathons. Always 1st or 2nd in my college ones, but who's counting those.",
  ],
};

export const projects = {
  heading: "things i've shipped",
  items: [
    {
      name: "Cloud Alert Triage",
      tagline:
        "An RL environment where AI agents do the on-call shifts I don't want to.",
      description:
        "OpenEnv-compliant Reinforcement Learning environment where AI agents classify, correlate, and remediate cloud alerts across a 17-service microservice graph. Agents score 0.83-0.97 reward across difficulty tiers. Containerised FastAPI server. Submitted to Meta × PyTorch × HuggingFace OpenEnv Hackathon 2026. Didn't win it, but it was a damn good project.",
      tech: ["Python", "FastAPI", "Docker", "Pydantic", "RL/ML"],
      github: "https://github.com/notUbaid/cloud-alert-triage",
      live: "https://huggingface.co/spaces/notUbaid/CloudAlert-Triage-AI",
      liveLabel: "HuggingFace",
      status: "Hackathon",
    },
    {
      name: "Inventra",
      tagline:
        "Built a production-ready inventory system in under 24 hours. Sleep is overrated.",
      description:
        "Multi-role inventory platform with 8+ modules including multi-warehouse tracking, immutable stock ledger, RBAC across 3 roles, SKU/barcode management, and live KPI dashboard. 3rd Place at Codeversity National Hackathon, IIT Gandhinagar.",
      tech: ["React 19", "Node.js", "Express", "SQLite", "JWT", "Tailwind"],
      github: "https://github.com/notUbaid/inventra-inventory-system",
      live: "https://inventra-inventory-system.onrender.com/",
      status: "Hackathon · 🥉",
    },
    {
      name: "Veda",
      tagline:
        "AI tells hospitals when their medicine is about to expire. You're welcome, healthcare.",
      description:
        "AI-powered pharmacy platform with batch-level inventory tracking, FEFO-based stock management, and Gemini-powered demand prediction, reducing projected medicine wastage by up to 74% in simulation. 2nd Place at Aetrix Hackathon, PDEU.",
      tech: ["React 19", "TypeScript", "Firebase", "Gemini 1.5", "Recharts"],
      github: "https://github.com/notUbaid/Veda",
      live: "https://veda-management.vercel.app/",
      status: "Hackathon · 🥈",
    },
    {
      name: "Kontxt",
      tagline:
        "A platform for vibe coding. Yes, that's a real engineering discipline now.",
      description:
        "Interactive platform guiding developers through the complete software lifecycle. Idea validation, architecture, development, and production readiness. Multi-mode workflows for production apps, hackathons, and personal projects.",
      tech: ["React 19", "TypeScript", "Vite", "Firebase", "AI Prompts"],
      github: "https://github.com/notUbaid/Kontxt",
      live: "https://kontxt-zeta.vercel.app/",
      status: "WIP",
    },
    {
      name: "Ahmedabad Metro",
      tagline:
        "1,000+ visits. Dijkstra's algorithm. A Google Play listing pending review. I peaked.",
      description:
        "Navigation tool covering all 54 operational stations. Features optimal routing via Dijkstra's algorithm, interchange detection, live GPS nearest-station lookup with walking-time estimates. Updated with latest official timetables. Android app in review.",
      tech: ["React 19", "TypeScript", "Vite", "shadcn/ui"],
      github: "https://github.com/notUbaid/ahmedabad-metro-map",
      live: "https://www.ahmedabadmetro.site",
      status: "Production",
    },
  ],
};

export const clientWork = {
  heading: "stuff clients paid me for",
  subtitle: "actual money changed hands. my parents were impressed.",
  items: [
    {
      name: "The Choco Munch",
      tagline:
        "A freelance gig that actually paid. My mom finally understands what I do.",
      description:
        "Responsive, mobile-first business website for a bakery client. Handled end-to-end from requirements to production. SEO optimised, conversion-focused layout. Led to measurable increase in client inquiries.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      live: "https://thechocomunch.vercel.app/",
    },
    {
      name: "Indian Live Sports Hub",
      tagline:
        "Sports news site. Because every Indian uncle needs live cricket scores on a website he can actually navigate.",
      description:
        "Full sports media website with live scores, news, and event coverage. Clean responsive design built for heavy traffic and fast load times.",
      tech: ["Web Dev", "SEO", "Responsive Design"],
      live: "https://www.indianlivesportshub.com",
    },
  ],
};

export const achievements = {
  heading: "the trophy case",
  subtitle: "proof i leave my room sometimes",
  items: [
    {
      icon: "Medal",
      title: "2nd Place",
      event: "Aetrix Hackathon",
      org: "Pandit Deendayal Energy University",
      project: "Veda",
    },
    {
      icon: "Award",
      title: "3rd Place",
      event: "Codeversity National Hackathon",
      org: "IIT Gandhinagar",
      project: "Inventra",
    },
    {
      icon: "Trophy",
      title: "Finalist in Multiple Hackathons",
      event: "Meta × PyTorch × HuggingFace OpenEnv Hackathon",
      org: "2026",
      project: "Cloud Alert Triage",
    },
  ],
  footnote: "easily win college hackathons but who counts those",
  extras: [],
};

export const experience = {
  heading: "the résumé stuff",
  items: [
    {
      role: "President",
      org: "Computer Society & Gaming Club (CSGC), IAR",
      duration: "July 2026 – June 2027 (hopefully)",
      note: "yes, I run a gaming club. yes, it's on my résumé.",
      details: [
        "Leading technical and strategic initiatives for 700+ student members",
        "Built the club's internal web portal for registrations, event management, and live scoring",
        "Organized multi-college tournaments (BGMI Rampage & more) open to all",
        "Replaced every manual workflow with code, because I can",
      ],
    },
    {
      role: "Graphic Design Intern",
      org: "InAmigos Foundation",
      duration: "1 week in 2025",
      note: "barely counts as an internship but I did get the certificate",
      details: [
        "Created visual content and online materials for social impact campaigns",
        "Fundraising campaign design, community outreach materials",
        "Digital design work supporting the foundation's mission",
      ],
    },
    {
      role: "Digital Head",
      org: "CSGC & STEM Club",
      duration: "July 2024 – June 2026",
      note: null,
      details: [
        "Managed all digital assets and promotional materials",
        "Designed 100+ event posters, banners, and tournament graphics",
        "Created club branding and visual identity from scratch",
      ],
    },
    {
      role: "Freelance Web Developer",
      org: "The Choco Munch & Indian Live Sports Hub",
      duration: "2025 – Present",
      note: "got paid for code. milestone unlocked.",
      details: [
        "End-to-end websites from requirements gathering to production deploy",
        "SEO optimisation, responsive design, conversion-focused layout",
      ],
    },
  ],
};

export const skills = {
  heading: "things i can actually do",
  categories: [
    {
      label: "Languages I write bugs in",
      items: ["Python", "JavaScript", "TypeScript", "C/C++"],
    },
    {
      label: "Frontend",
      items: ["React 19", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    },
    {
      label: "Backend",
      items: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT"],
    },
    {
      label: "Databases & infra",
      items: ["Firebase", "PostgreSQL", "SQL", "SQLite", "Docker"],
    },
    {
      label: "AI stuff",
      items: ["LLM APIs", "Gemini", "Machine Learning", "Prompt Engineering"],
    },
    {
      label: "Design",
      items: ["Figma", "Canva", "UI/UX", "Motion Design"],
    },
    {
      label: "I deploy things to",
      items: ["Vercel", "Render", "GitHub Actions", "HuggingFace Spaces"],
    },
    {
      label: "Secret talent",
      items: ["Finding any app subscription for cheap"],
    },
  ],
};

export const footer = {
  tagline:
    "built with next.js, too much coffee, and a vendetta against glassmorphism",
  github: "https://github.com/notUbaid",
  linkedin: "https://linkedin.com/in/notubaid",
  email: "me.khanubaid@gmail.com",
  year: new Date().getFullYear(),
  name: "Ubaid Khan",
};
