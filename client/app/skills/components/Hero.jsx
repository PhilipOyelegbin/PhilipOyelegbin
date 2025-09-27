"use client";
import { useEffect, useState } from "react";

const Hero = () => {
  const yearOfExperience = new Date().getFullYear() - 2021;
  const [projectCount, setProjectCount] = useState(0);

  async function getProjectCount() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/project`);
    if (!resp.ok) throw new Error("Failed to fetch project count");
    const data = await resp.json();
    setProjectCount(data.count);
  }

  useEffect(() => {
    getProjectCount();
  }, []);

  return (
    <section className="py-10 mt-10 md:h-screen flex justify-center items-center md:overflow-hidden inset-0 bg-gradient-to-br from-primary-50 via-background to-accent-50">
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
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center animate-pulse-slow">
        <svg
          className="w-8 h-8 text-primary"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div
        className="absolute top-32 right-20 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      >
        <svg
          className="w-7 h-7 text-secondary-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6">
              Technical <span className="text-gradient">Expertise</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Where technical mastery meets practical application.
              <br />
              <span className="text-primary font-semibold">
                Transforming complex challenges into elegant solutions.
              </span>
            </p>
          </div>

          {/* Quick Stats */}
          <div
            className="animate-slide-up grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center">
              <div
                className="text-3xl font-bold text-primary counter"
                data-target="15"
              >
                0
              </div>
              <div className="text-sm text-text-secondary">Technologies</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold text-accent counter"
                data-target="8"
              >
                0
              </div>
              <div className="text-sm text-text-secondary">Certifications</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold text-primary counter"
                data-target="50"
              >
                {projectCount}
              </div>
              <div className="text-sm text-text-secondary">Projects Built</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold text-accent counter"
                data-target="5"
              >
                {yearOfExperience}
              </div>
              <div className="text-sm text-text-secondary">
                Years Experience
              </div>
            </div>
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
