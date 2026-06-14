import Navbar from "@/components/Navbar";
import EasterEgg from "@/components/EasterEgg";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Building from "@/components/sections/Building";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <EasterEgg />
      <main>
        <Hero />
        <About />
        <Building />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
