import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

          <p className="text-gray-700 mb-4 font-semibold">
            LAWYERS WELFARE SELF SUPPORT SCHEME (lawyerwelfareindia)
          </p>

          <p className="text-gray-700 mb-6">
            LAWYERS WELFARE SELF SUPPORT SCHEME (lawyerwelfareindia) was
            established for lawyers and by lawyers to support members of the
            legal profession. lawyerwelfareindia is managed by the Legal
            Professionals Welfare Trust.
          </p>

          <h2 className="text-xl font-semibold mb-3">Main Rules (For Members)</h2>

          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              To join lawyerwelfareindia, advocates may voluntarily register
              through the website after agreeing to these terms and conditions.
              A yearly membership fee is charged for joining the scheme.
            </li>

            <li>
              Maximum age to join lawyerwelfareindia is 60 years. Applicants
              above 60 will not be accepted for new membership. There is a
              lock-in period of 1 year during which certain benefits may not be
              available. Coverage (where applicable) can extend up to the age of
              75 as per scheme rules.
            </li>

            <li>
              Registration is mandatory and must be completed with correct
              details. lawyerwelfareindia will share essential information via
              social media groups, the app, and the website. Members must
              cooperate by contributing to families of deceased lawyers when
              notified.
            </li>

            <li>
              The lock-in period for all members is 12 months. Support will not
              be provided if a nominee is found involved in suicide, murder, or
              fraudulent activities; final decisions rest with
              lawyerwelfareindia.
            </li>

            <li>
              lawyerwelfareindia may exercise discretion regarding contribution
              calls and conduct appropriate verification or due diligence.
              Members/nominees cannot legally claim contributions. The Trust
              will ethically attempt to secure contributions.
            </li>

            <li>
              If a member mistakenly sends excess funds to a nominee, the nominee
              must return the amount upon valid evidence. lawyerwelfareindia
              will assist but cannot guarantee recovery.
            </li>

            <li>
              Making contributions is mandatory to remain eligible for benefits.
              Members must upload receipts as required. Failure to contribute or
              upload receipts results in loss of eligibility.
            </li>

            <li>
              Members who do not cooperate may lose active membership. They can
              regain status by clearing all outstanding dues.
            </li>

            <li>
              Members who leave the association may rejoin later after paying
              pending dues and fees according to the rules.
            </li>

            <li>
              In the event of multiple deaths, assistance will be provided based
              on the date of demise. If two lawyers pass away on the same date,
              priority will be based on internal scheme calculations. Special
              conditions may alter the order.
            </li>

            <li>
              Any nominee-related dispute will be reviewed and concluded by the
              State/Core Team after proper verification.
            </li>

            <li>
              All official information will be posted on lawyerwelfareindia’s
              Telegram/WhatsApp group or app. Members not receiving updates must
              still stay informed. The helpline is available for support.
            </li>

            <li>
              lawyerwelfareindia may modify or update rules at any time. The
              version displayed on the website at the time of a decision will be
              considered the valid copy.
            </li>

            <li>
              Members deposit contributions directly to the nominee of the
              deceased lawyer. Contributions are voluntary and are NOT legally
              enforceable. lawyerwelfareindia is not liable if contributions
              fall short.
            </li>

            <li>
              lawyerwelfareindia does not force any lawyer to join. Membership
              is voluntary, and members may leave anytime.
            </li>

            <li>
              Members who submit forged receipts, inaccurate details, or violate
              rules may be terminated and denied benefits. lawyerwelfareindia is
              authorized to take necessary decisions.
            </li>

            <li>
              Membership fees will be used for operations including website and
              app maintenance, SMS/communication services, inspections,
              campaigns, and technology upgrades.
            </li>
          </ol>

          <p className="text-gray-700 mb-6">
            Members send contributions directly to nominees of deceased lawyers.
            Contributions do not guarantee equal or fixed support. The Trust
            will attempt to verify contributions and maintain transparency but
            cannot guarantee outcomes if members do not cooperate.
          </p>

          <p className="text-gray-700 mb-6">
            In case of disputes, the rules displayed on the website will be
            considered final. lawyerwelfareindia reserves the right to take
            decisions accordingly.
          </p>

          <div className="flex items-center space-x-4">
            <Link
              to="/join"
              className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Back to Join Form
            </Link>

            <Link to="/" className="text-sm text-gray-600 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
