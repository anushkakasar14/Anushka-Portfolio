// Site-wide content. When a CMS / API is added later, replace these
// exports with fetched data — components only depend on their shape.

export const profile = {
  name: 'Anushka Kasar',
  firstName: 'Anushka',
  lastName: 'Kasar',
  initials: 'AK',
  primaryRole: 'Full-Stack Engineer',
  secondaryRole: 'AI Tools & Automation',
  headline: 'I turn ideas into meaningful digital experiences.',
  description:
    'Building practical digital experiences by combining development, AI tools, automation and creative problem-solving.',
  email: 'anushkakasar24@gmail.com',
  availability: 'Open to full-time opportunities and freelance projects.',
};

export const socials = [
  { id: 'github', label: 'GitHub', handle: '@anushkakasar14', href: 'https://github.com/anushkakasar14' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/anushka-kasar24', href: 'https://www.linkedin.com/in/anushka-kasar24' },
  { id: 'email', label: 'Email', handle: 'anushkakasar24@gmail.com', href: 'mailto:anushkakasar24@gmail.com' },
];

// Drives the navbar, mobile menu, footer and the Home "explore" index.
export const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About', blurb: 'Background, approach and what I build' },
  { path: '/projects', label: 'Projects', blurb: 'Case studies — a live client site and a DL project' },
  { path: '/skills', label: 'Skills', blurb: 'Frontend, tooling and AI & automation' },
  { path: '/experience', label: 'Experience', blurb: 'Education and independent work' },
  { path: '/contact', label: 'Contact', blurb: 'Roles, freelance work or a quick hello' },
];

export const aboutFacts = [
  { value: 'B.Tech', label: 'Computer Science & Design Engineering' },
  { value: '2', label: 'Featured projects, end to end' },
  { value: '1', label: 'Live client website shipped' },
  { value: '3', label: 'Skill domains — web, tooling, AI' },
];

export const aboutPillars = [
  { title: 'Practical products', text: 'I care about software that real people use — responsive, fast and easy to understand.' },
  { title: 'AI-powered workflows', text: 'I use modern AI tools to prototype faster, automate the repetitive and explore new product ideas.' },
  { title: 'Design-minded engineering', text: 'A design engineering background means I think about layout, motion and clarity, not just logic.' },
  { title: 'Always learning', text: 'Every project is a chance to pick up a new tool, pattern or way of solving a problem.' },
];

export const journey = [
  { step: 'Foundations', text: 'A B.Tech in Computer Science and Design Engineering — programming fundamentals alongside design thinking.' },
  { step: 'Building', text: 'Turning that into real work: responsive websites and independent projects, shipped and deployed.' },
  { step: 'AI & automation', text: 'Folding AI tools and workflow automation into how I research, prototype and build.' },
  { step: 'Next', text: 'Looking for a team where I can keep shipping meaningful products and keep learning fast.' },
];

export const strengths = [
  { title: 'Full-Stack Development', icon: 'Layers' },
  { title: 'AI Tools & Automation', icon: 'Sparkles' },
  { title: 'Creative Problem Solving', icon: 'Lightbulb' },
  { title: 'Continuous Learning', icon: 'BookOpen' },
  { title: 'Independent Execution', icon: 'Rocket' },
  { title: 'Adaptability', icon: 'Shuffle' },
  { title: 'Communication', icon: 'MessagesSquare' },
  { title: 'Business Understanding', icon: 'Briefcase' },
];

export const services = [
  { title: 'Website Development', text: 'Custom, fast websites built from scratch with modern frontend tooling.', icon: 'Code2', variant: 'glow' },
  { title: 'Responsive Web Experiences', text: 'Layouts composed separately for phone, tablet and desktop — not just shrunk.', icon: 'MonitorSmartphone', variant: 'grid' },
  { title: 'AI-Powered Solutions', text: 'Practical features and prototypes that use modern AI models where they genuinely help.', icon: 'BrainCircuit', variant: 'orb' },
  { title: 'Workflow Automation', text: 'Connecting tools with n8n and scripts so repetitive work runs itself.', icon: 'Workflow', variant: 'lines' },
  { title: 'UI/UX Implementation', text: 'Turning designs into pixel-careful, accessible, animated interfaces.', icon: 'PenTool', variant: 'glow' },
  { title: 'Business Websites', text: 'Clear, credible websites with inquiry flows that help small brands get found and contacted.', icon: 'Store', variant: 'grid' },
];

export const projectTypes = [
  'Full-time opportunity',
  'Freelance website',
  'AI / automation project',
  'UI implementation',
  'Something else',
];
