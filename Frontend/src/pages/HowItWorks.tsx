import {
  UserPlus,
  FileCheck,
  CreditCard,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-black to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-white max-w-3xl">
            Join lawyersfareindia in four simple steps and start enjoying
            comprehensive benefits for you and your family.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Simple Process, Lasting Benefits
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Our streamlined process ensures you can become a member quickly
              and start enjoying benefits right away.
            </p>
          </div>

          <div className="space-y-12">

            {/* STEP 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-start">
                  <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                      <UserPlus className="mr-3 text-black" size={28} />
                      Complete Registration
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Fill out the registration form with your personal details
                      and professional credentials. The form is kept simple
                      and user-friendly for busy legal professionals.
                    </p>

                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Provide Bar Council enrollment & practice details
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Upload identity proof and qualification proof
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Add nominee and family member information
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <img
                  src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Registration"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* STEP 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                  alt="Document Verification"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div>
                <div className="flex items-start">
                  <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">
                    2
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                      <FileCheck className="mr-3 text-black" size={28} />
                      Document Verification
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      Our team verifies your documents and professional
                      credentials to ensure all members are genuine legal
                      practitioners.
                    </p>

                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Bar Council enrollment verification
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Document & ID authenticity check
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Notification upon successful approval
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-start">
                  <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">
                    3
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                      <CreditCard className="mr-3 text-black" size={28} />
                      Complete Payment
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      Proceed with your membership payment through our secure
                      payment gateway.
                    </p>

                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Multiple payment modes supported
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Secure transaction process
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Instant confirmation message
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <img
                  src="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Payment"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* STEP 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.pexels.com/photos/4427621/pexels-photo-4427621.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Membership Benefits"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div>
                <div className="flex items-start">
                  <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">
                    4
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                      <Shield className="mr-3 text-black" size={28} />
                      Enjoy Full Benefits
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      Get full access to all welfare, financial, and emergency
                      benefits offered exclusively to practicing lawyers.
                    </p>

                    <ul className="space-y-2 text-gray-600">

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Emergency financial assistance for advocates
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Welfare support for family in case of unforeseen events
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        Exclusive legal community support & benefits
                      </li>

                      <li className="flex items-start">
                        <CheckCircle className="text-black mr-2 mt-1" size={18} />
                        24/7 member assistance & dedicated helpline
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-2xl p-8 md:p-12 text-white text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Lawyers Welfare?
            </h2>

            <p className="text-xl mb-8 text-white">
              Become part of a strong national support system dedicated to the
              well-being and security of lawyers across India.
            </p>

            <Link
              to="/join"
              className="bg-white text-black px-10 py-4 rounded-lg font-semibold 
                        border border-white 
                        hover:bg-transparent hover:text-white 
                        transition-colors text-lg"
            >
              Start Your Application
            </Link>

          </div>
        </div>
      </section>

  </div>
  );
}
