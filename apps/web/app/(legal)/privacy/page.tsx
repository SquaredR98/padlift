import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Padlift',
  description: 'How Padlift collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <div className="legal-header">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: April 2, 2026</p>
        <p className="legal-intro">
          Padlift (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operated by
          Ravi Ranjan (sole proprietor, India), provides the padlift.com website and the
          Padlift platform (collectively, the &ldquo;Service&rdquo;). This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you
          use our Service.
        </p>
        <p className="legal-intro">
          We are committed to complying with applicable data protection laws worldwide,
          including the EU General Data Protection Regulation (GDPR), the California
          Consumer Privacy Act (CCPA), India&apos;s Digital Personal Data Protection Act
          (DPDPA), and other applicable privacy regulations.
        </p>
      </div>

      {/* 1. Information We Collect */}
      <div className="legal-section">
        <h2 className="legal-section-title">1. Information We Collect</h2>
        <div className="legal-section-body">
          <h3 className="legal-section-subtitle">1.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Hashed password (if using email/password authentication)</li>
            <li>OAuth profile information (if signing in with Google) &mdash; limited to name, email, and profile picture</li>
          </ul>

          <h3 className="legal-section-subtitle">1.2 Usage Data</h3>
          <p>We automatically collect certain information when you use the Service, including:</p>
          <ul>
            <li>Pages visited within the dashboard</li>
            <li>Features used (e.g., publishing a site, adding blocks)</li>
            <li>Timestamps of account activity</li>
            <li>Browser type, operating system, and device type (aggregated, not individually identifying)</li>
          </ul>

          <h3 className="legal-section-subtitle">1.3 Published Site Analytics</h3>
          <p>
            When analytics are enabled on a site you create, we collect privacy-safe
            visitor data from your published pages. This data is:
          </p>
          <ul>
            <li><strong>Cookie-free</strong> &mdash; we do not set any cookies on your visitors&apos; devices</li>
            <li><strong>Fingerprint-free</strong> &mdash; we do not use browser fingerprinting techniques</li>
            <li><strong>Privacy-hashed</strong> &mdash; visitor identification uses a daily-rotating, irreversible hash derived from the visitor&apos;s IP address and user-agent, making it impossible to trace back to an individual</li>
            <li><strong>IP addresses are never stored</strong> &mdash; the raw IP is discarded immediately after hashing</li>
          </ul>
          <p>Analytics data includes: page views, referrer URLs, and aggregate visitor counts.</p>

          <h3 className="legal-section-subtitle">1.4 Waitlist Data</h3>
          <p>
            When visitors sign up to a waitlist on a site you build with Padlift, we
            collect the data they voluntarily provide, which may include their name,
            email address, and any custom fields you configure. See Section 8 for your
            responsibilities as a data controller.
          </p>

          <h3 className="legal-section-subtitle">1.5 Payment Information</h3>
          <p>
            We do not directly collect or store credit card numbers or payment
            credentials. All payment processing is handled by our third-party payment
            processor, Gumroad. We only receive your subscription status, plan tier,
            and a customer identifier from Gumroad. Please refer to{' '}
            <a href="https://gumroad.com/privacy" target="_blank" rel="noopener noreferrer">
              Gumroad&apos;s Privacy Policy
            </a>{' '}
            for details on how they handle your payment information.
          </p>

          <h3 className="legal-section-subtitle">1.6 Uploaded Content</h3>
          <p>
            Files you upload to the Media Library (images, logos, etc.) are stored
            securely and used solely for the purpose of displaying them on your
            published sites.
          </p>
        </div>
      </div>

      {/* 2. How We Use Your Information */}
      <div className="legal-section">
        <h2 className="legal-section-title">2. How We Use Your Information</h2>
        <div className="legal-section-body">
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
          <div className="legal-highlight">
            <strong>We do not use your data for advertising.</strong> We do not sell,
            rent, or trade your personal information to advertisers or data brokers.
            We will never monetize your data.
          </div>
        </div>
      </div>

      {/* 3. Legal Basis for Processing */}
      <div className="legal-section">
        <h2 className="legal-section-title">3. Legal Basis for Processing</h2>
        <div className="legal-section-body">
          <h3 className="legal-section-subtitle">3.1 For EEA/UK Residents (GDPR)</h3>
          <p>Our legal bases for processing your personal data are:</p>
          <ul>
            <li><strong>Contract performance</strong> &mdash; processing necessary to provide the Service you requested (Article 6(1)(b))</li>
            <li><strong>Legitimate interest</strong> &mdash; improving the Service, preventing fraud, ensuring security (Article 6(1)(f))</li>
            <li><strong>Consent</strong> &mdash; where you have given explicit consent (Article 6(1)(a))</li>
            <li><strong>Legal obligation</strong> &mdash; where processing is required by applicable law (Article 6(1)(c))</li>
          </ul>

          <h3 className="legal-section-subtitle">3.2 For Indian Residents (DPDPA)</h3>
          <p>
            We process your data based on consent provided at account creation and
            for the legitimate purposes of providing the Service. You may withdraw
            consent at any time by deleting your account or contacting us.
          </p>

          <h3 className="legal-section-subtitle">3.3 For California Residents (CCPA)</h3>
          <p>
            We collect personal information for the business purposes described in
            Section 2. We do not sell or share your personal information as defined
            under the CCPA. See Section 7 for your specific rights.
          </p>
        </div>
      </div>

      {/* 4. Data Sharing and Subprocessors */}
      <div className="legal-section">
        <h2 className="legal-section-title">4. Data Sharing and Subprocessors</h2>
        <div className="legal-section-body">
          <p>
            We share your information only with the following subprocessors, and only
            as necessary to operate the Service:
          </p>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subprocessor</th>
                  <th>Purpose</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel</td>
                  <td>Application hosting, edge network, serverless functions</td>
                  <td>US (global edge)</td>
                </tr>
                <tr>
                  <td>Neon</td>
                  <td>PostgreSQL database hosting (encrypted at rest)</td>
                  <td>US</td>
                </tr>
                <tr>
                  <td>Cloudflare (R2)</td>
                  <td>File storage for uploaded media</td>
                  <td>US (global CDN)</td>
                </tr>
                <tr>
                  <td>Gumroad</td>
                  <td>Payment processing for subscriptions</td>
                  <td>US</td>
                </tr>
                <tr>
                  <td>Google</td>
                  <td>OAuth sign-in (optional), Google Sheets sync (optional)</td>
                  <td>US</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We do <strong>not</strong> sell, rent, or share your personal data with
            third parties for their marketing purposes. We do not use third-party
            advertising trackers, pixels, or analytics scripts (such as Google
            Analytics, Facebook Pixel, etc.) on the Padlift dashboard or on published
            sites.
          </p>
        </div>
      </div>

      {/* 5. Data Retention */}
      <div className="legal-section">
        <h2 className="legal-section-title">5. Data Retention</h2>
        <div className="legal-section-body">
          <ul>
            <li><strong>Account data</strong> is retained for as long as your account is active.</li>
            <li><strong>Waitlist entries</strong> are retained until you export and delete them, or delete the associated site.</li>
            <li><strong>Analytics data</strong> is retained for up to 90 days in rolling windows, then automatically purged.</li>
            <li><strong>Uploaded files</strong> are retained until you delete them or delete your account.</li>
            <li><strong>Server logs</strong> are retained for up to 30 days for security and debugging purposes.</li>
          </ul>
          <p>
            When you delete your account, we delete all your personal data, sites,
            waitlist entries, and uploaded files within 30 days. Some data may be
            retained in encrypted backups for up to 90 additional days before being
            permanently purged.
          </p>
        </div>
      </div>

      {/* 6. Your Rights */}
      <div className="legal-section">
        <h2 className="legal-section-title">6. Your Rights</h2>
        <div className="legal-section-body">
          <p>Regardless of your location, we provide the following rights to all users:</p>
          <ul>
            <li><strong>Access</strong> &mdash; request a copy of the personal data we hold about you</li>
            <li><strong>Rectification</strong> &mdash; request correction of inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> &mdash; request deletion of your personal data (&ldquo;right to be forgotten&rdquo;)</li>
            <li><strong>Data portability</strong> &mdash; request your data in a structured, machine-readable format (JSON or CSV)</li>
            <li><strong>Restriction</strong> &mdash; request that we limit processing of your data</li>
            <li><strong>Objection</strong> &mdash; object to processing based on legitimate interest</li>
            <li><strong>Withdraw consent</strong> &mdash; withdraw previously given consent at any time without affecting the lawfulness of prior processing</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at the email listed in
            Section 15. We will respond within 30 days (or sooner if required by your
            local law). We will not charge a fee for reasonable requests. If a request
            is manifestly unfounded or excessive, we may charge a reasonable fee or
            refuse to act.
          </p>
        </div>
      </div>

      {/* 7. California Residents */}
      <div className="legal-section">
        <h2 className="legal-section-title">7. California Residents (CCPA/CPRA)</h2>
        <div className="legal-section-body">
          <p>If you are a California resident, you have the right to:</p>
          <ul>
            <li>Know what personal information we collect, use, and disclose</li>
            <li>Request deletion of your personal information</li>
            <li>Request correction of inaccurate personal information</li>
            <li>Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information &mdash; <strong>we do not sell or share your data</strong></li>
            <li>Limit use of sensitive personal information &mdash; we do not collect sensitive personal information</li>
            <li>Non-discrimination for exercising your privacy rights</li>
          </ul>
          <p>
            We have not sold or shared (as defined by the CCPA/CPRA) any personal
            information in the preceding 12 months.
          </p>
        </div>
      </div>

      {/* 8. Data Processing for Waitlist Owners */}
      <div className="legal-section">
        <h2 className="legal-section-title">8. Data Processing for Waitlist Owners</h2>
        <div className="legal-section-body">
          <p>
            When you collect waitlist signups, visitor analytics, or other end-user
            data through your published sites, the following applies:
          </p>
          <ul>
            <li><strong>You are the Data Controller</strong> (or &ldquo;Business&rdquo; under CCPA) for the data collected from your visitors.</li>
            <li><strong>Padlift acts as your Data Processor</strong> (or &ldquo;Service Provider&rdquo; under CCPA).</li>
          </ul>

          <h3 className="legal-section-subtitle">8.1 Our Obligations as Processor</h3>
          <p>We commit to:</p>
          <ul>
            <li>Process waitlist and visitor data only on your documented instructions (i.e., to provide the Service)</li>
            <li>Not use your visitors&apos; data for our own purposes, marketing, or profiling</li>
            <li>Ensure confidentiality obligations for anyone who processes the data</li>
            <li>Implement appropriate technical and organizational security measures</li>
            <li>Assist you in responding to data subject requests from your visitors</li>
            <li>Delete or return all visitor data upon termination of your account</li>
            <li>Make available information necessary to demonstrate compliance</li>
          </ul>

          <h3 className="legal-section-subtitle">8.2 Your Obligations as Controller</h3>
          <p>You are responsible for:</p>
          <ul>
            <li>Having a lawful basis for collecting visitor data</li>
            <li>Providing your own privacy policy to your visitors if required by applicable law</li>
            <li>Responding to data subject access requests from your visitors</li>
            <li>Ensuring compliance with applicable data protection laws (GDPR, CCPA, DPDPA, etc.)</li>
            <li>Obtaining any necessary consents from your visitors</li>
          </ul>
        </div>
      </div>

      {/* 9. International Data Transfers */}
      <div className="legal-section">
        <h2 className="legal-section-title">9. International Data Transfers</h2>
        <div className="legal-section-body">
          <p>
            Padlift is operated from India. Our infrastructure is primarily located
            in the United States. If you access the Service from outside the US, your
            information may be transferred to, stored, and processed in the US.
          </p>
          <p>For transfers from the EEA/UK, we rely on:</p>
          <ul>
            <li>Standard Contractual Clauses (SCCs) adopted by the European Commission</li>
            <li>Adequacy decisions where applicable</li>
            <li>Your explicit consent to the transfer at account creation</li>
          </ul>
          <p>
            Our subprocessors maintain their own data transfer mechanisms and
            certifications. See Section 4 for the list of subprocessors and their
            locations.
          </p>
        </div>
      </div>

      {/* 10. Data Breach Notification */}
      <div className="legal-section">
        <h2 className="legal-section-title">10. Data Breach Notification</h2>
        <div className="legal-section-body">
          <p>
            In the event of a personal data breach that is likely to result in a risk
            to your rights and freedoms, we will:
          </p>
          <ul>
            <li>Notify affected users via email within <strong>72 hours</strong> of becoming aware of the breach</li>
            <li>Notify the relevant supervisory authority where required by law (e.g., within 72 hours under GDPR)</li>
            <li>Describe the nature of the breach, the data affected, and the measures taken or proposed</li>
            <li>Provide recommendations for steps you can take to protect yourself</li>
          </ul>
        </div>
      </div>

      {/* 11. Children's Privacy */}
      <div className="legal-section">
        <h2 className="legal-section-title">11. Children&apos;s Privacy</h2>
        <div className="legal-section-body">
          <p>
            The Service is not directed to individuals under the age of 16. We do not
            knowingly collect personal information from children under 16. If we
            discover that a child under 16 has provided us with personal information,
            we will delete it promptly. If you believe a child has provided us with
            their information, please contact us immediately.
          </p>
        </div>
      </div>

      {/* 12. Security */}
      <div className="legal-section">
        <h2 className="legal-section-title">12. Security</h2>
        <div className="legal-section-body">
          <p>We implement industry-standard security measures to protect your data, including:</p>
          <ul>
            <li>Encryption in transit (TLS 1.2+ / HTTPS for all connections)</li>
            <li>Encryption at rest for database storage</li>
            <li>Hashed passwords using bcrypt with appropriate work factors</li>
            <li>Security headers (HSTS, CSP, X-Frame-Options) on all responses</li>
            <li>Regular security updates and dependency audits</li>
            <li>Role-based access controls for internal administration</li>
          </ul>
          <p>
            While we strive to protect your data, no method of transmission or
            storage is 100% secure. We cannot guarantee absolute security. If you
            discover a vulnerability, please report it to us responsibly.
          </p>
        </div>
      </div>

      {/* 13. Cookies */}
      <div className="legal-section">
        <h2 className="legal-section-title">13. Cookies</h2>
        <div className="legal-section-body">
          <p>
            The Padlift dashboard uses only <strong>essential cookies</strong>{' '}
            required for authentication and session management. We do not use
            tracking cookies, advertising cookies, or third-party analytics cookies.
            No cookie consent banner is needed because we only use strictly necessary
            cookies.
          </p>
          <p>
            Published sites created with Padlift do <strong>not</strong> set any
            cookies on visitors&apos; devices. Our analytics system is entirely
            cookie-free (see Section 1.3).
          </p>
        </div>
      </div>

      {/* 14. Changes */}
      <div className="legal-section">
        <h2 className="legal-section-title">14. Changes to This Policy</h2>
        <div className="legal-section-body">
          <p>
            We may update this Privacy Policy from time to time. We will notify you
            of material changes by emailing you at least <strong>14 days</strong> in
            advance and updating the &ldquo;Last updated&rdquo; date above. Your
            continued use of the Service after any changes constitutes acceptance of
            the updated policy.
          </p>
        </div>
      </div>

      {/* 15. Contact */}
      <div className="legal-section">
        <h2 className="legal-section-title">15. Contact Us</h2>
        <div className="legal-section-body">
          <p>
            If you have questions about this Privacy Policy, your data, or wish to
            exercise your rights, contact us at:
          </p>
          <div className="legal-contact">
            <div className="legal-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>mail [at] ravi-ranjan [dot] in</span>
            </div>
            <div className="legal-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Support widget in your dashboard
            </div>
          </div>
          <p>
            If you are not satisfied with our response, you have the right to lodge a
            complaint with your local data protection authority.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="legal-footer">
        <p>
          By using Padlift, you acknowledge that you have read and understood this
          Privacy Policy and agree to the collection and use of your information as
          described herein. See also our{' '}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </div>
    </>
  );
}
