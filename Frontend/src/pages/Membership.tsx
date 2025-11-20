import { Check, Users, Shield, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Membership() {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-black to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Lawyers Welfare Membership
          </h1>
          <p className="text-xl text-white max-w-3xl">
            Strong protection, support, and benefits designed exclusively for
            advocates and their families.
          </p>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Membership Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our welfare membership offers comprehensive financial, legal, and
              family support for the advocate community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <Users className="text-black mb-4" size={40} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advocate Protection
              </h3>
              <p className="text-gray-700">
                Emergency financial and welfare support for enrolled advocates.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <Heart className="text-black mb-4" size={40} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Family Support
              </h3>
              <p className="text-gray-700">
                Welfare benefits and assistance available for spouse, children,
                and dependent parents.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <Shield className="text-black mb-4" size={40} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nominee Protection
              </h3>
              <p className="text-gray-700">
                Full benefit transfer and dedicated claim support for nominees.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <Star className="text-black mb-4" size={40} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Priority Assistance
              </h3>
              <p className="text-gray-700">
                Priority access to welfare services, legal guidance, and
                association support.
              </p>
            </div>
          </div>

          {/* WHAT’S INCLUDED */}
          <div className="bg-gradient-to-br from-black to-gray-700 rounded-2xl p-8 md:p-12 text-white mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What's Included
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Primary Member Benefits */}
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Primary Member Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>
                      Financial assistance during emergencies or accidents
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Welfare fund benefits for critical situations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Professional legal indemnity support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>
                      Skill development & continuing legal education programs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Mental wellness & stress management resources</span>
                  </li>
                </ul>
              </div>

              {/* Family Coverage */}
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Family Coverage</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>
                      Welfare support for spouse, children, and dependent
                      parents
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Education scholarships for advocate’s children</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Family legal awareness and safety programs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Emergency family assistance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Counseling and family support services</span>
                  </li>
                </ul>
              </div>

              {/* Nominee Benefits */}
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Nominee Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Immediate relief fund for nominees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Simple documentation & fast claim support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Transferable benefits (if scheme permits)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Dedicated nominee helpdesk</span>
                  </li>
                </ul>
              </div>

              {/* Additional Services */}
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Additional Services
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Exclusive advocate networking events</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Legal workshops: cyber law, taxation, litigation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Access to legal library & research resources</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Career development for young advocates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Seminars, conferences & legal awareness events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ELIGIBILITY */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Eligibility Criteria
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Who Can Join */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Who Can Join?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>
                      Enrolled advocates with a valid Bar Council number
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Practicing lawyers in any court (District/HC/SC)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Retired legal professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Newly enrolled advocates (0–2 years)</span>
                  </li>
                </ul>
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Required Documents
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Bar Council Enrollment Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Law Degree Certificate (LLB/LLM)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Government-issued ID Proof</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-black mr-3 mt-1" size={20} />
                    <span>Passport-size Photograph</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="text-center bg-black text-white py-16 rounded-2xl">
            <h2 className="text-3xl font-bold  mb-6">
              Ready to Join?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Become a member and secure a stronger future for yourself and your
              family.
            </p>
            <Link
              to="/join"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Apply for Membership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
