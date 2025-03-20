"use client"


import BackToTopStart from "../components/BackToTopStart";
import Login from "../components/Login";
import MouseCursor from "../components/MouseCursor";
import Offcanvas from "../components/Offcanvas";

export default function login() {
    return (
        <div>
            <BackToTopStart />
            <MouseCursor />
            <Offcanvas />
            <Login />
        </div>
    );
}