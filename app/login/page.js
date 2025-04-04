"use client"


import BackToTopStart from "../components/BackToTopStart";
import Login from "../components/Login";
import Offcanvas from "../components/Offcanvas";

export default function login() {
    return (
        <div>
            <BackToTopStart />
            <Offcanvas />
            <Login />
        </div>
    );
}