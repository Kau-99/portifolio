import Navbar        from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import Projects       from "@/components/Projects";
import Services       from "@/components/Services";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
