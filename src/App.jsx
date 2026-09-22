import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import About from './components/About';
import Expertise from './components/Expertise';
import Cases from './components/Cases';
import Experience from './components/Experience';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Nav />
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <Expertise />
      <Cases />
      <Experience />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  );
}

export default App;
