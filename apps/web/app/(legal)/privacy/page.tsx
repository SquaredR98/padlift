export const metadata = {
  title: 'Privacy Policy — Padlift',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-sm prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: March 20, 2026</p>

      <h2>What We Collect</h2>
      <p>When you create an account, we store your email address and name. When visitors interact with sites you build on Padlift, we collect privacy-safe analytics (no cookies, no fingerprinting).</p>

      <h2>How We Use Your Data</h2>
      <ul>
        <li>To provide and maintain the service</li>
        <li>To process payments through our payment partner (Gumroad)</li>
        <li>To send transactional emails related to your account</li>
        <li>To display aggregated, anonymous analytics on your dashboard</li>
      </ul>

      <h2>Third Parties</h2>
      <p>We use Gumroad for payment processing and Neon for database hosting. We do not sell your data to any third party.</p>

      <h2>Data Retention</h2>
      <p>You can delete your account and all associated data at any time by contacting support.</p>

      <h2>Contact</h2>
      <p>Questions about this policy? Reach out via the support widget in your dashboard.</p>
    </article>
  );
}
