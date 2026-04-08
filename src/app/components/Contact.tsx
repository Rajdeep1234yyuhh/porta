"use client";

import { Mail, Send } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  return (
    <section
      id="contact"
      className={`h-full py-12 sm:py-16 relative overflow-y-auto ${
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
        <div className="text-center mt-10 mb-10">
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
              href="mailto:kotoky10@gmail.com"
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
                  kotoky10@gmail.com
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
                  href="https://github.com/Rajdeep1234yyuhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-white border-slate-200 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300 hover:shadow-lg"
                  } group`}
                >
                  <span
                    className={`w-5 h-5 ${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-slate-600 group-hover:text-white"}`}
                  >
                    <GithubIcon />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-white border-slate-200 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300 hover:shadow-lg"
                  } group`}
                >
                  <span
                    className={`w-5 h-5 ${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-slate-600 group-hover:text-white"}`}
                  >
                    <LinkedinIcon />
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/radioactive_gigs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20"
                      : "bg-white border-slate-200 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:border-pink-300 hover:shadow-lg"
                  } group`}
                >
                  <span
                    className={`${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-slate-600 group-hover:text-white"}`}
                  >
                    <InstagramIcon />
                  </span>
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
              className={`group inline-flex items-center w-full justify-center px-7 py-3.5 rounded-lg font-medium transition-all duration-200 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
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
