export const hero = {
  name: "UBAID KHAN",
  roles: [
    "full-stack developer",
    "ui designer",
    "club president",
    "competitive hackathon participant",
  ],
  tagline: "a personal testing ground for everything new i learn.",
};

export const about = {
  heading: "the lore",
  paragraphs: [
    "3rd year Computer Engineering student at IAR, Gandhinagar. Yes, the university no one have heard of, had to improvise because of core computer engineering branch.",
    "I build things that actually ship. Metro app with real users heading to Google Play, production-ready inventory platforms built overnight, and RL environments submitted to Meta hackathons.",
    "I run the biggest club of my college, the Computer Society & Gaming Club. Built our tournament portal from scratch, organized events open to all colleges, ran the committee. Before that I was Digital Head for CSGC and STEM Club, which is a fancy way of saying i did lots of graphic designing and free pr for the club.",
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
        "An OpenEnv-compliant Reinforcement Learning environment designed for autonomous cloud operations. AI agents are trained to classify, correlate, and dynamically remediate cascading cloud alerts across a complex 17-service microservice graph. The environment exposes a containerized FastAPI backend serving OpenAI Gym-style step/reset endpoints. Agents achieved a 0.83–0.97 reward score across multiple difficulty tiers. Built for the Meta × PyTorch × HuggingFace OpenEnv Hackathon 2026.",
      wittyDescription:
        "I got tired of reading about DevOps engineers crying at 3 AM, so I built an RL environment where an AI does the on-call shifts instead. It navigates a 17-microservice graph, and somehow hits a 0.97 reward score. We lost the Meta/PyTorch hackathon to some PhD students who probably trained their model on a supercomputer, but I got to pretend I understand PyTorch for a weekend. The 0.97 reward is real though, even if the AI sometimes just deleted the server to fix the alert.",
      tech: ["Python", "FastAPI", "Docker", "Pydantic", "RL/ML"],
      github: "https://github.com/notUbaid/cloud-alert-triage",
      live: "https://huggingface.co/spaces/notUbaid/CloudAlert-Triage-AI",
      liveLabel: "HuggingFace",
      status: "Hackathon",
    },
    {
      name: "Inventra",
      tagline:
        "Built a production-ready inventory system in under 24 hours. Powered by pure adrenaline.",
      description:
        "A comprehensive, multi-role inventory management system designed for warehouse operations. It features multi-warehouse tracking down to specific storage locations (racks, shelves, and bins), role-based access control, and an immutable stock ledger for rigorous auditability. The full-stack architecture utilizes React 19, Zustand, Node.js/Express, and a highly optimized better-sqlite3 file-based database for rapid read/write operations. Awarded 3rd Place at the Codeversity National Hackathon.",
      wittyDescription:
        "Built a production-ready inventory system in 24 hours on purely caffeine and spite. Features an 'immutable stock ledger' (which mostly means I didn't want to write SQL update queries). It actually tracks multi-warehouse stock down to the specific bin and rack using better-sqlite3 and Zustand. We placed 3rd at Codeversity, which means we got a shiny trophy but missed the big prize money. Still salty, but the codebase is clean.",
      tech: ["React 19", "Node.js", "Express", "SQLite", "JWT", "Tailwind"],
      github: "https://github.com/notUbaid/inventra-inventory-system",
      live: "https://inventra-inventory-system.onrender.com/",
      status: "Hackathon · 3rd",
    },
    {
      name: "Veda",
      tagline:
        "AI tells hospitals when their medicine is about to expire. You're welcome, healthcare.",
      description:
        "A next-generation AI-powered hospital pharmacy intelligence system built to eliminate drug wastage and prevent critical stockouts. The platform enforces strict FEFO (First Expire First Out) dispensing at the database query level and tracks inventory across multiple stores at the batch level. Integrated with an XGBoost ML model to provide demand forecasting at 95-96% accuracy. Secured via granular Firebase security rules for Admin, Manager, and Pharmacist roles. Awarded 2nd Place at the Aetrix Hackathon.",
      wittyDescription:
        "Turns out government hospitals throw away millions in expired drugs. I built this to enforce FEFO dispensing directly in the database queries so pharmacists literally can't dispense the wrong batch. Slapped XGBoost on top for '96% accurate demand forecasting'. The judges at PDEU loved it enough to give us 2nd place. The '74% reduction in simulation' was an absolute nightmare to calculate properly, but the Firebase RBAC is bulletproof.",
      tech: ["React 19", "TypeScript", "Firebase", "Gemini 1.5", "Recharts"],
      github: "https://github.com/notUbaid/Veda",
      live: "https://veda-management.vercel.app/",
      status: "Hackathon · 2nd",
    },
    {
      name: "Kontxt",
      tagline:
        "A platform for vibe coding. Yes, that's a real engineering discipline now.",
      description:
        "An interactive software-building curriculum and architectural project brain. Kontxt bridges the gap in the AI-coding era by guiding developers through the complete Software Development Lifecycle (SDLC). It forces critical architectural decision-making—defining tech stacks, database schemas, and UX flows—before delegating code generation to AI agents, acting as a centralized knowledge base to prevent hallucination and enforce engineering best practices.",
      wittyDescription:
        "I got tired of opening 15 ChatGPT tabs to structure my Next.js apps, so I built a 'project brain' to do it for me. It's basically a guided curriculum to stop AI agents from hallucinating spaghetti code when you 'vibe code'. It forces you to actually design your Supabase schema before prompting Cursor to build it. 'Vibe coding' is just a fancy buzzword, but at least this keeps the architecture sane.",
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
        "An immersive transit navigation application for the Ahmedabad and Gandhinagar metro network. It transforms raw network data into an interactive, full-screen map using Leaflet and React. Features live geolocation, OpenStreetMap/Nominatim integration for location search, and an implementation of Dijkstra's algorithm to calculate optimal routes. It surfaces nearest stations dynamically with walking distance and estimated walk times.",
      wittyDescription:
        "I just wanted to know how to get to college without getting lost. Wrote Dijkstra's algorithm from scratch to map out all 54 stations and the Gift City branch just to flex on my data structures professor. It actually uses live GPS and Leaflet to calculate walking time to the nearest station. Google Play took forever to review it, probably because they couldn't believe someone mapped the entire Ahmedabad transit system purely for fun.",
      tech: ["React 19", "TypeScript", "Vite", "shadcn/ui"],
      github: "https://github.com/notUbaid/ahmedabad-metro-map",
      live: "https://www.ahmedabadmetro.site",
      status: "Production",
    },
    {
      name: "WhiteNet",
      tagline:
        "Built a Zero Trust network layer from scratch in 36 hours because normal VPNs were too mainstream.",
      description:
        "A decentralized, identity-first Zero Trust network layer protocol built in Python. It strictly binds node identities to IPv6 addresses using a custom Public Key Infrastructure (PKI) to neutralize IP spoofing and MITM attacks. Features full simulations of TLS 1.3 handshakes, DNSSEC record signing, and encrypted VPN tunnel derivation (AES-256-GCM). The project also includes a tamper-evident audit system using SHA-256 hash chains, decentralized community governance, and a real-time web dashboard using React and Flask to visualize active network topologies.",
      wittyDescription:
        "I saw a fancy-looking cybersecurity problem statement and decided to build my first ever cyber project. 36 hours of caffeine-fueled coding later, I ended up writing a custom Public Key Infrastructure, simulating TLS 1.3 handshakes, and building a tamper-evident audit log from scratch. Turns out, enforcing strict Zero Trust architecture is actually pretty fun when you're running on pure adrenaline and building real-time force-directed graphs to visualize your encrypted VPN tunnels.",
      tech: ["Python", "React", "Flask", "Cryptography", "Zero Trust"],
      github: "https://github.com/Destroyerved/WhiteNet",
      status: "Hackathon",
    },
  ],
};

export const clientWork = {
  heading: "stuff clients paid me for",
  subtitle: "actual money changed hands. my parents were impressed.",
  items: [
    {
      name: "The Choco Munch",
      tagline: "Custom business website for a local bakery.",
      wittyTagline: "A freelance gig that actually paid real money.",
      description:
        "Handled end-to-end from requirements to production. Responsive, mobile-first, SEO optimized, and conversion-focused layout. Led to a measurable increase in client inquiries.",
      wittyDescription:
        "I built this site and suddenly my mom understands what I do for a living. I told the client it's 'conversion-focused', which is my professional way of saying I made the 'Buy Now' buttons really big.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      live: "https://thechocomunch.vercel.app/",
    },
    {
      name: "Indian Live Sports Hub",
      tagline: "Digital presence and live streaming portal for sports broadcasting.",
      wittyTagline: "100k+ YouTube subs, so they're kind of a big deal.",
      description:
        "Built their digital presence from scratch to handle heavy traffic from their massive audience. Features a clean, responsive design tailored for live sports media.",
      wittyDescription:
        "They were in a huge hurry, so I threw together a lovable, custom-made website. The 'clean responsive design' was just me frantically trying to make sure it didn't crash when thousands of people logged on at once.",
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
      wittyDescription: "ML model crashed during the live demo, but we smoothly gaslit the judges into thinking it worked perfectly. Boom, 2nd place.",
    },
    {
      icon: "Award",
      title: "3rd Place",
      event: "Codeversity National Hackathon",
      org: "IIT Gandhinagar",
      project: "Inventra",
      wittyDescription: "Forgot to submit our demo video. Lost a massive chunk of points and dropped from an easy 1st to 3rd place. Still salty.",
    },
    {
      icon: "Trophy",
      title: "Finalist\nin Multiple Hackathons",
      event: "would've won with a better team btw",
      dimEvent: true,
      wittyDescription: "Professional hackathon tourist. I write code until 4 AM, pitch a half-broken prototype with extreme confidence, and leave with an unofficial campus tour.",
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
      wittyDescription: "Met an amazing committee and learned how to actually lead people without panicking. Replaced manual workflows with code just to see if I could. Grew a massive amount in confidence and public speaking.",
    },
    {
      role: "Graphic Design Intern",
      org: "InAmigos Foundation",
      duration: "1 week sometime in mid 2025",
      note: "barely counts as an internship but I did get the certificate",
      details: [
        "Created visual content and online materials for social impact campaigns",
        "Fundraising campaign design, community outreach materials",
        "Digital design work supporting the foundation's mission",
      ],
      wittyDescription: "Spent a week designing social impact campaigns. Mainly learned that I prefer coding over aligning text boxes, but the design eye definitely stuck with me.",
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
      wittyDescription: "Designed 100+ event posters and tournament graphics. Basically forced myself to learn color theory and branding from scratch. The aesthetic obsession started here.",
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
      wittyDescription: "Realized people will actually pay for my code. Handled real clients, real deadlines, and real SEO headaches. Best crash course in professional development I could ask for.",
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
    "built with next.js, too much coffee, and a very tired laptop",
  github: "https://github.com/notUbaid",
  linkedin: "https://linkedin.com/in/notubaid",
  email: "me.khanubaid@gmail.com",
  year: new Date().getFullYear(),
  name: "Ubaid Khan",
};
