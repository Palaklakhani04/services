'use client'

import BackToTopStart from "../components/BackToTopStart";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";
import Servicebg from "../components/Servicebg";
import ServiceSection from "../components/ServiceSection";

export default function Service(){
  return(
    <div>
       {/* <Preloader /> */}
        <BackToTopStart />
        <Offcanvas />
        <Header />
        <Searchwrap />
        <Servicebg />
        <ServiceSection />
        <FooterSection />
    </div>
  );
}