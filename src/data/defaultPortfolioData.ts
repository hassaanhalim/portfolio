import { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Hassaan Halim",
    initials: "HH",
    title: "Hi, I'm Hassaan",
    tagline: "Currently a student, learning software development.",
    bio: "I am a dedicated BSCS student at IIUI with a year of practical software development experience. My absolute favorite part of development is pushing my own technical boundaries; I love learning new programming languages, want to master new technologies, and actively try experimenting with them to build better things. I am looking to bring this drive and analytical mindset to a dynamic team where I can grow as an engineer and build robust software that solves everyday, real-world problems.",
    avatarUrl: "https://res.cloudinary.com/ncjzdgxy/image/upload/v1787933433/Profile_kmvhe6.jpg",
    location: "Islamabad, Pakistan.",
    statusText: "Available for interesting projects & collabs",
    statusAvailable: true,
    resumeUrl: "#",
    socials: [
      {
        platform: "github",
        label: "GitHub",
        url: "https://github.com/hassaanhalim"
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/hassaanhalim2006"
      },
      {
        platform: "email",
        label: "Email",
        url: "hassaanhalim2006@gmail.com"
      }
    ]
  },
  experiences: [
    {
      id: "exp-1787933971334",
      company: "Paramount Intelligence",
      role: "Intern",
      startDate: "June 2026",
      endDate: "September 2026",
      location: "Islamabad, Pakistan",
      description: "Completed a 3-month Web Development internship focused on building dynamic, responsive web applications using React, Next.js, JavaScript, and Tailwind CSS. Contributed to end-to-end frontend feature implementation, including interactive UI components, state management, and API integration. Worked with modern web tools and Git workflows to deliver clean, maintainable code and scalable interface components.",
      bullets: [
        "Built responsive frontend interfaces using React, Next.js, and Tailwind CSS",
        "Integrated REST APIs and implemented reactive UI state management",
        "Collaborated with Git workflows and modern web tooling"
      ],
      logoUrl: "https://www.paramountintelligence.co/_next/image?url=%2Fimages%2Flogo.png&w=48&q=75",
      websiteUrl: "https://www.paramountintelligence.co",
      badges: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Git",
        "GitHub",
        "REST APIs"
      ]
    }
  ],
  education: [
    {
      id: "edu-1787934315073",
      institution: "International Islamic University, Islamabad",
      degree: "BSCS",
      startDate: "2025",
      endDate: "Ongoing",
      logoUrl: "https://scontent.fisb12-1.fna.fbcdn.net/v/t39.30808-1/310276684_145150708241686_5498917284299831962_n.jpg?stp=dst-jpg_tt6&cstp=mx537x537&ctp=s200x200&_nc_cat=100&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeE5ACbjoFpMQx9Xc7ZfUgrgFZ6EqocDQXcVnoSqhwNBd2VJDEYyJwhGXRbip4XuL7PTolQwZ_W0_XoXKZxvkIur&_nc_ohc=0UIff_6nlrQQ7kNvwGB9BbY&_nc_oc=Adq4B6k4pomwWYQq8JfZ1jNep89hdSaeFSdreKuhnAwpOGwFW7N_U5EUPSS9jW4yWzX8Uy0ygtoxiS5oEKMwtbsv&_nc_zt=24&_nc_ht=scontent.fisb12-1.fna&_nc_gid=1JWOVh8lIZk6AOY53_kcrA&_nc_ss=7b2a8&oh=00_AQFHZqhuxhM3KortEBapQ7pWTJc5HUiIxcCvCmDa9D-Y8w&oe=6A979064",
      websiteUrl: "https://www.iiu.edu.pk/",
      description: "BS Computer Science student at IIUI focused on web development and software engineering."
    },
    {
      id: "edu-1787934178602",
      institution: "Qurtaba School and College, B17 Campus",
      degree: "Intermediate",
      startDate: "2022",
      endDate: "2024",
      logoUrl: "https://scontent.fisb12-1.fna.fbcdn.net/v/t39.30808-1/364096192_273927948614834_8907502498128689908_n.jpg?stp=dst-jpg_tt6&cstp=mx1149x1150&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeHeU-C0pCJIZ5Oxa8K6yxwjcsqprnKK16ZyyqmucorXpkaZdjIe8K5BdVhC_VFxyMarp7M-BTdJX3378_8c34-4&_nc_ohc=2tK9aQAlqKMQ7kNvwEtyRJd&_nc_oc=Adre5MQT97U5qCvRgcrqNBLLyF1U0ZBoFmJa9ERpXkQ_vJwS9wBHuJP1NLKo0oQb29_m77KrueZQSl21YahkFTMa&_nc_zt=24&_nc_ht=scontent.fisb12-1.fna&_nc_gid=EXQjmg6xA0YnmBjP1YWxLQ&_nc_ss=7b2a8&oh=00_AQEUf1cdCaJdpl0INyA9D4nCaMSvzPavO3ylU5e2wU7jgQ&oe=6A979467",
      websiteUrl: "https://qes.qurtuba.edu.pk/",
      description: "FSc. PreMedical"
    }
  ],
  skills: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
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
      id: "proj-1787934780592",
      title: "E commerce website",
      description: "Full-stack footwear e-commerce platform with product discovery, filtering, cart, checkout, orders, reviews, and admin management. Includes an AI shopping assistant that understands customer needs and recommends real products from the catalog. Built with React, NestJS, PostgreSQL, Prisma, Groq, Vercel, and Railway.",
      dates: "2026 - Present",
      tags: [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "React Router",
        "NestJS",
        "Node.js",
        "Prisma ORM",
        "PostgreSQL",
        "Supabase",
        "JWT",
        "Passport.js",
        "Groq API",
        "Llama 3.3 70B",
        "Vercel",
        "Railway",
        "Playwright",
        "Swagger"
      ],
      imageUrl: "https://res.cloudinary.com/ncjzdgxy/image/upload/v1787934662/Capture_u8fglp.png",
      videoUrl: "",
      liveUrl: "https://www.shoestore.live/",
      githubUrl: "https://github.com/hassaanhalim/e-commerce-website.git",
      featured: true,
      previewType: "iframe"
    }
  ],
  hackathons: [],
  messages: []
};
