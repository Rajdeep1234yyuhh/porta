"use client";

import { Mail, Send } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
      className={`h-full flex flex-col justify-center overflow-hidden relative ${isDarkMode ? "bg-[#141414]" : "bg-slate-50"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15 ${isDarkMode ? "bg-transparent" : "bg-blue-200"}`} />
        <div className={`absolute -bottom-10 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 ${isDarkMode ? "bg-transparent" : "bg-purple-200"}`} />
      </div>

      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 w-full relative z-10 py-3">
        {/* Header */}
        <div className="text-center mb-4">
          <span className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-1.5 ${isDarkMode ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-100 text-green-600 border border-green-200"}`}>
            Get In Touch
          </span>
          <h2 className={`text-xl md:text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Together</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${isDarkMode ? "bg-[#1c1c1e] backdrop-blur-sm border-[#2a2a2a] hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10" : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"}`}>
            <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Contact Information</h3>

            <a
              href="mailto:kotoky10@gmail.com"
              className={`flex items-center p-2.5 rounded-lg mb-3 transition-all duration-200 group ${isDarkMode ? "hover:bg-[#242424]" : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"}`}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className={`text-[10px] font-medium uppercase tracking-wider mb-0.5 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>Email</div>
                <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"}`}>
                  kotoky10@gmail.com
                </div>
              </div>
            </a>

            <div>
              <h4 className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Connect With Me</h4>
              <div className="flex gap-2">
                {[
                  { href: "https://github.com/Rajdeep1234yyuhh", icon: <GithubIcon />, hoverClass: isDarkMode ? "hover:bg-[#2a2a2a] hover:border-blue-500/50" : "hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300" },
                  { href: "https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/", icon: <LinkedinIcon />, hoverClass: isDarkMode ? "hover:bg-[#2a2a2a] hover:border-blue-500/50" : "hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-300" },
                  { href: "https://www.instagram.com/radioactive_gigs/", icon: <InstagramIcon />, hoverClass: isDarkMode ? "hover:bg-[#2a2a2a] hover:border-pink-500/50" : "hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:border-pink-300" },
                ].map(({ href, icon, hoverClass }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border group ${isDarkMode ? "bg-[#242424] border-[#333]" : "bg-white border-slate-200"} ${hoverClass}`}
                  >
                    <span className={`${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-slate-600 group-hover:text-white"}`}>
                      {icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50" : "bg-gradient-to-br from-white to-slate-50 border-slate-200"}`}>
            <div className="flex items-center mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Available for Work</h4>
                <p className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Ready to collaborate</p>
              </div>
            </div>

            <p className={`text-xs mb-3 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
              I&apos;m currently available for freelance work and new opportunities. Let&apos;s discuss how I can help bring your vision to life.
            </p>

            <div className="space-y-1.5 mb-4">
              {["Quick turnaround time", "Modern, responsive designs", "Ongoing support & maintenance"].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="mailto:kotoky10@gmail.com"
              className={`group inline-flex items-center w-full justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
            >
              Start a Conversation
              <Send className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
