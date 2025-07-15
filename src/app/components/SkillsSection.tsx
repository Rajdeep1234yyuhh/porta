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
      className={`min-h-screen flex items-center py-12 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Technologies & Expertise
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Modern tools and frameworks I use to build exceptional digital
            solutions
          </p>
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`group p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-600 hover:from-blue-900/30 hover:to-indigo-900/30 border-gray-600 hover:border-blue-700"
                  : "bg-gradient-to-br from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 border-slate-200 hover:border-blue-200"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 ${
                    isDarkMode ? "bg-gray-600" : "bg-white"
                  }`}
                >
                  <span className="text-2xl">{skill.icon}</span>
                </div>
                <div className="space-y-2">
                  <h3
                    className={`text-sm font-bold transition-colors duration-300 ${
                      isDarkMode
                        ? "text-white group-hover:text-blue-300"
                        : "text-slate-900 group-hover:text-blue-900"
                    }`}
                  >
                    {skill.name}
                  </h3>
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                    Expert
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tech Stack */}
        <div className="text-center">
          <h3
            className={`text-xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
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
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-default ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
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
