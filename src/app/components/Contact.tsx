"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface ContactProps {
  isDarkMode: boolean;
}
const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  return (
    <section
      id="contact"
      className={`py-20 text-white ${
        isDarkMode ? "bg-gray-900" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? I&apos;m here to help bring your
            ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:your@email.com"
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-6 h-6 mr-3" />
                your@email.com
              </a>
              <div className="flex space-x-4 mt-8">
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h4 className="text-xl font-semibold mb-6">
                Ready to start a project?
              </h4>
              <p className="text-gray-300 mb-6">
                I&apos;m currently available for freelance work and new
                opportunities. Let&apos;s discuss how I can help bring your
                vision to life.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Quick turnaround time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Modern, responsive designs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Ongoing support & maintenance</span>
                </div>
              </div>
              <a
                href="mailto:your@email.com"
                className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
