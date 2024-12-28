import { useState } from "react";
import { FaEnvelope, FaPhone, FaChevronDown } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { sendSupportEmail } from "../../../services/emailjs/emailService";

const faqItems = [
  {
    question: "How can I reset my password?",
    answer:
      'To reset your password, click on "Forgot Password" on the login page and follow the instructions. You will receive an email with a link to create a new password.',
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact us via email at support@inspir-edu.com or call +623-263-3992. Our support team is available 24/7 to assist you with your issues.",
  },
  {
    question: "Where can I find my course materials?",
    answer:
      'Course materials are available in your student dashboard under the "Courses" section. You can download the materials or view them directly on the platform.',
  },
  {
    question: "How can I update my account information?",
    answer:
      'To update your account information, log in to your account, navigate to the "Account Settings" page, and update your personal details. Make sure to save the changes before you exit.',
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, including Visa, MasterCard, and American Express. Additionally, we support PayPal and other regional payment methods.",
  },
  {
    question: "How can I request a refund?",
    answer:
      "To request a refund, please contact our support team at support@inspir-edu.com. Refund requests are processed based on our refund policy, which can be found on the 'Terms and Conditions' page.",
  },
  {
    question: "Why can't I access certain features?",
    answer:
      "Some features may be restricted to certain user roles or account types. Please ensure your account has the necessary permissions or upgrade your subscription to access these features.",
  },
  {
    question: "Can I change my subscription plan?",
    answer:
      "Yes, you can change your subscription plan at any time. Go to the 'Subscription' section in your account settings and choose a new plan. Changes will take effect immediately after confirmation.",
  },
  {
    question: "How do I deactivate my account?",
    answer:
      "To deactivate your account, please contact support at support@inspir-edu.com. Our team will process your request and confirm once your account has been deactivated.",
  },
  {
    question: "What should I do if I encounter technical issues?",
    answer:
      "If you encounter technical issues, please try clearing your browser cache, refreshing the page, or using a different browser. If the issue persists, contact our support team at support@inspir-edu.com.",
  },
];
const Support = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setErrors({
        ...errors,
        email: !/\S+@\S+\.\S+/.test(value),
      });
    } else {
      setErrors({
        ...errors,
        [name]: value.trim() === "",
      });
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.message.trim() !== ""
    );
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      await sendSupportEmail(formData);
      setEmailSent(true);
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      console.error("Failed to send support email:", error);
      toast.error("Failed to send support email. Please try again later.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Support & Contact Information
        </h1>
        <p className="text-xl text-gray-600">
          We're here to help. Get in touch with us or browse through our FAQs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Info & Form */}
        <div className="space-y-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <FaEnvelope className="text-[#1A73E8] text-xl" />
                <a
                  href="mailto:support@inspir-edu.com"
                  className="hover:text-[#1A73E8] transition-colors"
                >
                  support@inspir-edu.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <FaPhone className="text-[#1A73E8] text-xl" />
                <span>623-263-3992</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            {emailSent ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                Your message has been sent successfully! We'll get back to you
                soon.
              </div>
            ) : (
              <form onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#1A73E8]"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      Name is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#1A73E8]"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      Please enter a valid email
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent ${
                      errors.message
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#1A73E8]"
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      Message is required
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                    isFormValid()
                      ? "bg-[#1A73E8] hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column - FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  className="w-full py-4 flex justify-between items-center text-left"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                >
                  <span className="font-medium text-gray-900">
                    {item.question}
                  </span>
                  <FaChevronDown
                    className={`text-gray-400 transition-transform ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="pb-4 text-gray-600">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
