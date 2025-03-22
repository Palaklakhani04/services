
import BackToTopStart from "../components/BackToTopStart";
import Dashboard from "../components/Dashboard";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";
import Searchwrap from "../components/Searchwrap";


export default function dashboard() {
    return (
        <div>
            <BackToTopStart />
            <MouseCursor />
            <Offcanvas />
            <Header />
            <Searchwrap />
            <Dashboard />
            <FooterSection />
        </div>
    );
}