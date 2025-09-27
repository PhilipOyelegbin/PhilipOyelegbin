const Hero = () => {
  const yearOfExperience = new Date().getFullYear() - 2021;

  return (
    <section className="py-10 mt-10 md:h-screen flex justify-center items-center md:overflow-hidden inset-0 bg-gradient-to-br from-primary-50 via-background to-accent-50">
      {/* <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 via-background to-accent-50 overflow-hidden"> */}
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
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6">
              Professional <span className="text-gradient">Journey</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              {yearOfExperience} years of continuous growth, innovation, and
              technical excellence.
              <br />
              <span className="text-primary font-semibold">
                From junior developer to technical expert.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
