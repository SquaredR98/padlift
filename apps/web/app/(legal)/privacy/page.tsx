import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Padlift',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-sm prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: March 24, 2026</p>
      <p>
        Padlift (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the padlift.com website and the Padlift platform
        (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our Service. By using the Service, you agree to the collection
        and use of information in accordance with this policy.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Account Information</h3>
      <p>When you create an account, we collect:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Hashed password (if using email/password authentication)</li>
        <li>OAuth profile information (if signing in with Google)</li>
      </ul>

      <h3>1.2 Usage Data</h3>
      <p>We automatically collect certain information when you use the Service, including:</p>
      <ul>
        <li>Pages visited within the dashboard</li>
        <li>Features used (e.g., publishing a site, adding blocks)</li>
        <li>Timestamps of account activity</li>
        <li>Browser type, operating system, and device type (aggregated, not individually identifying)</li>
      </ul>

      <h3>1.3 Published Site Analytics</h3>
      <p>
        When analytics are enabled on a site you create, we collect privacy-safe visitor data from
        your published pages. This data is:
      </p>
      <ul>
        <li><strong>Cookie-free</strong> &mdash; we do not set any cookies on your visitors&apos; devices</li>
        <li><strong>Fingerprint-free</strong> &mdash; we do not use browser fingerprinting techniques</li>
        <li><strong>Privacy-hashed</strong> &mdash; visitor identification uses a daily-rotating, irreversible hash
          derived from the visitor&apos;s IP address and user-agent, making it impossible to trace back to
          an individual</li>
      </ul>
      <p>Analytics data includes: page views, referrer URLs, and aggregate visitor counts.</p>

      <h3>1.4 Waitlist Data</h3>
      <p>
        When visitors sign up to a waitlist on a site you build with Padlift, we collect the data
        they voluntarily provide, which may include their name, email address, and any custom fields
        you configure.
      </p>

      <h3>1.5 Payment Information</h3>
      <p>
        We do not directly collect or store credit card numbers or payment credentials. All payment
        processing is handled by our third-party payment processor, Gumroad. Please refer to{' '}
        <a href="https://gumroad.com/privacy" target="_blank" rel="noopener noreferrer">
          Gumroad&apos;s Privacy Policy
        </a>{' '}
        for details on how they handle your payment information.
      </p>

      <h3>1.6 Uploaded Content</h3>
      <p>
        Files you upload to the Media Library (images, logos, etc.) are stored securely and used solely
        for the purpose of displaying them on your published sites.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and maintain the Service</li>
        <li>Process your account registration and authenticate your identity</li>
        <li>Process subscriptions and payments through our payment partner</li>
        <li>Send transactional emails (account confirmation, password resets, billing receipts)</li>
        <li>Display aggregated, anonymous analytics on your dashboard</li>
        <li>Provide customer support and respond to your inquiries</li>
        <li>Detect, prevent, and address technical issues, fraud, or abuse</li>
        <li>Improve and optimize the Service</li>
      </ul>
      <p>
        <strong>We do not use your data for advertising.</strong> We do not sell, rent, or trade your
        personal information to advertisers or data brokers.
      </p>

      <h2>3. Legal Basis for Processing (GDPR)</h2>
      <p>If you are located in the European Economic Area (EEA), our legal bases for processing your personal data are:</p>
      <ul>
        <li><strong>Contract performance</strong> &mdash; processing necessary to provide the Service you requested</li>
        <li><strong>Legitimate interest</strong> &mdash; improving the Service, preventing fraud, ensuring security</li>
        <li><strong>Consent</strong> &mdash; where you have given explicit consent (e.g., opting into marketing emails)</li>
        <li><strong>Legal obligation</strong> &mdash; where processing is required by applicable law</li>
      </ul>

      <h2>4. Data Sharing and Third Parties</h2>
      <p>We share your information only with the following categories of third parties, and only as necessary:</p>
      <ul>
        <li><strong>Gumroad</strong> &mdash; payment processing for subscriptions and one-time payments</li>
        <li><strong>Neon</strong> &mdash; database hosting provider (your data is stored encrypted at rest)</li>
        <li><strong>Cloudflare</strong> &mdash; CDN and file storage (R2) for uploaded media files</li>
        <li><strong>Google</strong> &mdash; OAuth authentication (only if you choose to sign in with Google), and
          Google Sheets integration (only if you explicitly connect your Google account)</li>
      </ul>
      <p>
        We do <strong>not</strong> sell, rent, or share your personal data with third parties for their
        marketing purposes. We do not use third-party advertising trackers, pixels, or analytics
        scripts (such as Google Analytics, Facebook Pixel, etc.) on the Padlift dashboard.
      </p>

      <h2>5. Data Retention</h2>
      <ul>
        <li><strong>Account data</strong> is retained for as long as your account is active.</li>
        <li><strong>Waitlist entries</strong> are retained until you export and delete them, or delete the associated site.</li>
        <li><strong>Analytics data</strong> is retained for up to 90 days in rolling windows.</li>
        <li><strong>Uploaded files</strong> are retained until you delete them or delete your account.</li>
      </ul>
      <p>
        When you delete your account, we delete all your personal data, sites, waitlist entries, and
        uploaded files within 30 days. Some data may be retained in encrypted backups for up to 90
        additional days before being permanently purged.
      </p>

      <h2>6. Your Rights</h2>
      <p>Depending on your location, you may have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Access</strong> &mdash; request a copy of the personal data we hold about you</li>
        <li><strong>Rectification</strong> &mdash; request correction of inaccurate or incomplete data</li>
        <li><strong>Erasure</strong> &mdash; request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
        <li><strong>Data portability</strong> &mdash; request your data in a structured, machine-readable format</li>
        <li><strong>Restriction</strong> &mdash; request that we limit processing of your data</li>
        <li><strong>Objection</strong> &mdash; object to processing based on legitimate interest</li>
        <li><strong>Withdraw consent</strong> &mdash; withdraw previously given consent at any time</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:privacy@padlift.com">privacy@padlift.com</a>. We will respond within 30 days.
      </p>

      <h2>7. California Residents (CCPA)</h2>
      <p>If you are a California resident, you have the right to:</p>
      <ul>
        <li>Know what personal information we collect, use, and disclose</li>
        <li>Request deletion of your personal information</li>
        <li>Opt out of the &quot;sale&quot; of personal information (we do not sell your data)</li>
        <li>Non-discrimination for exercising your privacy rights</li>
      </ul>

      <h2>8. International Data Transfers</h2>
      <p>
        Our servers are located in the United States. If you access the Service from outside the US,
        your information may be transferred to, stored, and processed in the US. We ensure appropriate
        safeguards are in place for such transfers, including standard contractual clauses where applicable.
      </p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        The Service is not directed to individuals under the age of 16. We do not knowingly collect
        personal information from children under 16. If we discover that a child under 16 has provided
        us with personal information, we will delete it promptly. If you believe a child has provided us
        with their information, please contact us.
      </p>

      <h2>10. Security</h2>
      <p>
        We implement industry-standard security measures to protect your data, including:
      </p>
      <ul>
        <li>Encryption in transit (TLS/HTTPS for all connections)</li>
        <li>Encryption at rest for database storage</li>
        <li>Hashed passwords using bcrypt</li>
        <li>Regular security updates and dependency audits</li>
        <li>Role-based access controls for internal systems</li>
      </ul>
      <p>
        While we strive to protect your data, no method of transmission or storage is 100% secure.
        We cannot guarantee absolute security.
      </p>

      <h2>11. Cookies</h2>
      <p>
        The Padlift dashboard uses only <strong>essential cookies</strong> required for authentication
        and session management. We do not use tracking cookies, advertising cookies, or third-party
        analytics cookies.
      </p>
      <p>
        Published sites created with Padlift do <strong>not</strong> set any cookies on visitors&apos;
        devices unless the site owner explicitly adds third-party scripts.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of material changes
        by posting the updated policy on this page and updating the &quot;Last updated&quot; date. Your continued
        use of the Service after any changes constitutes acceptance of the updated policy.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, your data, or wish to exercise your rights,
        contact us at:
      </p>
      <ul>
        <li>Email: <a href="mailto:privacy@padlift.com">privacy@padlift.com</a></li>
        <li>Support: Use the support widget in your dashboard</li>
      </ul>

      <hr />

      <p className="text-sm text-muted-foreground">
        By using Padlift, you acknowledge that you have read and understood this Privacy Policy
        and agree to the collection and use of your information as described herein. See also our{' '}
        <Link href="/terms" className="underline">Terms of Service</Link>.
      </p>
    </article>
  );
}
