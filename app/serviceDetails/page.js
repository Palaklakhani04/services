import BackToTopStart from "../components/BackToTopStart";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";
import ServiceDetailsbg from "../components/ServiceDetailsbg";
import ServiceDetailsSection from "../components/ServiceDetailsSection";

export default function ServiceDetails(){
  return(
    <div>
        <BackToTopStart />
        <MouseCursor />
        <Offcanvas />
        <Header />
        <Searchwrap />
        <ServiceDetailsbg />
        <ServiceDetailsSection />
        <FooterSection />
    </div>
  );
}