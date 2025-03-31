import BackToTopStart from "../components/BackToTopStart";
import Contactbg from "../components/Contactbg";
// import ContactInfo from "../components/ContactInfo";
import ContactSec from "../components/ContactSec";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";

export default function ContactUs(){
  return(
    <div>
      {/* <Preloader /> */}
        <BackToTopStart />
        <MouseCursor />
        <Offcanvas />
        <Header />
        <Searchwrap />
        <Contactbg />
        <ContactSec />
        <FooterSection />
    </div>
  );
}