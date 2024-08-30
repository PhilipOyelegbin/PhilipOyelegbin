import Image from "next/image";
import { SkillsData } from "../utils/data";

const Skills = () => {
  return (
    <section className='skill-container'>
      <div>
        <h4>Frontend</h4>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-5'>
          {SkillsData.FrontendSkills?.map((skill, index) => {
            return (
              <figure
                className='flex items-center gap-3 py-1 px-3 rounded-xl border border-gray-100 hover:shadow-md hover:shadow-gray-500'
                key={index}
              >
                <Image
                  src={skill.cover_image || ""}
                  loading='lazy'
                  width={50}
                  height={50}
                  className='w-6 h-6'
                  alt='tool icon'
                />
                <figcaption>
                  <h3 className='text-sm text-center my-2'>
                    {skill.label || ""}
                  </h3>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div>
        <h4>Backend</h4>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-5'>
          {SkillsData.BackendSkills?.map((skill, index) => {
            return (
              <figure
                className='flex items-center gap-3 py-1 px-3 rounded-xl border border-gray-100 hover:shadow-md hover:shadow-gray-500'
                key={index}
              >
                <Image
                  src={skill.cover_image || ""}
                  width={50}
                  height={50}
                  loading='lazy'
                  className='w-6 h-6'
                  alt='tool icon'
                />
                <figcaption>
                  <h3 className='text-sm text-center my-2'>
                    {skill.label || ""}
                  </h3>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div>
        <h4>Cloud</h4>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-5'>
          {SkillsData.CloudSkills?.map((skill, index) => {
            return (
              <figure
                className='flex items-center gap-3 py-1 px-3 rounded-xl border border-gray-100 hover:shadow-md hover:shadow-gray-500'
                key={index}
              >
                <Image
                  src={skill.cover_image || ""}
                  width={50}
                  height={50}
                  loading='lazy'
                  className='w-6 h-6'
                  alt='tool icon'
                />
                <figcaption>
                  <h3 className='text-sm text-center my-2'>
                    {skill.label || ""}
                  </h3>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div>
        <h4>Others</h4>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-5'>
          {SkillsData.OtherSkills?.map((skill, index) => {
            return (
              <figure
                className='flex items-center gap-3 py-1 px-3 rounded-xl border border-gray-100 hover:shadow-md hover:shadow-gray-500'
                key={index}
              >
                <Image
                  src={skill.cover_image || ""}
                  width={50}
                  height={50}
                  loading='lazy'
                  className='w-6 h-6'
                  alt='tool icon'
                />
                <figcaption>
                  <h3 className='text-sm text-center my-2'>
                    {skill.label || ""}
                  </h3>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
