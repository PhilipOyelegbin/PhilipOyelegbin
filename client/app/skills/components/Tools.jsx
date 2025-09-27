import { SkillsData } from "../../utils/data";

const Tools = () => {
  return (
    <section className="py-10 px-5 md:px-10 bg-secondary">
      {/* Frontend Development*/}
      <div className="skill-category mb-16">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-900">
              Frontend Development
            </h2>
            <p className="text-primary-100">
              Creating engaging user experiences with modern frameworks
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SkillsData.FrontendSkills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card card group hover:shadow-card-hover transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={skill.cover_image}
                  alt={skill.label + " logo"}
                  className="w-8 h-8 rounded object-cover"
                  width={100}
                  height={100}
                />
                <span className="text-sm font-semibold text-primary bg-primary-50 px-2 py-1 rounded">
                  {skill.label}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {skill.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Backend Development */}
      <div className="skill-category mb-16">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-900">
              Backend Development
            </h2>
            <p className="text-primary-100">
              Building robust server-side applications and APIs
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SkillsData.BackendSkills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card card group hover:shadow-card-hover transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={skill.cover_image}
                  alt={skill.label + " logo"}
                  className="w-8 h-8 rounded object-cover"
                  width={100}
                  height={100}
                />
                <span className="text-sm font-semibold text-primary bg-primary-50 px-2 py-1 rounded">
                  {skill.label}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {skill.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud & DevOps */}
      <div className="skill-category mb-16">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-900">
              Cloud & DevOps
            </h2>
            <p className="text-primary-100">
              Scalable infrastructure and deployment automation
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SkillsData.CloudSkills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card card group hover:shadow-card-hover transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={skill.cover_image}
                  alt={skill.label + " logo"}
                  className="w-8 h-8 rounded object-cover"
                  width={100}
                  height={100}
                />
                <span className="text-sm font-semibold text-primary bg-primary-50 px-2 py-1 rounded">
                  {skill.label}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {skill.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI & Automation */}
      <div className="skill-category mb-16">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-900">
              AI & Automation
            </h2>
            <p className="text-praimry-100">
              Intelligent solutions and process automation
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SkillsData.CloudSkills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card card group hover:shadow-card-hover transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={skill.cover_image}
                  alt={skill.label + " logo"}
                  className="w-8 h-8 rounded object-cover"
                  width={100}
                  height={100}
                />
                <span className="text-sm font-semibold text-primary bg-primary-50 px-2 py-1 rounded">
                  {skill.label}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {skill.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
