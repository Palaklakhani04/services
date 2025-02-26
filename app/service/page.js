'use client'

import BackToTopStart from "../components/BackToTopStart";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";
import Servicebg from "../components/Servicebg";
import ServiceSection from "../components/ServiceSection";

export default function Service(){
  return(
    <div>
       {/* <Preloader /> */}
        <BackToTopStart />
        <MouseCursor />
        <Offcanvas />
        <Header />
        <Searchwrap />
        <Servicebg />
        <ServiceSection />
        <FooterSection />
    </div>
  );
}