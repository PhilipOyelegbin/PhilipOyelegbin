import Certifications from "./components/features/Certifications";
import Contact from "./components/features/Contact";
import Experience from "./components/features/Experience";
import Hero from "./components/features/Hero";
import Projects from "./components/features/Projects";
import Skills from "./components/features/Skills";
import Testimonials from "./components/features/Testimonials";

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
