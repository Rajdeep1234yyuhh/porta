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
const ProjectSection: React.FC<ServiceSectionProps> = ({
  isDarkMode,
  services,
}) => {
  return (
    <section
      id="services"
      className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Services
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            How I can help bring your digital vision to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                {service.icon}
              </div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProjectSection;
