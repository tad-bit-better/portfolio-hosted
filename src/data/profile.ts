/**
 * Single source of truth for portfolio content.
 * Wrap a phrase in ==double equals== to draw a highlighter mark over it in Read mode.
 */

export const person = {
  name: 'Pushpendra Yadav',
  role: 'Staff Frontend Engineer',
  email: 'pushpendra.y2011@gmail.com',
  resumeUrl: '/resume.pdf',
  links: [
    { label: 'GitHub', href: 'https://github.com/tad-bit-better' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/pushpendrayadav2011' },
    { label: 'pushpendra.dev', href: 'https://pushpendra.dev' },
  ],
};

export const spec = [
  { k: 'Role', v: 'Staff Frontend Engineer' },
  { k: 'Core', v: 'React · TypeScript · Next.js' },
  { k: 'Platform', v: 'Design systems · MFE · Nx' },
  { k: 'Edge', v: 'MCP · codemods · WASM' },
  { k: 'Leads', v: 'Pods of 5–6+' },
  { k: 'Base', v: 'Indore · open to relocate' },
];

export const figures = [
  { n: '75', unit: '%', label: 'less frontend tech debt after a ==codemod-driven== Webpack 5 migration' },
  { n: '~30', unit: '%', label: 'faster initial load from splitting, lazy loading and virtualisation' },
  { n: '30–40', unit: '%', label: 'less frontend build time once the design system shipped across 5+ products' },
  { n: '~80', unit: '%', label: 'of the original team ==still there== after a 3.5-year tenure' },
];

export const work = [
  {
    name: 'VitalDelta',
    href: 'https://vitaldelta.app',
    desc: 'Lab-report PDFs become per-marker trend charts. No backend, no accounts: a strict CSP makes the ==no-network promise verifiable.==',
    tags: ['TypeScript', 'React', 'IndexedDB', 'LOINC'],
    meta: '2026 · live',
  },
  {
    name: 'Thumbline',
    href: 'https://thumbline.app',
    desc: 'Listens to a song clip and writes playable guitar arrangements in three styles. Audio analysis ==runs in the browser== on WebAssembly.',
    tags: ['Next.js', 'Nx', 'WASM', 'Web Audio'],
    meta: '2026 · live',
  },
  {
    name: 'Leena AI frontend platform',
    href: '#log',
    desc: 'Architecture, design system and micro-frontends for an enterprise HR suite. Webpack 4→5 and Module Federation, moved by codemods.',
    tags: ['Module Federation', 'Storybook', 'TanStack Query'],
    meta: '2022–26',
  },
  {
    name: 'Figma → code over MCP',
    href: '#how',
    desc: 'A pipeline that turns Figma frames into production UI using ==only governed library components== and design tokens.',
    tags: ['MCP', 'Design tokens', 'LLM tooling'],
    meta: 'Leena AI',
  },
  {
    name: 'Coodlesome.com',
    href: 'https://coodlesome.com',
    desc: 'Took a family home business online: Next.js storefront, checkout, structured-data SEO, Core Web Vitals tuned for mobile.',
    tags: ['Next.js', 'SSR / SSG', 'SEO'],
    meta: '2026 · live',
  },
];

type RolePart = string | { text: string; href: string };

export const experience: { years: string; company: string; role: string | RolePart[] }[] = [
  {
    years: '2026 — now',
    company: 'Independent',
    role: [
      'Open-source products, end to end: ',
      { text: 'Thumbline', href: 'https://thumbline.app' },
      ', ',
      { text: 'VitalDelta', href: 'https://vitaldelta.app' },
      '; ',
      { text: 'Coodlesome.com', href: 'https://coodlesome.com' },
    ],
  },
  { years: '2022 — 2026', company: 'Leena AI', role: 'Tech Lead / Frontend Lead · Pod of 5–6+' },
  { years: '2021 — 2022', company: 'Ferns and Petals', role: 'Technical Lead · High-Traffic Ecommerce' },
  { years: '2020 — 2021', company: 'Datafoundry AI', role: 'Technical Lead · Micro-Frontend Pharma Platform' },
  { years: '2016 — 2019', company: 'Deloitte', role: 'Business Technology Analyst · US Public Healthcare' },
  { years: '2014 — 2016', company: 'Nenosystems', role: 'Software Engineer · Vehicle Tracking' },
];

export const principles = [
  { title: 'Make guarantees architectural.', body: 'VitalDelta’s privacy isn’t a line in a policy. A strict CSP makes "no network" ==something you can check.==' },
  { title: 'Automate the boring.', body: 'Codemods moved large apps to Webpack 5 and cut tech debt by 75% ==without a freeze.==' },
  { title: 'AI writes. Humans are accountable.', body: 'Shared project rules, generated tests, AI-assisted review. ==Architecture and sign-off stay human.==' },
  { title: 'Keep the team.', body: 'Engineers bring their own approaches. About 80% of the original pod stayed for 3.5 years.' },
];

/* ---------------- Play mode: Staff Quest ---------------- */

export type Theme = 'island' | 'city' | 'sunset' | 'snow' | 'space';
export interface QuestItem { label: string; title: string; body: string }
export interface Stage { name: string; zone: string; guide: string; theme: Theme; items: QuestItem[] }

export const stages: Stage[] = [
  {
    name: 'HELLO WORLD', zone: 'CODE COAST', guide: 'Hello World', theme: 'island',
    items: [
      { label: 'STAFF FRONTEND ENG', title: 'Staff Frontend Engineer', body: '12+ years owning the architecture of high-scale React and TypeScript platforms, and 5+ years managing pods of 5–6 engineers.' },
      { label: 'INDORE → ANYWHERE', title: 'Indore, India', body: 'Based in Indore (UTC+5:30) and open to relocation.' },
      { label: 'SEEKING: STAFF / ARCH', title: 'Next quest: Staff or Architect', body: 'Looking to define long-term frontend strategy, platform standards and AI-augmented developer workflows for a high-scale product organisation.' },
    ],
  },
  {
    name: 'THE WORK', zone: 'MIDNIGHT METRO', guide: 'The Work', theme: 'city',
    items: [
      { label: 'VITALDELTA', title: 'VitalDelta · vitaldelta.app', body: 'Turns lab-report PDFs into per-marker trend charts. Local-first: no backend, no accounts, and a strict CSP makes the no-network guarantee verifiable.' },
      { label: 'THUMBLINE', title: 'Thumbline · thumbline.app', body: 'Listens to a song clip and writes playable guitar arrangements in three styles. Audio analysis runs in the browser on WebAssembly, in an Nx monorepo.' },
      { label: 'LEENA AI PLATFORM', title: 'Leena AI frontend platform', body: 'Architecture, design system and micro-frontends for an enterprise HR suite across 5+ product lines. Webpack 4→5 and Module Federation, moved by codemods.' },
      { label: 'FIGMA → CODE / MCP', title: 'Figma-to-code over MCP', body: 'A pipeline that turns Figma frames into production UI using only governed library components and design tokens.' },
    ],
  },
  {
    name: 'POWER-UPS', zone: 'SUNSET DRIVE', guide: 'Power-ups', theme: 'sunset',
    items: [
      { label: '-75% TECH DEBT', title: '75% less tech debt', body: 'Codemod-driven migration of large React apps from Webpack 4 to Webpack 5 with Module Federation.' },
      { label: '-30% LOAD TIME', title: '~30% faster initial load', body: 'Bundle optimisation, code splitting, lazy loading and list virtualisation.' },
      { label: '-30% BUILD TIME', title: '30–40% less frontend build time', body: 'A shared component library and design system with tokens, Storybook visual tests and WCAG compliance.' },
      { label: '80% TEAM KEPT', title: '~80% team retention', body: 'Engineers brought their own approaches; most of the original pod stayed across a 3.5-year tenure.' },
    ],
  },
  {
    name: 'CAREER LOG', zone: 'SUMMIT TRAIL', guide: 'Career Log', theme: 'snow',
    items: [
      { label: '2014–19 NENO · DELOITTE', title: '2014–2019', body: 'Vehicle tracking at Nenosystems in Indore, then US public-healthcare systems and Salesforce React components at Deloitte.' },
      { label: '2020–22 TECH LEAD ×2', title: '2020–2022', body: 'Technical Lead at Datafoundry AI (micro-frontend pharmacovigilance platform) and Ferns and Petals (high-traffic ecommerce).' },
      { label: '2022–26 LEENA AI', title: '2022–2026 · Leena AI', body: 'Tech Lead / Frontend Lead running a pod of 5–6+ engineers: capacity planning, reviews, promotions and hiring.' },
      { label: '2026 INDEPENDENT', title: '2026 → now', body: 'Designing and shipping open-source, privacy-first products end to end, plus the Coodlesome.com storefront.' },
    ],
  },
  {
    name: 'CALL IN', zone: 'LOW ORBIT', guide: 'Call In', theme: 'space',
    items: [
      { label: 'EMAIL ME', title: 'pushpendra.y2011@gmail.com', body: 'The fastest way to start a conversation about a Staff or Architect role.' },
      { label: 'GITHUB', title: 'github.com/tad-bit-better', body: 'VitalDelta and Thumbline are both open source.' },
      { label: 'LINKEDIN', title: 'linkedin.com/in/pushpendrayadav2011', body: 'The full career history, endorsements included.' },
    ],
  },
];

export const totalItems = stages.reduce((n, s) => n + s.items.length, 0);
