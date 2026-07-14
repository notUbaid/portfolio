import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import ClientWork from "@/components/ClientWork/ClientWork";
import Achievements from "@/components/Achievements/Achievements";
import Experience from "@/components/Experience/Experience";
import Skills from "@/components/Skills/Skills";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <ClientWork />
      <Achievements />
      <Experience />
      <Skills />
      <Footer />
    </main>
  );
}
