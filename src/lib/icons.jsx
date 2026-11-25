// Explicit icon map keeps the bundle tree-shaken (no `import *`).
// Data files reference icons by name so content stays serialisable.
import {
  FileCode2, Palette, Braces, Atom, Wind, GitBranch, Github, SquareCode, Triangle, Globe,
  MessageSquare, Sparkles, SquareTerminal, Gem, FlaskConical, MousePointer2, Heart, Clapperboard,
  Workflow, Layers, Lightbulb, BookOpen, Rocket, Shuffle, MessagesSquare, Briefcase, Code2,
  MonitorSmartphone, BrainCircuit, PenTool, Store, ImageIcon, SlidersHorizontal, Target,
} from 'lucide-react';

const icons = {
  FileCode2, Palette, Braces, Atom, Wind, GitBranch, Github, SquareCode, Triangle, Globe,
  MessageSquare, Sparkles, SquareTerminal, Gem, FlaskConical, MousePointer2, Heart, Clapperboard,
  Workflow, Layers, Lightbulb, BookOpen, Rocket, Shuffle, MessagesSquare, Briefcase, Code2,
  MonitorSmartphone, BrainCircuit, PenTool, Store, ImageIcon, SlidersHorizontal, Target,
};

export function Icon({ name, ...props }) {
  const Cmp = icons[name] || Sparkles;
  return <Cmp aria-hidden="true" {...props} />;
}
