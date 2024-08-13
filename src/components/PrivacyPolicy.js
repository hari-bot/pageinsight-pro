import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Your privacy is important to us. This Privacy Policy explains how
        pageInsightPro ("we", "us", or "our") collects, uses, and protects your
        information when you use our app.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p>
        <strong>Personal Information:</strong> When you use our app, we may
        collect personal information that you voluntarily provide, such as your
        name, email address, and profile picture.
      </p>
      <p>
        <strong>Facebook Data:</strong> We may also collect data from your
        Facebook account, including your public profile, email, and any other
        data you authorize us to access through the Facebook login.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc ml-6">
        <li>To provide and maintain our service.</li>
        <li>To notify you about changes to our service.</li>
        <li>To provide customer support.</li>
        <li>To analyze the usage of our app to improve its functionality.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">
        3. Sharing Your Information
      </h2>
      <p>
        We do not share, sell, or rent your personal information to third
        parties. We may share your information only with service providers who
        need access to this data to perform services on our behalf.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Security</h2>
      <p>
        We take reasonable measures to protect your information from
        unauthorized access, use, or disclosure. However, please be aware that
        no method of transmission over the internet or method of electronic
        storage is completely secure.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Your Rights</h2>
      <p>
        You have the right to access, update, or delete the personal information
        we hold about you. If you would like to exercise these rights, please
        contact us at{" "}
        <a
          href="mailto:hariharanuv7@gmail.com"
          className="text-blue-500 underline"
        >
          hariharanuv7@gmail.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-4">
        6. Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </p>
      <ul className="list-disc ml-6">
        <li>
          Email:{" "}
          <a
            href="mailto:hariharanuv7@gmail.com"
            className="text-blue-500 underline"
          >
            hariharanuv7@gmail.com
          </a>
        </li>
        <li>Phone: +91 8056398901</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
