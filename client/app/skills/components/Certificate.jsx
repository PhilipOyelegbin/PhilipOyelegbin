import Image from "next/image";
import { SkillsData } from "../../utils/data";

const Certificate = () => {
  return (
    <section className="py-10 px-5 md:px-10 bg-surface">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary-900 mb-4">
          Professional Certifications
        </h2>
        <p className="text-xl text-secondary max-w-3xl mx-auto">
          Validated expertise through industry-recognized certifications and
          continuous learning
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* AWS Certification */}
        <div className="certification-card card text-center group hover:shadow-card-hover transition-all duration-400">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            AWS Solutions Architect
          </h3>
          <p className="text-secondary text-sm mb-3">Associate Level</p>
        </div>

        {/* Google Cloud Certification */}
        <div className="certification-card card text-center group hover:shadow-card-hover transition-all duration-400">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-accent"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Google Cloud Architect
          </h3>
          <p className="text-secondary text-sm mb-3">Professional Level</p>
        </div>

        {/* Docker Certification */}
        <div className="certification-card card text-center group hover:shadow-card-hover transition-all duration-400">
          <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-secondary-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Docker Certified
          </h3>
          <p className="text-secondary text-sm mb-3">Associate Level</p>
        </div>

        {/* MongoDB Certification */}
        <div className="certification-card card text-center group hover:shadow-card-hover transition-all duration-400">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-9900 mb-2">
            MongoDB Developer
          </h3>
          <p className="text-secondary text-sm mb-3">Associate Level</p>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
