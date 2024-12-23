"use client";
import { useState } from "react";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import WebProjects from "../components/WebProjects";
import CloudProjects from "../components/CloudProjects";
import Feedback from "../components/Feedback";
import Testimonial from "../components/Testimonial";
import QuickChat from "../components/QuickChat";

export default function Home() {
  const [toggle, setToggle] = useState({
    showEducation: true,
    showSkill: false,
    showExperience: false,
  });

  const [toggleProjects, setToggleProjects] = useState({
    showWebProjects: true,
    showCloudProjects: false,
  });

  return (
    <article>
      <About />
      <div
        id='qualifications'
        className='flex justify-center text-gray-800 gap-3 pt-10'>
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
            setToggle({
              showEducation: false,
              showSkill: true,
              showExperience: false,
            })
          }>
          Skills
        </p>
        <p
          role='tab'
          className={`tab-btn ${
            toggle.showExperience === true && "bg-purple-700 text-slate-200"
          }`}
          onClick={() =>
            setToggle({
              showEducation: false,
              showSkill: false,
              showExperience: true,
            })
          }>
          Experience
        </p>
      </div>
      {toggle.showEducation && <Education />}
      {toggle.showSkill && <Skills />}
      {toggle.showExperience && <Experience />}
      <div
        id='projects'
        className='flex justify-center text-gray-800 gap-3 pt-10'>
        <p
          role='tab'
          className={`tab-btn ${
            toggleProjects.showWebProjects === true &&
            "bg-purple-700 text-slate-200"
          }`}
          onClick={() =>
            setToggleProjects({
              showWebProjects: true,
              showCloudProjects: false,
            })
          }>
          Web Projects
        </p>
        <p
          role='tab'
          className={`tab-btn ${
            toggleProjects.showCloudProjects === true &&
            "bg-purple-700 text-slate-200"
          }`}
          onClick={() =>
            setToggleProjects({
              showWebProjects: false,
              showCloudProjects: true,
            })
          }>
          Cloud Projects
        </p>
      </div>
      {toggleProjects.showWebProjects && <WebProjects />}
      {toggleProjects.showCloudProjects && <CloudProjects />}
      <Feedback />
      <Testimonial />
      <QuickChat />
    </article>
  );
}
