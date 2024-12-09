import { lazy, useState, useTransition } from "react";
import About from "./About";
import Education from "./Education";
import Feedback from "./Feedback";
import Footer from "./Footer";
import Nav from "./Nav";
import Projects from "./CloudProjects";
import Testimonial from "./Testimonial";
import { Skeleton } from "./Skeleton";

const Skills = lazy(() => import("./Skills"));
const Experience = lazy(() => import("./Experience"));

const Body = () => {
  const [isPending, startTransition] = useTransition();
  const [toggle, setToggle] = useState({
    showEducation: true,
    showSkill: false,
    showExperience: false,
  });

  return (
    <main>
      <Nav />
      <About />
      <div
        id='qualifications'
        className='mt-12 flex justify-center text-gray-800 gap-3 py-4'>
        <p
          role='tab'
          className={`tab-btn ${
            toggle.showEducation === true && "bg-purple-700 text-slate-200"
          }`}
          onClick={() =>
            setToggle({
              showEducation: true,
              showSkill: false,
              showExperience: false,
            })
          }>
          Education
        </p>
        <p
          role='tab'
          className={`tab-btn ${
            toggle.showSkill === true && "bg-purple-700 text-slate-200"
          }`}
          onClick={() =>
            startTransition(() =>
              setToggle({
                showEducation: false,
                showSkill: true,
                showExperience: false,
              })
            )
          }>
          Skills
        </p>
        <p
          role='tab'
          className={`tab-btn ${
            toggle.showExperience === true && "bg-purple-700 text-slate-200"
          }`}
          onClick={() =>
            startTransition(() =>
              setToggle({
                showEducation: false,
                showSkill: false,
                showExperience: true,
              })
            )
          }>
          Experience
        </p>
      </div>
      <div className='flex flex-wrap gap-3'>
        {isPending &&
          Array(4)
            .fill(0)
            .map((d, index) => <Skeleton key={index} />)}
      </div>
      {toggle.showEducation && <Education />}
      {toggle.showSkill && <Skills />}
      {toggle.showExperience && <Experience />}
      <Projects />
      <Feedback />
      <Testimonial />
      <Footer />
    </main>
  );
};

export default Body;
