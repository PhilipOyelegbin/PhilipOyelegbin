import Image from "next/image";
import { Certificates } from "../../utils/data";

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
        {Certificates.map((cert, idx) => (
          <div
            key={idx}
            className="certification-card card text-center group hover:shadow-card-hover transition-all duration-400"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {cert.icon}
            </div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              {cert.name}
            </h3>
            <p className="text-secondary text-sm mb-3">{cert.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
