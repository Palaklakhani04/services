"use client"
import BackToTopStart from "../components/BackToTopStart";
import Forgotpsw from "../components/Forgotpsw";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";

export default function login(){
    return(
        <div>
                    <BackToTopStart />
                        <MouseCursor />
                        <Offcanvas />
                        <Forgotpsw />

                </div>
    );
}