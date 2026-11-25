import { lazy } from 'react';

// Each page is its own chunk. Keeping the importers here lets App lazy-load
// them and also prefetch them once the first page is idle.
const importers = {
  home: () => import('./components/Home'),
  about: () => import('./components/About'),
  projects: () => import('./components/Projects'),
  projectDetails: () => import('./components/projects/ProjectDetails'),
  skills: () => import('./components/Skills'),
  experience: () => import('./components/Experience'),
  contact: () => import('./components/Contact'),
  notFound: () => import('./components/NotFound'),
};

export const Home = lazy(importers.home);
export const About = lazy(importers.about);
export const Projects = lazy(importers.projects);
export const ProjectDetails = lazy(importers.projectDetails);
export const Skills = lazy(importers.skills);
export const Experience = lazy(importers.experience);
export const Contact = lazy(importers.contact);
export const NotFound = lazy(importers.notFound);

export function prefetchRoutes() {
  Object.values(importers).forEach((load) => load());
}
