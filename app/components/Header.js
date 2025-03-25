'use client'

import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";


export default function Header() {

  const router = useRouter()

  const Logout = () => {
    localStorage?.clear();
    router.push('/');

  }
  return (
    <div>
      <Toaster />
      <header id="header-sticky" className="header-2 style-2">
        <div className="container">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="logo">
                <a className="header-logo" href="/">
                  <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
                </a>
              </div>
              <div className="header-left">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        <li className="has-dropdown active menu-thumb">
                          <a href="/" target="_self">
                            Home
                          </a>
                         
                        </li>
                      
                        <li>
                          <a href="/about">About Us</a>
                        </li>
                        
                        <li>
                          <a href="/service">
                            Services
                          </a>
                          <ul className="submenu">
                            <li><a href="/service">Services</a></li>
                            <li><a href="/serviceDetails">Service Details</a></li>
                          </ul>
                        </li>
                       
                        <li>
                          <a href="/contactUs">Contact Us</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
        
              {localStorage?.getItem('token') ?
                <div className="login">
                  <a href="/dashboard"><b>Dashboard</b></a>
                  <p className="cursor-pointer" onClick={() => Logout()}>Logout</p>
                </div>
                :
                <div>
                  <div className="login">
                    <a href="/login"><b>Login</b></a>
                  </div>
                  <div className="register">
                    <a href="/registration"><b>Registration</b></a>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </header>

    </div>
  )

}