import { useState } from "react";
import { ChevronDown, ChevronUp, Gavel } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
      >
        <span className="font-semibold text-gray-900 pr-4 flex items-center gap-2">
          <Gavel size={18} className="text-black" />
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-black flex-shrink-0" size={24} />
        ) : (
          <ChevronDown className="text-black flex-shrink-0" size={24} />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "Who is eligible to join lawwelfareindia?",
      answer:
        "Membership is open to all licensed advocates, legal consultants, retired lawyers, and law graduates registered with the Bar Council of India or any State Bar Council.",
    },
    {
      question: "What documents are required for lawyer membership?",
      answer:
        "You must submit your Bar Council Enrollment Certificate, Law Degree, a government ID proof, and a recent passport-size photo. All documents must be clear and valid.",
    },
    {
      question: "How long does the lawyer verification process take?",
      answer:
        "Verification usually takes 2–3 business days. You will receive a confirmation email once the verification is complete.",
    },
    {
      question: "Can I include my family members in the welfare scheme?",
      answer:
        "Yes, you can add up to 2 family members—spouse, children, or parents. Each family member must provide basic identity details.",
    },
    {
      question: "What is a nominee and why is it required?",
      answer:
        "A nominee is the person who receives your benefits in case of an emergency. It ensures smooth transfer of welfare benefits to your beneficiary.",
    },
    {
      question: "What benefits do members receive?",
      answer:
        "Members get financial assistance, legal welfare support, accidental coverage, medical reimbursements, legal aid tools, training materials, and exclusive community benefits.",
    },
    {
      question: "How much does membership cost?",
      answer:
        "Membership fees depend on plan type and family member inclusion. Contact our support team for detailed pricing.",
    },
    {
      question: "Is there a renewal process for membership?",
      answer:
        "Yes, membership is renewed annually. Renewal reminders are sent 30 days before expiry with instructions.",
    },
    {
      question: "Can I update my nominee details later?",
      answer:
        "Yes, nominee details can be changed anytime via your member dashboard or by contacting support.",
    },
    {
      question: "How do I apply for welfare assistance or claims?",
      answer:
        "You can submit claims through your member portal or contact the support team. Our welfare team will guide you through the process.",
    },
    {
      question: "Is there a waiting period before benefits activate?",
      answer:
        "No. Your benefits activate immediately after payment confirmation.",
    },
    {
      question: "Can I cancel my membership?",
      answer:
        "Yes, you may cancel anytime. However, membership fees are non-refundable. Contact support for cancellation assistance.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us 24/7 via phone at +91-9876543210, email at lawwelfareindia@gmail.com, or through our website contact form.",
    },
    {
      question: "Are there any age restrictions for membership?",
      answer:
        "There are no age restrictions for primary lawyer members. Dependent children can be added up to age 25 if studying.",
    },
    {
      question: "What makes lawwelfareindia different?",
      answer:
        "lawwelfareindia is built specifically for advocates’ welfare. Our plans support legal professionals with financial aid, emergency help, continuous learning, and a strong community network.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-black to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white max-w-3xl">
            Find answers to common questions about lawwelfareindia membership,
            benefits, and processes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-lg text-gray-600">
              Can't find what you're looking for? Contact our support team for
              assistance.
            </p>
          </div>

          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          <div className="mt-12 bg-black border border-gray-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white mb-6">
              Our support team is here to help you with any additional questions
              or concerns.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-transparent border border-white hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
