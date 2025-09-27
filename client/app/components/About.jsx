import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section className="bg-white">
      <div className="py-16 px-5 md:px-10">
        <div className="animate-fade-in text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="block text-text-primary">The Story Behind</span>
            <span className="block text-gradient">The Digital Craftsman</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Where passion meets purpose, and technology transforms lives.
            <br />
            <span class="text-primary font-semibold">
              This is my journey of continuous learning and innovation.
            </span>
          </p>
        </div>

        <div className="py-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image & Quick Stats */}
            <div className="animate-slide-up">
              <div className="relative">
                <div className="aspect-square w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-card">
                  <Image
                    src="/profile.png"
                    width={100}
                    height={100}
                    alt="Philip Oyelegbin - Professional Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-accent text-white p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm opacity-90">Projects Delivered</div>
                </div>
              </div>
            </div>

            {/* Personal Story Content */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    Hello, I'm Philip Oyelegbin
                  </h2>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    A passionate digital craftsman who believes that great
                    technology should feel effortless. My journey began with a
                    simple fascination: how can we use code to solve real-world
                    problems and make people's lives better?
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    My Philosophy
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    I don't just write code, I architect solutions. Every
                    project is an opportunity to bridge the gap between complex
                    technology and meaningful business value. I believe in the
                    power of continuous learning, collaborative problem solving,
                    and building systems that scale with purpose.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Problem Solver
                  </span>
                  <span className="bg-accent-100 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    Continuous Learner
                  </span>
                  <span className="bg-secondary-200 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                    Team Player
                  </span>
                  <span className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Innovation Driven
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="py-10 px-5 md:px-10 bg-gradient-to-r from-primary to-primary-700 mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Get To Learn More About Me!</h2>
        <p className="text-xl text-primary-100 mb-8 leading-relaxed">
          From curious beginner to seasoned professional—every step has been a
          learning opportunity that shaped my approach to technology and
          problem-solving.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/experience"
            className="btn-secondary bg-white text-primary hover:bg-primary-50 px-8 py-4 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            My Experience
          </Link>
          <Link
            href="/skills"
            className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 w-full sm:w-auto text-center"
          >
            My Skills
          </Link>
          <Link
            href="/portfolio"
            className="btn-secondary bg-white text-primary hover:bg-primary-50 px-8 py-4 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            My Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
