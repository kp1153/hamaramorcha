// app/privacy-policy/page.js

export const metadata = {
  title: 'Privacy Policy - Hamara Morcha',
  description: 'Privacy Policy for Hamara Morcha News App',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">
          <strong>Effective Date:</strong> January 13, 2026
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Introduction</h2>
          <p>
            Welcome to Hamara Morcha. We respect your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our news application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Information We Collect</h2>
          <p>
            Hamara Morcha is a news reading application. We do not collect, store, or share any personal information from our users. 
            You can use our app without providing any personal data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Data We Do Not Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal identification information (name, email, phone number)</li>
            <li>Location data</li>
            <li>Device information</li>
            <li>Usage statistics</li>
            <li>Cookies or tracking data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Third-Party Services</h2>
          <p>
            Our app may contain links to external news sources and websites. We are not responsible for the privacy practices 
            of these third-party sites. We encourage you to read their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Children's Privacy</h2>
          <p>
            Our app is intended for users aged 18 and above. We do not knowingly collect information from anyone under 18 years of age.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-3 space-y-1">
            <p><strong>Email:</strong> editor@hamaramorcha.com</p>
            <p><strong>Phone:</strong> +91 9996865069</p>
            <p><strong>Website:</strong> https://www.hamaramorcha.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}