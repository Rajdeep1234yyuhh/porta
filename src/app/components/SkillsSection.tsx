"use client";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsSectionProps {
  isDarkMode: boolean;
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  isDarkMode,
  skills,
}) => {
  return (
    <section
      id="skills"
      className={`min-h-screen flex items-center py-12 relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-200"
          }`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-200"
          }`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span
              className={`text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${
                isDarkMode
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-blue-100 text-blue-600 border border-blue-200"
              }`}
            >
              Tech Stack
            </span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Technologies &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            Crafting exceptional digital experiences with modern tools and
            cutting-edge technologies
          </p>
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105 border ${
                isDarkMode
                  ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
                  : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>

              <div className="relative flex flex-col items-center text-center space-y-3">
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-700"
                      : "bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-50 group-hover:to-purple-50"
                  }`}
                >
                  <span className="text-3xl transition-all duration-300 group-hover:scale-110">
                    {skill.icon}
                  </span>
                </div>

                {/* Skill Name */}
                <h3
                  className={`text-sm font-bold transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-200 group-hover:text-white"
                      : "text-slate-700 group-hover:text-slate-900"
                  }`}
                >
                  {skill.name}
                </h3>

                {/* Expert Badge */}
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 group-hover:bg-green-500/30 group-hover:border-green-500/50"
                      : "bg-green-50 text-green-700 border border-green-200 group-hover:bg-green-100 group-hover:border-green-300"
                  }`}
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                  Expert
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tech Stack */}
        <div className="text-center">
          <h3
            className={`text-2xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {[
              "JavaScript",
              "HTML5",
              "CSS3",
              "Tailwind CSS",
              "Node.js",
              "MongoDB",
              "PostgreSQL",
              "Git",
              "Docker",
              "AWS",
              "Vercel",
              "Figma",
            ].map((tech) => (
              <div
                key={tech}
                className={`group px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isDarkMode
                    ? "bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                    : "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
