"use client";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceSectionProps {
  isDarkMode: boolean;
  services: Service[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  isDarkMode,
  services,
}) => {
  return (
    <section
      id="services"
      className={`py-12 sm:py-16 relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-pink-500" : "bg-pink-200"
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
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-2 border-blue-400/30"
                  : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-300"
              }`}
            >
              What I Offer
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <p
            className={`text-sm md:text-base max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            How I can help bring your digital vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            // Different gradient colors for each card
            const gradients = [
              "from-blue-500 to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-600",
              "from-purple-500 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-600",
              "from-orange-500 to-red-500 group-hover:from-orange-600 group-hover:to-red-600",
            ];
            const borderGradients = [
              "group-hover:border-blue-500/50 group-hover:shadow-blue-500/30",
              "group-hover:border-purple-500/50 group-hover:shadow-purple-500/30",
              "group-hover:border-orange-500/50 group-hover:shadow-orange-500/30",
            ];
            const hoverColors = [
              isDarkMode
                ? "group-hover:text-blue-300"
                : "group-hover:text-blue-700",
              isDarkMode
                ? "group-hover:text-purple-300"
                : "group-hover:text-purple-700",
              isDarkMode
                ? "group-hover:text-orange-300"
                : "group-hover:text-orange-700",
            ];

            return (
              <div
                key={index}
                className={`group relative text-center p-6 rounded-2xl transition-all duration-300 border-2 hover:scale-[1.05] ${
                  isDarkMode
                    ? `bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:shadow-2xl ${
                        borderGradients[index % 3]
                      }`
                    : `bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-2xl ${
                        borderGradients[index % 3]
                      }`
                }`}
              >
                {/* Icon */}
                <div
                  className={`relative inline-flex items-center justify-center w-20 h-20 mb-5 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl bg-gradient-to-br ${
                    gradients[index % 3]
                  }`}
                >
                  <div className="text-white text-3xl">{service.icon}</div>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isDarkMode
                      ? `text-white ${hoverColors[index % 3]}`
                      : `text-slate-900 ${hoverColors[index % 3]}`
                  }`}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  {service.description}
                </p>

                {/* Decorative corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${
                    gradients[index % 3]
                  } opacity-10 rounded-bl-full transition-opacity duration-300 group-hover:opacity-20`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
