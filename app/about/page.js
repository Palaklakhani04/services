import Aboutbg from "../components/Aboutbg";
import AboutSection from "../components/AboutSection";
import BackToTopStart from "../components/BackToTopStart";
import CounterSection from "../components/CounterSection";
import CtaContact from "../components/CtaContact";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import MarqueSection from "../components/MarqueSection";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";
import TeamSection from "../components/TeamSection";
import Testimonial from "../components/Testimonial";
import WorkProcess from "../components/WorkProcess";

export default function About() {
    return (
        <div>
            <BackToTopStart />
            <MouseCursor />
            <Offcanvas />
            <Header />
            <Searchwrap />
            <Aboutbg />
            <AboutSection />
            <MarqueSection />
            <CtaContact />
            <WorkProcess />
            <TeamSection />
            <Testimonial />
            <CounterSection />
            <FooterSection />
        </div>
    );
}