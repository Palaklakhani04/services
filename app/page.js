import Image from "next/image";
import Header from "./components/Header";
import Searchwrap from "./components/Searchwrap";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import FooterSection from "./components/FooterSection";
import Preloader from "./components/Preloader";

import BackToTopStart from "./components/BackToTopStart";
import MouseCursor from "./components/MouseCursor";
import Offcanvas from "./components/Offcanvas";
import ContactSec from "./components/ContactSec";


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
    <ServiceSection />
    <ContactSec />
    <FooterSection />
  </div>
  );
}
