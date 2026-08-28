import { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Dillion Verma",
    initials: "DV",
    title: "Hi, I'm Dillion",
    tagline: "Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.",
    bio: "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, I pursued a double degree in computer science and business, interned at big tech companies in Silicon Valley, and competed in over 21 hackathons for fun. I also had the pleasure of being a part of the first ever in-person cohort of buildspace called buildspace sf1.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    location: "San Francisco, CA",
    statusText: "Available for interesting projects & collabs",
    statusAvailable: true,
    resumeUrl: "#",
    socials: [
      { platform: 'github', label: 'GitHub', url: 'https://github.com' },
      { platform: 'twitter', label: 'X (Twitter)', url: 'https://twitter.com' },
      { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
      { platform: 'email', label: 'Email', url: 'mailto:hello@example.com' },
      { platform: 'youtube', label: 'YouTube', url: 'https://youtube.com' }
    ]
  },
  experiences: [
    {
      id: "exp-1",
      company: "Atomic Finance",
      role: "Bitcoin Protocol Engineer",
      startDate: "May 2021",
      endDate: "Oct 2022",
      location: "San Francisco, CA",
      description: "Leveraged the Bitcoin network to build decentralized financial infrastructure and non-custodial yield generation protocols.",
      bullets: [
        "Architected and deployed DLC (Discreet Log Contracts) based oracle infrastructure.",
        "Built TypeScript SDKs and cross-platform mobile wallet integration components.",
        "Collaborated with core Bitcoin contributors on cryptographic primitives."
      ],
      logoUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://atomic.finance",
      badges: ["Bitcoin", "TypeScript", "Rust", "DLC"]
    },
    {
      id: "exp-2",
      company: "Shopify",
      role: "Software Engineer",
      startDate: "January 2021",
      endDate: "April 2021",
      location: "Toronto, ON",
      description: "Implemented core checkout integrations and high-throughput merchant inventory synchronizers.",
      bullets: [
        "Reduced checkout latency by 18% for high-volume flash sales.",
        "Engineered resilient GraphQL queries for merchant storefronts."
      ],
      logoUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://shopify.com",
      badges: ["Ruby on Rails", "React", "GraphQL", "Redis"]
    },
    {
      id: "exp-3",
      company: "Nvidia",
      role: "Software Engineer",
      startDate: "January 2020",
      endDate: "April 2020",
      location: "Santa Clara, CA",
      description: "Contributed to GPU telemetry systems and distributed benchmark automation pipelines for deep learning hardware validation.",
      bullets: [
        "Automated stress testing pipelines for CUDA driver performance profiling.",
        "Created dashboards visualizing real-time hardware telemetry."
      ],
      logoUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://nvidia.com",
      badges: ["Python", "C++", "CUDA", "Docker"]
    },
    {
      id: "exp-4",
      company: "Splunk",
      role: "Software Engineer",
      startDate: "January 2019",
      endDate: "April 2019",
      location: "San Jose, CA",
      description: "Developed real-time enterprise observability plugins and log streaming search acceleration features.",
      bullets: [
        "Engineered fast indexing connectors for Kubernetes cluster logs."
      ],
      logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://splunk.com",
      badges: ["Go", "Distributed Systems", "REST"]
    },
    {
      id: "exp-5",
      company: "Lime",
      role: "Software Engineer",
      startDate: "January 2018",
      endDate: "April 2018",
      location: "San Francisco, CA",
      description: "Built microservices for vehicle fleet rebalancing telemetry and rider geofencing alerts.",
      bullets: [
        "Optimized geospatial query response times across 50,000+ active micro-mobility scooters."
      ],
      logoUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://li.me",
      badges: ["Node.js", "PostgreSQL", "GIS", "Redis"]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Buildspace",
      degree: "s3, s4, sf1, s5 Resident",
      startDate: "2023",
      endDate: "2024",
      logoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://buildspace.so",
      description: "Built and launched consumer AI products during the prestigious SF residency cohort."
    },
    {
      id: "edu-2",
      institution: "University of Waterloo",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      startDate: "2016",
      endDate: "2021",
      logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://uwaterloo.ca",
      description: "Focus on Distributed Systems, Algorithms, Computer Graphics, and Security."
    },
    {
      id: "edu-3",
      institution: "Wilfrid Laurier University",
      degree: "Bachelor's Degree of Business Administration (BBA)",
      startDate: "2016",
      endDate: "2021",
      logoUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80",
      websiteUrl: "https://wlu.ca",
      description: "Double degree program specializing in Finance and Entrepreneurship."
    }
  ],
  skills: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Languages" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Languages" },
    { name: "Go", category: "Languages" },
    { name: "PostgreSQL", category: "Database" },
    { name: "TailwindCSS", category: "Frontend" },
    { name: "Docker", category: "DevOps" },
    { name: "GraphQL", category: "Backend" },
    { name: "Redis", category: "Database" },
    { name: "AWS", category: "DevOps" },
    { name: "Framer Motion", category: "Frontend" },
    { name: "Vite", category: "Tools" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "ChatCollect",
      description: "With over 100,000+ active users, ChatCollect is the AI agent platform enabling live store leads conversion directly on modern web applications.",
      dates: "Jan 2024 - Present",
      tags: ["Next.js", "TypeScript", "OpenAI", "TailwindCSS", "Stripe", "Prisma"],
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      liveUrl: "https://chatcollect.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-2",
      title: "Magic UI Component Library",
      description: "50+ open-source animated UI components built with React, TypeScript, and modern CSS for high-converting landing pages and portfolios.",
      dates: "June 2023 - Present",
      tags: ["React", "CSS Modules", "Vite", "Animation", "Open Source"],
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      liveUrl: "https://magicui.design",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-3",
      title: "llm.report",
      description: "Open-source logging and analytics platform for OpenAI LLM requests with token cost monitoring, latency charts, and cache optimizations.",
      dates: "April 2023 - Sept 2023",
      tags: ["Next.js", "Node.js", "ClickHouse", "Tremor", "TailwindCSS"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      liveUrl: "https://llm.report",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-4",
      title: "Automatic Video Subtitle AI",
      description: "Transcribes speech with Whisper AI models, generates animated karaoke-style captions, and renders 60fps MP4 clips in seconds.",
      dates: "Nov 2023 - Dec 2023",
      tags: ["React", "FFmpeg", "Whisper AI", "WebAssembly", "FastAPI"],
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false
    }
  ],
  hackathons: [
    {
      id: "hack-1",
      title: "Hack Western 9",
      dates: "November 2022",
      location: "London, Ontario",
      description: "Developed a cross-chain biometric authentication protocol for hardware keys with seamless zero-knowledge proof generation.",
      award: "1st Place Winner - Best Security Protocol",
      links: [{ title: "Devpost", url: "https://devpost.com" }]
    },
    {
      id: "hack-2",
      title: "Hack The North",
      dates: "September 2021",
      location: "Waterloo, ON",
      description: "Built an AI-powered voice assistant for visual accessibility that narrates live UI interactions and screen changes via browser extensions.",
      award: "Top 10 Finalist & Best Accessibility Hack",
      links: [{ title: "GitHub", url: "https://github.com" }, { title: "YouTube", url: "https://youtube.com" }]
    },
    {
      id: "hack-3",
      title: "ETHWaterloo",
      dates: "November 2019",
      location: "Waterloo, ON",
      description: "Created micro-lending smart contracts for community energy grid solar panel installations with automated yield settlement.",
      award: "Finalist & ConsenSys Sponsor Prize",
      links: [{ title: "Devpost", url: "https://devpost.com" }]
    },
    {
      id: "hack-4",
      title: "Global AI Hackathon SF",
      dates: "June 2019",
      location: "San Francisco, CA",
      description: "Trained generative vision neural networks to automatically generate responsive UI wireframes from handwritten napkin sketches.",
      award: "1st Place - Best Developer Tool",
      links: [{ title: "Devpost", url: "https://devpost.com" }]
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Sarah Jenkins",
      email: "sarah.j@techcorp.io",
      subject: "Collaboration on Next.js AI platform",
      message: "Hey Dillion! Loved your Magic UI components and ChatCollect demo. Would love to discuss a potential advisory role or collaboration for our seed-stage startup.",
      date: "2026-08-25 14:32",
      read: true
    }
  ]
};
