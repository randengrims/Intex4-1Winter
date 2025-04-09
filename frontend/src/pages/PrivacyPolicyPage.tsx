import React from 'react';
import './PrivacyPolicyPage.css'; // Import the CSS file for styling
import PublicHeader from '../components/PublicHeader'; // Import your header component

const PrivacyPolicy: React.FC = () => {
  return (
    <div className='page-container'>
      {/* Public Header */}
      <PublicHeader />
      <div className='content-container'>
        <h1 className='text-4xl font-bold mb-8'>Privacy Policy</h1>
        <p>
          Welcome to our Privacy Policy. Your privacy is critically important to
          us.
        </p>

        <h2 className='text-2xl font-semibold mt-6'>
          1. Information We Collect
        </h2>
        <ol type='a' className='space-y-4'>
          <li>
            <strong>Information You Provide to Us:</strong>
            <ul className='list-disc ml-6'>
              <li>
                Account Information: When you register, we collect your name,
                email address, password, and other account-related information.
              </li>
              <li>
                Payment Information: If you subscribe to premium content, we may
                collect billing details such as credit/debit card information
                through our secure payment processors.
              </li>
              <li>
                Content Preferences: When you watch, rate, or search for
                content, we collect data about your interactions to personalize
                your experience.
              </li>
            </ul>
          </li>
          <li>
            <strong>Information We Collect Automatically:</strong>
            <ul className='list-disc ml-6'>
              <li>
                Usage Information: We gather data on how you interact with the
                Service (e.g., watch history, page views, clickstream data).
              </li>
              <li>
                Device and Technical Information: We collect your IP address,
                browser type, device ID, and system configuration.
              </li>
              <li>
                Cookies and Similar Technologies: We use cookies and similar
                tools for authentication, analytics, and personalized content.
                Where required by law, we will obtain your consent before
                placing non-essential cookies.
              </li>
            </ul>
          </li>
        </ol>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>
          2. Legal Bases for Processing (GDPR)
        </h2>
        <ol type='a' className='space-y-2'>
          <li>
            <strong>
              Under the General Data Protection Regulation (GDPR), we process
              your personal data based on the following legal grounds:
            </strong>
            <ul className='list-disc ml-6'>
              <li>
                Contractual Necessity: To provide the services you request
                (e.g., account registration, streaming content).
              </li>
              <li>
                Legitimate Interests: To improve our services, prevent fraud,
                and ensure security.
              </li>
              <li>
                Consent: For marketing emails, non-essential cookies, and other
                cases where required.
              </li>
              <li>
                Legal Obligation: To comply with legal and regulatory
                obligations.
              </li>
            </ul>
          </li>
        </ol>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>
          3. How We Use Your Information
        </h2>
        <ol type='a'>
          <li>
            <strong>We use your information to:</strong>
            <ul className='list-disc ml-6'>
              <li>Provide and improve our Service;</li>
              <li>Customize your viewing experience;</li>
              <li>
                Communicate with you (e.g., updates, offers, service
                notifications);
              </li>
              <li>Process transactions and manage subscriptions;</li>
              <li>Enforce our terms and prevent fraud;</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </li>
        </ol>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>
          4. Sharing of Information
        </h2>
        <ol type='a'>
          <li>
            <strong>We may share your information:</strong>
            <ul className='list-disc ml-6'>
              <li>
                With Service Providers: Third parties who help us operate the
                Service (e.g., payment processors, hosting services, analytics
                providers) under data processing agreements.
              </li>
              <li>
                For Legal Reasons: If required by law, regulation, or legal
                process.
              </li>
              <li>With Your Consent: When you give explicit permission.</li>
            </ul>
          </li>
        </ol>

        <p>
          We do <strong>not</strong> sell or rent your personal information to
          third parties for marketing purposes.
        </p>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>
          5. International Data Transfers
        </h2>
        <p>
          If you are located in the European Economic Area (EEA), your
          information may be transferred to and processed in countries outside
          the EEA, including the United States. In such cases, we ensure
          appropriate safeguards are in place, such as Standard Contractual
          Clauses approved by the European Commission.
        </p>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>
          6. Your Rights Under GDPR
        </h2>
        <ol type='a'>
          <li>
            <strong>
              If you are located in the EEA, you have the following rights
              regarding your personal data:
            </strong>
            <ul className='list-disc ml-6'>
              <li>
                Right of Access – You can request a copy of your personal data.
              </li>
              <li>
                Right of Rectification – You can request correction of
                inaccurate or incomplete data.
              </li>
              <li>
                Right to Erasure ("Right to be Forgotten") – You can request
                deletion of your data, subject to legal obligations.
              </li>
              <li>
                Right to Restrict Processing – You can request we limit the
                processing of your data.
              </li>
              <li>
                Right to Data Portability – You can request to receive your data
                in a commonly used format.
              </li>
              <li>
                Right to Object – You can object to our processing, particularly
                for direct marketing purposes.
              </li>
              <li>
                Right to Withdraw Consent – You may withdraw your consent at any
                time, where consent is the basis for processing.
              </li>
              <li>
                Right to Lodge a Complaint – You can lodge a complaint with your
                local data protection authority.
              </li>
            </ul>
          </li>
        </ol>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>7. Your Choices</h2>
        <ol type='a'>
          <li>
            <ul className='list-disc ml-6'>
              <li>
                Account Information: You can review and update your account
                settings at any time.
              </li>
              <li>
                Marketing Preferences: You can opt out of promotional emails
                using the unsubscribe link.
              </li>
              <li>
                Cookies: You can manage cookie settings via your browser or in
                our cookie banner (where applicable).
              </li>
            </ul>
          </li>
        </ol>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>8. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your information against unauthorized access, loss, or misuse.
          However, no system is completely secure.
        </p>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>9. Data Retention</h2>
        <p>
          We retain your personal data only for as long as necessary to provide
          the Service, comply with legal obligations, and resolve disputes. When
          data is no longer required, it is securely deleted or anonymized.
        </p>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>10. Children's Privacy</h2>
        <p>
          Our Service is not intended for children under the age of 13 (or the
          age of digital consent in your country). We do not knowingly collect
          personal information from children. If we learn that we have done so,
          we will take steps to delete such information promptly.
        </p>

        <hr />

        <h2 className='text-2xl font-semibold mt-6'>
          11. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of
          significant changes by updating the effective date and, where
          required, seeking your renewed consent.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
