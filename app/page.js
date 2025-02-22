import Image from "next/image";
import Header from "./components/Header";
import Searchwrap from "./components/Searchwrap";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CounterSection from "./components/CounterSection";
import ServiceSection from "./components/ServiceSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import Preloader from "./components/Preloader";
import BackToTopStart from "./components/BackToTopStart";
import MouseCursor from "./components/MouseCursor";
import Offcanvas from "./components/Offcanvas";


export default function Home() {
  return (
  <div>
    {/* <Preloader /> */}
    <BackToTopStart />
    <MouseCursor />
    <Offcanvas />
    <Header />
    <Searchwrap />
    <HeroSection />
    <AboutSection />
    <CounterSection />
    <ServiceSection />
    <ContactSection />
    <FooterSection />
  </div>
  );
}
