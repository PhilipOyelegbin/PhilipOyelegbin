import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="grow">
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Testimonials />
    </main>
  );
}
