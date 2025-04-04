"use client"
import BackToTopStart from "../components/BackToTopStart";
import Forgotpsw from "../components/Forgotpsw";
import Offcanvas from "../components/Offcanvas";

export default function login(){
    return(
        <div>
                    <BackToTopStart />
                        <Offcanvas />
                        <Forgotpsw />

                </div>
    );
}