import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Padlift',
};

export default function TermsPage() {
  return (
    <article className="prose prose-sm prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: March 24, 2026</p>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Padlift platform,
        website, and services (collectively, the &quot;Service&quot;) provided by Padlift (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
        By creating an account or using the Service, you agree to be bound by these Terms. If you do
        not agree, do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 16 years of age to use the Service. By using the Service, you represent
        that you meet this requirement and have the legal capacity to enter into these Terms. If you
        are using the Service on behalf of an organization, you represent that you have the authority
        to bind that organization to these Terms.
      </p>

      <h2>2. Account Registration</h2>
      <ul>
        <li>You must provide accurate and complete information when creating your account.</li>
        <li>You are responsible for maintaining the confidentiality of your password and account credentials.</li>
        <li>You are responsible for all activities that occur under your account.</li>
        <li>You must notify us immediately of any unauthorized use of your account.</li>
        <li>We reserve the right to suspend or terminate accounts that provide false information.</li>
      </ul>

      <h2>3. The Service</h2>
      <p>
        Padlift provides tools to build and publish landing pages, collect waitlist signups, accept
        payments via third-party payment processors, track privacy-safe analytics, and manage integrations.
        We offer free and paid plans with different feature limits as described on our pricing page.
      </p>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the Service at any time,
        with or without notice. We will make reasonable efforts to provide advance notice of material
        changes.
      </p>

      <h2>4. Your Content</h2>

      <h3>4.1 Ownership</h3>
      <p>
        You retain all ownership rights to the content you create, upload, or publish through the
        Service (&quot;Your Content&quot;). We do not claim any intellectual property rights over Your Content.
      </p>

      <h3>4.2 License to Us</h3>
      <p>
        By uploading or publishing content through the Service, you grant us a non-exclusive,
        worldwide, royalty-free license to host, store, transmit, display, and distribute Your Content
        solely for the purpose of operating and providing the Service to you. This license terminates
        when you delete Your Content or your account.
      </p>

      <h3>4.3 Your Responsibility</h3>
      <p>
        You are solely responsible for ensuring that Your Content does not violate any applicable
        laws, infringe any third-party rights, or violate these Terms. You represent and warrant that
        you own or have the necessary rights and permissions to use and publish all content you upload.
      </p>

      <h2>5. Acceptable Use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>Violate any applicable law, regulation, or third-party rights</li>
        <li>Publish content that is illegal, defamatory, threatening, harassing, obscene, or harmful</li>
        <li>Distribute malware, viruses, or any harmful code</li>
        <li>Send spam, unsolicited messages, or engage in phishing</li>
        <li>Impersonate any person or entity, or misrepresent your affiliation</li>
        <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
        <li>Use the Service for any fraudulent or deceptive activity</li>
        <li>Scrape, crawl, or use automated means to access the Service without our consent</li>
        <li>Interfere with or disrupt the integrity or performance of the Service</li>
        <li>Collect personal information from other users without their consent</li>
        <li>Promote illegal drugs, weapons, or controlled substances</li>
        <li>Publish content that exploits minors in any way</li>
      </ul>
      <p>
        We reserve the right to remove content and suspend or terminate accounts that violate this
        policy, at our sole discretion, with or without notice.
      </p>

      <h2>6. Paid Plans and Billing</h2>

      <h3>6.1 Pricing</h3>
      <p>
        Paid plans are billed on a monthly or annual basis as selected during checkout. Prices are
        listed on our pricing page and may be changed with 30 days&apos; notice to existing subscribers.
      </p>

      <h3>6.2 Payment Processing</h3>
      <p>
        All payments are processed by Gumroad. By purchasing a paid plan, you also agree to{' '}
        <a href="https://gumroad.com/terms" target="_blank" rel="noopener noreferrer">
          Gumroad&apos;s Terms of Service
        </a>
        . We do not store your credit card or payment details.
      </p>

      <h3>6.3 Cancellation</h3>
      <p>
        You may cancel your subscription at any time through your Gumroad dashboard. Upon cancellation:
      </p>
      <ul>
        <li>You retain access to paid features until the end of your current billing period.</li>
        <li>After the billing period ends, your account reverts to the free plan.</li>
        <li>Your sites remain published but may be subject to free plan limits.</li>
        <li>No partial refunds are given for unused time in a billing period.</li>
      </ul>

      <h3>6.4 Refunds</h3>
      <p>
        Refund requests are handled on a case-by-case basis. If you believe you are entitled to a
        refund, please contact us within 14 days of the charge. We may issue refunds at our discretion
        for circumstances such as accidental purchases, service outages, or billing errors.
      </p>

      <h2>7. Waitlist Data and End Users</h2>

      <h3>7.1 Data Controller</h3>
      <p>
        When you collect waitlist signups through your published sites, <strong>you</strong> are the
        data controller for that information. Padlift acts as a data processor on your behalf. You
        are responsible for:
      </p>
      <ul>
        <li>Having a lawful basis for collecting visitor data</li>
        <li>Providing your own privacy policy to your visitors if required by applicable law</li>
        <li>Responding to data subject access requests from your visitors</li>
        <li>Ensuring compliance with applicable data protection laws (GDPR, CCPA, etc.)</li>
      </ul>

      <h3>7.2 Data Processing</h3>
      <p>
        We process waitlist data solely to provide the Service to you. We do not use visitor data
        for our own marketing, analytics, or any other purpose beyond operating the Service.
      </p>

      <h2>8. Intellectual Property</h2>

      <h3>8.1 Our Property</h3>
      <p>
        The Service, including its design, code, templates, UI components, documentation, and all
        related materials, is owned by Padlift and protected by intellectual property laws. You may
        not copy, modify, distribute, sell, or lease any part of our Service without written permission.
      </p>

      <h3>8.2 Templates and Published Sites</h3>
      <p>
        When you build and publish a site using Padlift templates and blocks, you own the resulting
        published content. The underlying template code and block components remain our intellectual
        property, but you have a perpetual, non-exclusive license to use the published output for
        any lawful purpose.
      </p>

      <h3>8.3 Feedback</h3>
      <p>
        If you provide feedback, suggestions, or feature requests, you grant us a non-exclusive,
        perpetual, irrevocable license to use, modify, and incorporate that feedback into the Service
        without any obligation to you.
      </p>

      <h2>9. Third-Party Services</h2>
      <p>
        The Service integrates with third-party services including Gumroad, Google Sheets, and
        custom webhooks. Your use of these integrations is subject to the respective third parties&apos;
        terms and privacy policies. We are not responsible for the actions, content, or data handling
        practices of any third-party services.
      </p>

      <h2>10. Disclaimer of Warranties</h2>
      <p>
        <strong>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
        EITHER EXPRESS OR IMPLIED.</strong> We disclaim all warranties, including but not limited to
        implied warranties of merchantability, fitness for a particular purpose, non-infringement,
        and any warranties arising out of course of dealing or usage of trade.
      </p>
      <p>Without limiting the foregoing, we do not warrant that:</p>
      <ul>
        <li>The Service will be uninterrupted, timely, secure, or error-free</li>
        <li>The results obtained from the Service will be accurate or reliable</li>
        <li>Any errors in the Service will be corrected</li>
        <li>The Service will meet your specific requirements</li>
      </ul>

      <h2>11. Limitation of Liability</h2>
      <p>
        <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PADLIFT, ITS OFFICERS,
        DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, OR PUNITIVE DAMAGES</strong>, including but not limited to loss of profits,
        data, use, goodwill, or other intangible losses, resulting from:
      </p>
      <ul>
        <li>Your use of or inability to use the Service</li>
        <li>Unauthorized access to or alteration of your data</li>
        <li>Any third-party conduct on the Service</li>
        <li>Any content obtained from the Service</li>
        <li>Service interruptions, downtime, or data loss</li>
      </ul>
      <p>
        <strong>Our total aggregate liability for all claims arising out of or relating to the Service
        shall not exceed the greater of (a) the amount you paid us in the 12 months preceding the
        claim or (b) $100 USD.</strong>
      </p>

      <h2>12. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Padlift and its officers, directors,
        employees, and agents from and against any claims, damages, losses, liabilities, costs, and
        expenses (including reasonable attorneys&apos; fees) arising from:
      </p>
      <ul>
        <li>Your use of the Service</li>
        <li>Your Content or any content published through your account</li>
        <li>Your violation of these Terms or any applicable law</li>
        <li>Your violation of any third-party rights</li>
        <li>Data you collect from your end users through published sites</li>
      </ul>

      <h2>13. Termination</h2>

      <h3>13.1 By You</h3>
      <p>
        You may stop using the Service and close your account at any time by contacting us. Upon
        account deletion, your data will be removed in accordance with our Privacy Policy.
      </p>

      <h3>13.2 By Us</h3>
      <p>
        We may suspend or terminate your access to the Service at any time, for any reason, including
        but not limited to violation of these Terms, non-payment, or if we reasonably believe your
        use of the Service poses a risk to other users or to our systems. Where possible, we will
        provide notice and an opportunity to export your data before termination.
      </p>

      <h3>13.3 Effect of Termination</h3>
      <p>
        Upon termination, your right to use the Service ceases immediately. Published sites may be
        taken offline. Sections 4.1 (Your ownership of content), 8 (IP), 10 (Disclaimers), 11
        (Limitation of Liability), 12 (Indemnification), and 15 (Governing Law) survive termination.
      </p>

      <h2>14. Changes to These Terms</h2>
      <p>
        We may revise these Terms at any time by posting an updated version on this page. Material
        changes will be communicated via email or a prominent notice within the Service at least 30
        days before they take effect. Your continued use of the Service after the effective date
        constitutes acceptance of the revised Terms.
      </p>

      <h2>15. Governing Law and Disputes</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of India, without
        regard to conflict of law principles. Any disputes arising from these Terms or the Service
        shall be resolved through good-faith negotiation first. If negotiation fails, disputes shall
        be submitted to binding arbitration in accordance with applicable rules, conducted in English.
      </p>

      <h2>16. General</h2>
      <ul>
        <li><strong>Entire Agreement</strong> &mdash; these Terms, together with our Privacy Policy, constitute
          the entire agreement between you and Padlift.</li>
        <li><strong>Severability</strong> &mdash; if any provision is found unenforceable, the remaining
          provisions remain in full effect.</li>
        <li><strong>Waiver</strong> &mdash; our failure to enforce any right or provision does not constitute
          a waiver of that right.</li>
        <li><strong>Assignment</strong> &mdash; you may not assign your rights under these Terms without our
          consent. We may assign our rights without restriction.</li>
        <li><strong>Force Majeure</strong> &mdash; we are not liable for delays or failures caused by events
          beyond our reasonable control (natural disasters, war, pandemics, internet outages, etc.).</li>
      </ul>

      <h2>17. Contact</h2>
      <p>
        If you have questions about these Terms, contact us at:
      </p>
      <ul>
        <li>Email: <a href="mailto:legal@padlift.com">legal@padlift.com</a></li>
        <li>Support: Use the support widget in your dashboard</li>
      </ul>

      <hr />

      <p className="text-sm text-muted-foreground">
        By using Padlift, you acknowledge that you have read, understood, and agreed to these Terms
        of Service. See also our{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </article>
  );
}
