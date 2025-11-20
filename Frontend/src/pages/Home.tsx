import { Link } from "react-router-dom";
import { Shield, Users, Heart, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
 return (
  <div className="min-h-screen">

    {/* HERO SECTION */}
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-32"
 style={{
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')`,
  backgroundAttachment: "fixed",
}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Empowering Lawyers Through Collective Welfare
          </h1>
          <p className="text-xl mb-8 text-white">
            Join lawyersfareindia – A dedicated welfare scheme created exclusively 
            for advocates to ensure financial stability, support, and peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/join"
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white hover:border-black transition-colors text-center flex items-center justify-center"
            >
              Join Now <ArrowRight className="ml-2" size={20} />
            </Link>

            <Link
              to="/how-it-works"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white hover:border-black transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ABOUT SECTION */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Lawyers Team"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built by Lawyers, For Lawyers
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-black mr-3 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700">
                  Designed exclusively for advocates and legal professionals
                </span>
              </li>

              <li className="flex items-start">
                <CheckCircle className="text-black mr-3 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700">
                  Welfare support for families and nominees
                </span>
              </li>

              <li className="flex items-start">
                <CheckCircle className="text-black mr-3 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700">
                  Simple, transparent, and lawyer-friendly registration process
                </span>
              </li>

              <li className="flex items-start">
                <CheckCircle className="text-black mr-3 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700">
                  Dedicated support team available whenever you need
                </span>
              </li>
            </ul>

            <Link
              to="/membership"
              className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
            >
              View Membership Details
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* WHY CHOOSE US */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose lawyersfareindia?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide reliable welfare benefits and strong community support specially designed for lawyers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-black w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Financial Protection
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Strong financial support frameworks designed to safeguard advocates and their families.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-black w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Legal Community Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Be part of a strong network of advocates who stand by each other during every challenge.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-black w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Heart className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Welfare Benefits
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Exclusive welfare measures and assistance programs for practicing advocates.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA SECTION */}
    <section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-black rounded-2xl p-8 md:p-12 text-white text-center">

      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Join Our Legal Community?
      </h2>

      <p className="text-xl mb-8 text-gray-100">
        Take the step towards securing your future and joining a committed
        community of advocates.
      </p>

      <Link
        to="/join"
        className="bg-white text-black px-10 py-4 rounded-lg font-semibold 
                   border border-white 
                   hover:bg-transparent hover:text-white 
                   transition-colors text-lg"
      >
        Start Your Application Today
      </Link>

    </div>
  </div>
</section>

  </div>
);
}
