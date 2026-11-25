import { navItems, profile } from '../data/site';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import Marquee from './common/Marquee';
import Hero from './home/Hero';
import ExploreIndex from './home/ExploreIndex';

const pages = navItems.filter((item) => item.path !== '/');

export default function Home() {
  usePageMeta({ description: `${profile.primaryRole} · ${profile.secondaryRole}. ${profile.description}` });

  return (
    <PageTransition variant="fade" className="page--home">
      <Hero />
      <Marquee />
      <ExploreIndex items={pages} />
    </PageTransition>
  );
}
