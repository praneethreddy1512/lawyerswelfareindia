import { Scale, Eye, Gavel, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-black to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About lawyersfareindia
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            Lawyers Welfare & Support Scheme – Empowering legal professionals
            through collective support and comprehensive welfare benefits.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LawyersFareIndia was founded with a clear vision: to create a
                dedicated welfare and support system exclusively for lawyers and
                legal professionals. Understanding the unique challenges faced
                by advocates, we developed a scheme that focuses directly on
                their professional and personal needs.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our organization brings together experienced legal experts,
                financial advisors, and support staff committed to delivering
                reliable guidance and meaningful benefits to our members.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we proudly support thousands of lawyers across the
                country, offering financial security, community support, and
                peace of mind to legal professionals and their families.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
                alt="Legal Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To provide financial protection, welfare benefits, and support
                to lawyers across the nation.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become India’s most trusted and transparent welfare support
                system for legal professionals.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Values
              </h3>
              <p className="text-gray-600">
                Integrity, ethics, transparency, and dedicated service to our
                legal community.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Growth
              </h3>
              <p className="text-gray-600">
                Expanding welfare benefits and support services for our growing
                advocate community.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black to-gray-700 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Why We're Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Profession-Focused
                </h3>
                <p className="text-white leading-relaxed">
                  Our welfare system is designed exclusively for lawyers,
                  addressing their unique challenges and providing relevant,
                  meaningful support.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-white leading-relaxed">
                  Built on collective strength, lawyers support each other
                  through contributions and shared welfare benefits.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Transparent Operations
                </h3>
                <p className="text-white leading-relaxed">
                  We operate with complete transparency, ensuring every member
                  understands how their contributions are managed and utilized.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Comprehensive Coverage
                </h3>
                <p className="text-white leading-relaxed">
                  Our benefits extend to family and nominees, ensuring long-term
                  protection and peace of mind for legal professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
