import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RotateCcw } from 'lucide-react';

function ErrorFallback({ onRetry }) {
  return (
    <section className="error-screen" role="alert">
      <span className="error-screen__icon" aria-hidden="true">
        <AlertTriangle />
      </span>
      <h1 className="error-screen__title">Something went sideways.</h1>
      <p className="error-screen__text">
        This part of the page hit an unexpected error. The rest of the site still works — try again, or head home.
      </p>
      <div className="error-screen__actions">
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          <span className="btn__label">
            <RotateCcw aria-hidden="true" /> Try again
          </span>
        </button>
        <Link to="/" className="btn btn--ghost" onClick={onRetry}>
          <span className="btn__label">Back home</span>
        </Link>
      </div>
    </section>
  );
}

/**
 * Catches render errors in the routed area so the navbar and footer survive.
 * `resetKey` (the pathname) clears the error when the user navigates away.
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Hook for a future logging service (Sentry etc.).
    console.error('Render error caught by ErrorBoundary:', error, info.componentStack);
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) this.reset();
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) return <ErrorFallback onRetry={this.reset} />;
    return this.props.children;
  }
}
