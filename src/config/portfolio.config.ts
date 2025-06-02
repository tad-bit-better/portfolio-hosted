
import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Twitter, Briefcase, Code, Brain, Zap, BarChart, Target, Eye, Mail, User, MessageSquare, Gamepad2, ShieldQuestion, Trophy, Settings2 } from 'lucide-react';

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
    title: "Pixel Paladin & Code Commander",
    bio: "Player 1 ready! I'm a dev hero, battling buggy code monsters and crafting epic web quests. My power-ups include AI, full-stack mastery, and an insatiable hunger for new tech scrolls!",
    profileImage: "https://placehold.co/300x300.png",
    profileImageHint: "profile portrait",
  },
  projects: [
    {
      id: "project-1",
      title: "AI E-Com: The Loot Store",
      description: "Leveled up an e-commerce world with AI smarts! Personalized loot drops (recommendations) using ancient algorithms and NLP magic for treasure (product) hunts.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "e-commerce interface",
      url: "https://pushpendra.dev/projects/ai-ecommerce",
      tags: ["React", "Node.js", "Python", "ML", "AWS"],
    },
    {
      id: "project-2",
      title: "Sensor Scan: Live Data HUD",
      description: "Built a high-score dashboard for IoT sensor data! Features real-time stat tracking and interactive charts. Maximize your KDR (Knowledge Data Ratio)!",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "dashboard charts",
      url: "https://pushpendra.dev/projects/data-dashboard",
      tags: ["Vue.js", "Firebase", "D3.js", "WebSocket"],
    },
    {
      id: "project-3",
      title: "Open World Mod: DevTools Saga",
      description: "Joined a guild of open-source heroes to upgrade a legendary DevTools artifact. Enhanced debugging powers for frontend adventurers!",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "code editor",
      url: "https://github.com/pushpendra",
      tags: ["JavaScript", "Browser Mods", "Open Source", "UI/UX"],
    },
  ],
  skills: [
    { name: "JavaScript / TypeScript", level: 95, Icon: Code },
    { name: "React / Next.js", level: 90, Icon: Zap },
    { name: "Node.js / Express", level: 85, Icon: Settings2 }, // Changed Briefcase
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
    email: "contact@pushpendra.dev", // Keep this professional for actual use
    introText: "Ready to team up or got a side quest? Drop a message in the comms channel!",
  },
};

export const contactFormFields = {
  name: { Icon: User, placeholder: "Your Player Name" },
  email: { Icon: Mail, placeholder: "Your Comms Link (Email)" },
  message: { Icon: MessageSquare, placeholder: "Your Message/Quest Log" },
}
