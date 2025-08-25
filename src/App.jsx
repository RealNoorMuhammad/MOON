import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background from "./components/Background";

import Marquee from "./components/Marquee";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Background />
      <NavBar />
      <Hero />
      < Marquee/>
      <About />
      <Features />
     < Marquee/>
      <Contact />
      
      <Footer />
    </main>
  );
}

export default App;
