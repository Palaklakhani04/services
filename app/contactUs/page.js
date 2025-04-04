'use client'

import BackToTopStart from "../components/BackToTopStart";
import Contactbg from "../components/Contactbg";
// import ContactInfo from "../components/ContactInfo";
import ContactSec from "../components/ContactSec";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";

export default function Contactus(){
  return(
    <div>
      {/* <Preloader /> */}
        <BackToTopStart />
        <Offcanvas />
        <Header />
        <Searchwrap />
        <Contactbg />
        <ContactSec />
        <FooterSection />
    </div>
  );
}