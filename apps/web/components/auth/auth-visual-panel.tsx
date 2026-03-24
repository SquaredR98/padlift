import './auth-visual-panel.css';

export function AuthVisualPanel() {
  return (
    <div className="auth-panel">
      {/* Gradient mesh */}
      <div className="auth-panel-glow auth-panel-glow-blue" />
      <div className="auth-panel-glow auth-panel-glow-cyan" />
      <div className="auth-panel-dots" />

      {/* Floating UI mockup cards */}
      <div className="auth-panel-content">
        <div className="auth-float-card auth-float-card-1">
          <div className="auth-float-card-bar" />
          <div className="auth-float-card-line auth-float-card-line-long" />
          <div className="auth-float-card-line auth-float-card-line-short" />
        </div>
        <div className="auth-float-card auth-float-card-2">
          <div className="auth-float-card-bar" />
          <div className="auth-float-card-line auth-float-card-line-long" />
          <div className="auth-float-card-line auth-float-card-line-medium" />
          <div className="auth-float-card-line auth-float-card-line-short" />
        </div>

        {/* Value prop card */}
        <div className="auth-testimonial">
          <p className="text-sm font-medium text-foreground/90">
            Landing page, waitlist, payments, analytics &mdash; all in one place.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Go from idea to live in under 5 minutes.</p>
        </div>
      </div>
    </div>
  );
}
