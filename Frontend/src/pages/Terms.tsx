import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

          <p className="text-gray-700 mb-4 font-semibold">
            HEALTH CARE PROFESSIONALS SELF SUPPORT SCHEME (lawyerwelfareindia )
          </p>

          <p className="text-gray-700 mb-6">
            HEALTH CARE PROFESSIONALS SELF SUPPORT SCHEME (lawyerwelfareindia )
            was established for HEALTH CARE PROFESSIONALS and by HEALTH CARE
            PROFESSIONALS to support them. lawyersfareindia is managed by the
            HEALTH CARE PROFESSIONALS TRUST.
          </p>

          <h2 className="text-xl font-semibold mb-3">
            Main Rules (For Members)
          </h2>

          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              To join lawyerwelfareindia , Doctors and Dentists may voluntarily
              register through the website after agreeing to these terms and
              conditions. A yearly membership fee is charged for joining the
              scheme.
            </li>

            <li>
              Maximum age to join lawyersfareindia is 60 years. Applicants older
              than 60 will not be accepted for new membership. There is a
              waiting (lock-in) period of 1 year from the date of registration
              during which certain benefits may not be available. Coverage
              (where applicable) can be provided up to the age of 75 years
              according to the scheme rules and eligibility at the time.
            </li>

            <li>
              Registration is mandatory and must be completed by filling out the
              required information form. lawyersfareindia will also share
              essential information via social media platforms, the app and the
              website. lawyersfareindia follows the rule: only those who
              cooperate will receive support — members are expected to send
              support to the families of deceased members when called upon.
            </li>

            <li>
              The lock-in period for all members is 12 months (1 year). Support
              will not be provided if a nominee is found to be involved in
              suicide or murder; in special circumstances the final decision
              rests with lawyerwelfareindia . Rules will be available on the
              website (current rules and previous versions where applicable).
            </li>

            <li>
              lawyersfareindia may exercise discretion in decisions regarding
              calls for contributions, including conducting due diligence on
              legality or other matters as appropriate. Members and nominees do
              not have a legal claim to receive contributions;
              lawyerwelfareindia will ethically strive to secure contributions.
            </li>

            <li>
              If a Doctor mistakenly sends an excess amount to a nominee's
              account, the nominee must return the funds upon presentation of
              appropriate evidence. lawyersfareindia will make reasonable
              efforts to assist but cannot guarantee recovery of mistakenly
              transferred funds.
            </li>

            <li>
              Making contributions is mandatory to be eligible to receive
              contributions. After becoming a member and completing
              contributions post lock-in period, members must upload receipts
              via the website or a provided form as required. Failure to
              contribute or to upload required receipts will render a member
              ineligible to receive contributions.
            </li>

            <li>
              Members who fail to cooperate may lose statutory membership
              status. Such members can reactivate status by contributing 100% of
              outstanding dues as defined by lawyerwelfareindia .
            </li>

            <li>
              Members who leave the association may regain membership in the
              future after paying all due contributions and fees as required by
              lawyersfareindia rules.
            </li>

            <li>
              In the event of the deaths of multiple members, assistance will be
              provided in order of death date. If two or more members die on the
              same date, priority will be given based on the percentage/average
              of assistance as determined by lawyerwelfareindia .
              lawyerwelfareindia may alter order in special circumstances (e.g.,
              inability to conduct field inspection or technical limitations).
            </li>

            <li>
              In case of any dispute regarding a nominee, the State/Core Team
              will review and decide after due scrutiny.
            </li>

            <li>
              All official information will be posted on lawyerwelfareindia 's
              Telegram/WhatsApp group and the App; members who do not receive
              information through these channels remain responsible for
              obtaining it. Members can contact the helpline for queries.
            </li>

            <li>
              lawyersfareindia may amend or change any rules at any time as
              required. The copy of the rules posted on the website at the time
              of a decision will be considered the authoritative version.
            </li>

            <li>
              Members make contributions directly to the nominee of the deceased
              member; no member or third party has the right to bring judicial
              claims for contributions. Contributions are voluntary and depend
              on the willingness of members to give; lawyersfareindia is not
              liable if contributions are less than expected.
            </li>

            <li>
              lawyersfareindia does not coerce any Doctor to become a member.
              Membership is voluntary and requires acceptance of these rules.
              Members may voluntarily dissociate at any time.
            </li>

            <li>
              Members who submit forged or falsified receipts or otherwise act
              contrary to the rules may be terminated and denied benefits;
              lawyersfareindia is authorized to make decisions regarding such
              cases.
            </li>

            <li>
              lawyersfareindia will use membership fees to support the operation
              and services of the scheme, including website and app
              development/operation, SMS services, office and technical support,
              on-site inspections, membership campaigns, and adoption of
              technology to ensure transparency and ease of process.
            </li>
          </ol>

          <p className="text-gray-700 mb-6">
            Members give contributions directly to nominees of deceased doctors;
            contributions do not create legal entitlements to receive equivalent
            support. lawyersfareindia will make reasonable efforts to verify
            contributions and compliance, but cannot guarantee any specific
            outcome if members do not contribute.
          </p>

          <p className="text-gray-700 mb-6">
            In case of any dispute or question regarding these terms, the
            version of the rules uploaded on the website will be the valid copy
            and lawyersfareindia reserves the right to decide accordingly.
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
