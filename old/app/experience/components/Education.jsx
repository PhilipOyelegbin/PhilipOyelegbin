import { EducationData } from "../../utils/data";

const Education = () => {
  return (
    <section id="timeline" className="py-10 px-5 md:px-10 bg-surface">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Education Timeline
        </h2>
        <p className="text-xl text-primary-900 max-w-3xl mx-auto">
          A journey of continuous learning, and growth.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-border"></div>
          {/* Timeline Items */}
          <div className="space-y-12">
            {EducationData.map((education, idx) => (
              <div
                key={idx}
                className={`relative flex items-center ${education.flex}`}
              >
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                <div className={`ml-16 md:ml-0 md:w-1/2 ${education.pad}`}>
                  <div className="card hover:shadow-card-hover transition-all duration-400">
                    <div className="flex items-center justify-between mb-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-text-secondary text-sm">
                        {education.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {education.certificate}
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      {education.institution}
                    </p>
                    {/* <p className="text-text-secondary mb-4">
                      {education.summary}
                    </p> */}
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-surface text-text-secondary px-2 py-1 rounded text-xs">
                        {education.skills[0]}
                      </span>
                      <span className="bg-surface text-text-secondary px-2 py-1 rounded text-xs">
                        {education.skills[1]}
                      </span>
                      <span className="bg-surface text-text-secondary px-2 py-1 rounded text-xs">
                        {education.skills[2]}
                      </span>
                      <span className="bg-surface text-text-secondary px-2 py-1 rounded text-xs">
                        {education.skills[3]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
