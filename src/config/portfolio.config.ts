
import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Code, Brain, Zap, Database, Mail, User, MessageSquare, Gamepad2, Server, Palette, PenTool, Star, Briefcase, Wand2, Sparkles, Tags, GitFork, Lightbulb } from 'lucide-react';

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

export interface SideProject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  projectUrl: string;
  technologies: string[];
  status?: 'Completed' | 'In Progress' | 'Concept';
  repoUrl?: string;
  Icon?: LucideIcon;
}

export interface Skill {
  name: string;
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
  sideProjects: SideProject[];
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
    profileImage: "https://i.ibb.co/HcmDCdd/Gemini-Generated-Image-gmny9tgmny9tgmny.png",
    profileImageHint: "profile portrait",
  },
  experience: [
    {
      id: "exp-leena-ai",
      companyName: "Leena AI",
      role: "Lead Developer",
      dates: "May 2022 - Currently",
      description: "Contributed to the development of AI-powered HR solutions, focusing on enhancing employee experience and automating workflows processes. Leveraged modern tech stacks to build scalable and robust config driven applications.",
      logoUrl: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/m0gonlhnmtulzb4cjujy",
      logoHint: "company logo",
      companyUrl: "https://leena.ai/",
      technologies: ["Javascript ES6", "React", "Storybook", "Webpack", "Vite", "Rollup"],
    },
    {
      id: "exp-fnp",
      companyName: "Ferns and Petals",
      role: "Tech Lead",
      dates: "June 2021 - April 2022",
      description: "Developed and maintained e-commerce platforms, improving performance and user experience. Worked on various modules from product discovery to checkout optimization.",
      logoUrl: "https://exchange4media.gumlet.io/news-photo/120216-main5.jpg",
      logoHint: "company logo",
      companyUrl: "https://fnp.com",
      technologies: ["Javascript ES6", "React", "NextJS", "React-admin", "Lighthouse", "Webworkers", "Sockets"],
    },
    {
      id: "exp-datafoundry",
      companyName: "Datafoundry AI",
      role: "Tech Lead",
      dates: "April 2020 - June 2021",
      description: "Focused on building data-intensive applications and AI solutions. Involved in the full software development lifecycle, from conceptualization to deployment of front end apps. Developed a fully functional component library and implementatio of microfrontend.",
      logoUrl: "https://datafoundry.ai/wp-content/themes/datafoundry/build/img/about/banner.svg",
      logoHint: "company logo",
      companyUrl: "https://datafoundry.ai/",
      technologies: ["React", "Microfrontend", "Storybook"],
    },
    {
      id: "exp-deloitte",
      companyName: "Deloitte",
      role: "Business Technology Analyst",
      dates: "April 2016 - March 2019",
      description: "Provided technology consulting services to various clients, assisting in digital transformation projects and system integrations. Specialized in enterprise application development and IT strategy.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Deloitte_Logo.png/330px-Deloitte_Logo.png",
      logoHint: "company logo",
      companyUrl: "https://www2.deloitte.com/us/en/services/consulting.html",
      technologies: ["Java", "JSP", "Servlets", "Salesforce (Lightning)", "React"],
    },
    {
      id: "exp-ncs",
      companyName: "NCS Pvt Ltd",
      role: "Staff Developer",
      dates: "July 2014 - April 2016",
      description: "Began my tech journey developing and maintaining software applications. Gained foundational experience in coding, debugging, and software development best practices.",
      logoUrl: "https://media.licdn.com/dms/image/v2/C510BAQEMmuKAxHmuOQ/company-logo_200_200/company-logo_200_200/0/1631385044621?e=2147483647&v=beta&t=lZvFMiTYREc2-7bj03v5VCQt7ej5wyAw23t9sXop7B0",
      logoHint: "company logo",
      companyUrl: "https://nenosystems.com/",
      technologies: ["Java", "Hibernate", "JSP", "Servlet", "Struts"],
    },
  ],
  sideProjects: [
    {
      id: "sp-devcade",
      name: "Devcade Portfolio",
      description: "This very portfolio! A retro-themed interactive resume built with Next.js, Tailwind CSS, and a sprinkle of AI magic for tag suggestions.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "retro arcade game",
      projectUrl: "#", // Link to itself or GitHub repo
      technologies: ["Next.js", "React", "Tailwind CSS", "ShadCN UI", "Genkit", "TypeScript"],
      status: "Completed",
      repoUrl: "https://github.com/tad-bit-better/devcade-portfolio", // Example
      Icon: Gamepad2,
    },
    {
      id: "sp-ai-story-gen",
      name: "AI Story Weaver",
      description: "A fun project exploring generative AI to create short, branching narrative stories based on user prompts. A weekend hack that turned into a mini-obsession!",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "fantasy book quill",
      projectUrl: "#", // Placeholder
      technologies: ["Python", "Flask", "OpenAI API", "HTML/CSS"],
      status: "In Progress",
      Icon: PenTool,
    },
    {
      id: "sp-pixel-art-editor",
      name: "PixelCraft Studio",
      description: "A browser-based pixel art editor with basic tools, layer support, and GIF export. My attempt to recreate a simple version of Aseprite.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "pixel art character",
      projectUrl: "#", // Placeholder
      technologies: ["JavaScript", "HTML5 Canvas", "CSS"],
      status: "Concept",
      Icon: Palette,
    }
  ],
  skills: [
    { name: "JavaScript / TypeScript", Icon: Code },
    { name: "React / Next.js", Icon: Zap },
    { name: "Node.js / Express", Icon: Server },
    { name: "UI/UX Design Principles", Icon: Palette },
    { name: "Data structures", Icon: Brain },
    { name: "Figma/Zeplin", Icon: PenTool },
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
