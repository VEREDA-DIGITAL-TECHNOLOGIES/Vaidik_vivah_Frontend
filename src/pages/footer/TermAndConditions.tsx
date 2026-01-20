import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: January 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="space-y-8 rounded-xl bg-white p-6 shadow-sm md:p-10">
          
          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              By accessing or using our platform, you agree to be bound by these
              Terms and Conditions. If you do not agree with any part of these
              terms, you must not use our services.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              2. Eligibility
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              You must be at least 18 years old and capable of entering into a
              legally binding agreement to use this platform.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              3. User Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-600">
              <li>Provide accurate and complete information</li>
              <li>Maintain confidentiality of your account</li>
              <li>Do not misuse or abuse the platform</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              4. Application & Approval
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Submitting an application does not guarantee approval. We reserve
              the right to approve or reject applications at our sole discretion
              without prior notice.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              5. Termination
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your access to the
              platform if you violate these Terms & Conditions or engage in any
              unlawful activity.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              6. Limitation of Liability
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              We shall not be liable for any indirect, incidental, or
              consequential damages arising out of your use of the platform.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              7. Changes to Terms
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              We may update these Terms & Conditions from time to time. Continued
              use of the platform after changes are posted constitutes
              acceptance of the revised terms.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              8. Contact Information
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              If you have any questions regarding these Terms & Conditions,
              please contact us at:
            </p>
            <p className="mt-1 font-medium text-gray-700">
              support@yourcompany.com
            </p>
          </section>

          {/* Footer Actions */}
          <div className="flex flex-col items-center gap-4 border-t pt-6 sm:flex-row sm:justify-between">
            <Link
              to="/"
              className="text-sm font-medium text-[#FD5C90] hover:underline"
            >
              ← Back to Home
            </Link>

            <Link
              to="/apply"
              className="rounded-lg bg-[#FD5C90] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#e94b7e]"
            >
              Apply Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
