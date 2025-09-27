import { FaFacebook, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="py-10 md:h-screen flex justify-center items-center md:overflow-hidden inset-0 bg-gradient-to-br from-primary-50 via-background to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-pulse-slow"
        style={{ animationDelay: 1 + "s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-secondary-300/20 rounded-full animate-pulse-slow"
        style={{ animationDelay: 2 + "s" }}
      ></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6 text-text-primary">
              Digital <span className="text-gradient">Craftsman</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Transforming complex challenges into elegant solutions.
              <br />
              <span className="text-primary font-semibold">
                Where technical expertise meets business value.
              </span>
            </p>
          </div>

          {/* Skill Visualization */}
          <div
            className="animate-slide-up mb-12"
            style={{ animationDelay: 0.3 + "s" }}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="skill-badge bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Web Development
              </div>
              <div className="skill-badge bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                <span
                  className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"
                  style={{ animationDelay: 0.5 + "s" }}
                ></span>
                Cloud & DevOps
              </div>
              <div className="skill-badge bg-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <span
                  className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"
                  style={{ animationDelay: 1 + "s" }}
                ></span>
                AI Automation
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-5"
            style={{ animationDelay: 0.6 + "s" }}
          >
            <a
              href="https://wa.me/1234567890?text=Hi%20Alex,%20I'm%20interested%20in%20discussing%20a%20project"
              className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>Start a Project</span>
            </a>
            <a
              href="javascript:void(0)"
              id="download-cv"
              className="btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
// <section id="about" className="about-section">
//   <div className="text-white flex flex-col gap-4 text-center justify-center items-center md:w-1/2 mx-auto">
//     <h2 className="text-inherit lg:text-4xl">Hello! I'm Philip 👋</h2>

//     <p className="lg:text-xl font-light">
//       Highly skilled and versatile professional with expertise in{" "}
//       <strong>Frontend</strong>, <strong>Backend</strong>, and{" "}
//       <strong>Cloud Engineering</strong>. Currently working as a Customer
//       Support Officer, utilizing technical knowledge to provide top-notch
//       support and resolve complex issues.
//     </p>

//     <Link
//       href={process.env.CV_URI || "/"}
//       className="btn w-fit"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Check Resume
//     </Link>
//   </div>
// </section>
