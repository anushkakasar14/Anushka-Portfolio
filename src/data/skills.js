// Categories drive the filter UI; `icon` names resolve in lib/icons.jsx.
// No proficiency levels are claimed — these are the tools in active use.

export const skillCategories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tools', label: 'Development Tools' },
  { id: 'ai', label: 'AI & Automation' },
];

export const skills = [
  { name: 'HTML', category: 'frontend', icon: 'FileCode2', note: 'Semantic, accessible structure' },
  { name: 'CSS', category: 'frontend', icon: 'Palette', note: 'Layout, responsiveness & motion' },
  { name: 'JavaScript', category: 'frontend', icon: 'Braces', note: 'Interactive logic in the browser' },
  { name: 'React', category: 'frontend', icon: 'Atom', note: 'Component-driven interfaces' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'Wind', note: 'Utility-first styling' },

  { name: 'Git', category: 'tools', icon: 'GitBranch', note: 'Version control' },
  { name: 'GitHub', category: 'tools', icon: 'Github', note: 'Repositories & collaboration' },
  { name: 'VS Code', category: 'tools', icon: 'SquareCode', note: 'Everyday editor' },
  { name: 'Vercel', category: 'tools', icon: 'Triangle', note: 'Frontend deployment' },
  { name: 'Netlify', category: 'tools', icon: 'Globe', note: 'Hosting & deploys' },

  { name: 'ChatGPT', category: 'ai', icon: 'MessageSquare', note: 'Research & ideation' },
  { name: 'Claude', category: 'ai', icon: 'Sparkles', note: 'Reasoning & writing' },
  { name: 'Claude Code', category: 'ai', icon: 'SquareTerminal', note: 'Agentic coding' },
  { name: 'Google Gemini', category: 'ai', icon: 'Gem', note: 'Multimodal assistant' },
  { name: 'Google AI Studio', category: 'ai', icon: 'FlaskConical', note: 'Prompt & model prototyping' },
  { name: 'Cursor AI', category: 'ai', icon: 'MousePointer2', note: 'AI-assisted editor' },
  { name: 'Lovable', category: 'ai', icon: 'Heart', note: 'Rapid app prototyping' },
  { name: 'Google Flow', category: 'ai', icon: 'Clapperboard', note: 'AI video generation' },
  { name: 'n8n', category: 'ai', icon: 'Workflow', note: 'Workflow automation' },
];
