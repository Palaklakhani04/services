import Aboutbg from "../components/Aboutbg";
import AboutSection from "../components/AboutSection";
import BackToTopStart from "../components/BackToTopStart";


import FooterSection from "../components/FooterSection";
import Header from "../components/Header";

import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";


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
            
            <FooterSection />
        </div>
    );
}