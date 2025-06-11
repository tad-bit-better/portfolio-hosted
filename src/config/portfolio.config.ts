
import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Twitter, Code, Brain, Zap, Database, Target, Eye, Mail, User, MessageSquare, Gamepad2, Settings2, Trophy, Briefcase } from 'lucide-react';

export interface Experience {
  id: string;
  companyName: string;
  role: string;
  dates: string;
  description: string;
  logoUrl: string;
  logoHint?: string;
  companyUrl: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100 for progress bar
  Icon?: LucideIcon;
}

export interface SocialLink {
  platform: string;
  url: string;
  Icon: LucideIcon;
}

export interface PortfolioConfig {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    profileImageHint?: string;
  };
  experience: Experience[];
  skills: Skill[];
  socialLinks: SocialLink[];
  contact: {
    email: string; // For display or backend use
    introText: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personalInfo: {
    name: "Pushpendra Yadav",
    title: "Pixel Paladin & Code Commander",
    bio: "Player 1 ready! I'm a dev hero, battling buggy code monsters and crafting epic web quests. My power-ups include AI, full-stack mastery, and an insatiable hunger for new tech scrolls!",
    profileImage: "https://placehold.co/300x300.png",
    profileImageHint: "profile portrait",
  },
  experience: [
    {
      id: "exp-leena-ai",
      companyName: "Leena AI",
      role: "Senior Software Engineer",
      dates: "May 2022 - Currently",
      description: "Contributed to the development of AI-powered HR solutions, focusing on enhancing employee experience and automating HR processes. Leveraged modern tech stacks to build scalable and robust applications.",
      logoUrl: "https://placehold.co/100x100.png",
      logoHint: "company logo",
      companyUrl: "#", // Replace with actual URL
      technologies: ["Node.js", "React", "TypeScript", "AWS", "Microservices"],
    },
    {
      id: "exp-fnp",
      companyName: "Ferns and Petals",
      role: "Software Engineer",
      dates: "June 2021 - April 2022",
      description: "Developed and maintained e-commerce platforms, improving performance and user experience. Worked on various modules from product discovery to checkout optimization.",
      logoUrl: "https://placehold.co/100x100.png",
      logoHint: "company logo",
      companyUrl: "#", // Replace with actual URL
      technologies: ["PHP", "Magento", "JavaScript", "MySQL", "Vue.js"],
    },
    {
      id: "exp-datafoundry",
      companyName: "Datafoundry AI",
      role: "Software Engineer",
      dates: "April 2020 - June 2021",
      description: "Focused on building data-intensive applications and AI solutions. Involved in the full software development lifecycle, from conceptualization to deployment of machine learning models.",
      logoUrl: "https://placehold.co/100x100.png",
      logoHint: "company logo",
      companyUrl: "#", // Replace with actual URL
      technologies: ["Python", "Flask", "Docker", "Kubernetes", "Google Cloud"],
    },
    {
      id: "exp-deloitte",
      companyName: "Deloitte",
      role: "Consultant",
      dates: "April 2016 - March 2019",
      description: "Provided technology consulting services to various clients, assisting in digital transformation projects and system integrations. Specialized in enterprise application development and IT strategy.",
      logoUrl: "https://placehold.co/100x100.png",
      logoHint: "company logo",
      companyUrl: "#", // Replace with actual URL
      technologies: ["Java", "Spring Boot", "Oracle DB", "Agile", "SAP"],
    },
    {
      id: "exp-ncs",
      companyName: "NCS Pvt Ltd",
      role: "Software Developer",
      dates: "July 2014 - April 2016",
      description: "Began my tech journey developing and maintaining software applications. Gained foundational experience in coding, debugging, and software development best practices.",
      logoUrl: "https://placehold.co/100x100.png",
      logoHint: "company logo",
      companyUrl: "#", // Replace with actual URL
      technologies: [".NET", "C#", "SQL Server", "HTML", "CSS"],
    },
  ],
  skills: [
    { name: "JavaScript / TypeScript", level: 95, Icon: Code },
    { name: "React / Next.js", level: 90, Icon: Zap },
    { name: "Node.js / Express", level: 85, Icon: Settings2 },
    { name: "Python (AI/ML)", level: 80, Icon: Brain },
    { name: "Databases (SQL/NoSQL)", level: 88, Icon: Database },
    { name: "Cloud Platforms (AWS/GCP)", level: 75, Icon: Target },
    { name: "UI/UX Design Principles", level: 70, Icon: Eye },
  ],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/tad-bit-better", Icon: Github },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/pushpendrayadav2011", Icon: Linkedin },

  ],
  contact: {
    email: "pushpendra.y2011@gmail.com",
    introText: "Ready to team up or got a side quest? Drop a message in the comms channel!",
  },
};

export const contactFormFields = {
  name: { Icon: User, placeholder: "Your Player Name" },
  email: { Icon: Mail, placeholder: "Your Comms Link (Email)" },
  message: { Icon: MessageSquare, placeholder: "Your Message/Quest Log" },
}
