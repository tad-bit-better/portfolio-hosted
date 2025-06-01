import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Twitter, Briefcase, Code, Brain, Zap, BarChart, Target, Eye, Mail, User, MessageSquare } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  url: string;
  tags: string[];
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
  projects: Project[];
  skills: Skill[];
  socialLinks: SocialLink[];
  contact: {
    email: string; // For display or backend use
    introText: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personalInfo: {
    name: "Pushpendra Singh",
    title: "Full Stack Developer & AI Enthusiast",
    bio: "A passionate developer with a knack for building scalable web applications and exploring the frontiers of artificial intelligence. I love transforming complex problems into elegant solutions and continuously learning new technologies.",
    profileImage: "https://placehold.co/300x300.png",
    profileImageHint: "profile portrait",
  },
  projects: [
    {
      id: "project-1",
      title: "AI Powered E-commerce Platform",
      description: "Developed a full-featured e-commerce site with personalized recommendations using collaborative filtering and NLP for product search.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "e-commerce interface",
      url: "https://pushpendra.dev/projects/ai-ecommerce",
      tags: ["React", "Node.js", "Python", "Machine Learning", "AWS"],
    },
    {
      id: "project-2",
      title: "Real-time Data Visualization Dashboard",
      description: "Built a dynamic dashboard for visualizing IoT sensor data, featuring live updates and interactive charts.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "dashboard charts",
      url: "https://pushpendra.dev/projects/data-dashboard",
      tags: ["Vue.js", "Firebase", "D3.js", "WebSocket"],
    },
    {
      id: "project-3",
      title: "Open Source Contribution: DevTools Extension",
      description: "Contributed to a popular browser developer tools extension, enhancing its debugging capabilities for frontend frameworks.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "code editor",
      url: "https://github.com/pushpendra",
      tags: ["JavaScript", "Browser Extensions", "Open Source", "UI/UX"],
    },
  ],
  skills: [
    { name: "JavaScript / TypeScript", level: 95, Icon: Code },
    { name: "React / Next.js", level: 90, Icon: Zap },
    { name: "Node.js / Express", level: 85, Icon: Briefcase },
    { name: "Python (AI/ML)", level: 80, Icon: Brain },
    { name: "Databases (SQL/NoSQL)", level: 88, Icon: BarChart },
    { name: "Cloud Platforms (AWS/GCP)", level: 75, Icon: Target },
    { name: "UI/UX Design Principles", level: 70, Icon: Eye },
  ],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/pushpendra", Icon: Github },
    { platform: "LinkedIn", url: "https://linkedin.com/in/pushpendra", Icon: Linkedin },
    { platform: "Twitter", url: "https://twitter.com/pushpendra", Icon: Twitter },
  ],
  contact: {
    email: "contact@pushpendra.dev",
    introText: "Interested in collaborating or have a question? Feel free to reach out!",
  },
};

export const contactFormFields = {
  name: { Icon: User, placeholder: "Your Name" },
  email: { Icon: Mail, placeholder: "Your Email" },
  message: { Icon: MessageSquare, placeholder: "Your Message" },
}
