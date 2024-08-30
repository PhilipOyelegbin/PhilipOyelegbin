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
        className='flex justify-center text-gray-800 gap-3 py-4'
      >
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
          }
        >
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
          }
        >
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
          }
        >
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
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#5000ca'
          fill-opacity='0.5'
          d='M0,96L18.5,101.3C36.9,107,74,117,111,117.3C147.7,117,185,107,222,128C258.5,149,295,203,332,208C369.2,213,406,171,443,165.3C480,160,517,192,554,186.7C590.8,181,628,139,665,144C701.5,149,738,203,775,202.7C812.3,203,849,149,886,144C923.1,139,960,181,997,208C1033.8,235,1071,245,1108,261.3C1144.6,277,1182,299,1218,272C1255.4,245,1292,171,1329,165.3C1366.2,160,1403,224,1422,256L1440,288L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z'
        ></path>
      </svg>
      <Projects />
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#5000ca'
          fill-opacity='0.5'
          d='M0,128L18.5,154.7C36.9,181,74,235,111,245.3C147.7,256,185,224,222,197.3C258.5,171,295,149,332,154.7C369.2,160,406,192,443,224C480,256,517,288,554,266.7C590.8,245,628,171,665,160C701.5,149,738,203,775,202.7C812.3,203,849,149,886,154.7C923.1,160,960,224,997,234.7C1033.8,245,1071,203,1108,160C1144.6,117,1182,75,1218,80C1255.4,85,1292,139,1329,160C1366.2,181,1403,171,1422,165.3L1440,160L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z'
        ></path>
      </svg>
      <Feedback />
      <Testimonial />
      <Footer />
    </main>
  );
};

export default Body;
