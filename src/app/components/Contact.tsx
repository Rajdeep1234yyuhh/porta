"use client";

import { Github, Linkedin, Mail, Twitter, Send } from "lucide-react";

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  return (
    <section
      id="contact"
      className={`py-12 min-h-screen flex items-center relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-200"
          }`}
        ></div>
        <div
          className={`absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-200"
          }`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <span
              className={`text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${
                isDarkMode
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-green-100 text-green-600 border border-green-200"
              }`}
            >
              Get In Touch
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p
            className={`text-sm md:text-base max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            Ready to start your next project? I&apos;m here to help bring your
            ideas to life.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info Card */}
          <div
            className={`p-8 rounded-2xl transition-all duration-300 border ${
              isDarkMode
                ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
                : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Contact Information
            </h3>

            {/* Email */}
            <a
              href="mailto:your@email.com"
              className={`flex items-center p-4 rounded-lg mb-4 transition-all duration-200 group ${
                isDarkMode
                  ? "hover:bg-gray-700/50"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div
                  className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                    isDarkMode ? "text-gray-500" : "text-slate-500"
                  }`}
                >
                  Email
                </div>
                <div
                  className={`font-medium ${
                    isDarkMode
                      ? "text-gray-300 group-hover:text-white"
                      : "text-slate-700 group-hover:text-slate-900"
                  }`}
                >
                  your@email.com
                </div>
              </div>
            </a>

            {/* Social Links */}
            <div className="mt-8">
              <h4
                className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Connect With Me
              </h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-white border-slate-200 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300 hover:shadow-lg"
                  } group`}
                >
                  <Github
                    className={`w-5 h-5 ${
                      isDarkMode
                        ? "text-gray-300 group-hover:text-white"
                        : "text-slate-600 group-hover:text-white"
                    }`}
                  />
                </a>
                <a
                  href="#"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-white border-slate-200 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300 hover:shadow-lg"
                  } group`}
                >
                  <Linkedin
                    className={`w-5 h-5 ${
                      isDarkMode
                        ? "text-gray-300 group-hover:text-white"
                        : "text-slate-600 group-hover:text-white"
                    }`}
                  />
                </a>
                <a
                  href="#"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-white border-slate-200 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300 hover:shadow-lg"
                  } group`}
                >
                  <Twitter
                    className={`w-5 h-5 ${
                      isDarkMode
                        ? "text-gray-300 group-hover:text-white"
                        : "text-slate-600 group-hover:text-white"
                    }`}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div
            className={`p-8 rounded-2xl border ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50"
                : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Available for Work
                </h4>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  Ready to collaborate
                </p>
              </div>
            </div>

            <p
              className={`mb-6 leading-relaxed ${
                isDarkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              I&apos;m currently available for freelance work and new
              opportunities. Let&apos;s discuss how I can help bring your vision
              to life.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {[
                "Quick turnaround time",
                "Modern, responsive designs",
                "Ongoing support & maintenance",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-slate-700"
                    }`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="mailto:your@email.com"
              className="group inline-flex items-center w-full justify-center px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start a Conversation
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
