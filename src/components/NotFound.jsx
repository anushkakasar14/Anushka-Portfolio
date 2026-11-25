import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import MagneticButton from './common/MagneticButton';

export default function NotFound() {
  usePageMeta({ title: 'Page not found' });
  return (
    <PageTransition variant="scale">
      <section className="notfound">
        <div>
          <h1 className="grad-text">404</h1>
          <p>This page doesn&rsquo;t exist — but the portfolio does.</p>
          <MagneticButton to="/">
            <ArrowLeft aria-hidden="true" /> Back home
          </MagneticButton>
        </div>
      </section>
    </PageTransition>
  );
}
