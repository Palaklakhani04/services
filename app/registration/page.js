'use client'

import BackToTopStart from "../components/BackToTopStart";
import Offcanvas from "../components/Offcanvas";
import Registration from "../components/Registration";

export default function registration(){
    return(
        <div>
            <BackToTopStart />
                <Offcanvas />
                <Registration />
        </div>
    )
}