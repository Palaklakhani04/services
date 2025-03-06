export default function Header(){
    return(
        <div>
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
                    {/* <ul class="submenu has-homemenu">
                                          <li>
                                              <div class="homemenu-items">
                                                  <div class="homemenu">
                                                      <div class="homemenu-thumb">
                                                          <img src="assets/img/header/home-1.jpg" alt="img">
                                                          <div class="demo-button">
                                                              <a class='theme-btn' href='index.htm'>
                                                                  Demo Page
                                                              </a>
                                                          </div>
                                                      </div>
                                                      <div class="homemenu-content text-center">
                                                          <h4 class="homemenu-title">
                                                              Home 01
                                                          </h4>
                                                      </div>
                                                  </div>
                                                  <div class="homemenu">
                                                      <div class="homemenu-thumb mb-15">
                                                          <img src="assets/img/header/home-2.jpg" alt="img">
                                                          <div class="demo-button">
                                                              <a class='theme-btn' href='index-2.html'>
                                                                  Demo Page
                                                              </a>
                                                          </div>
                                                      </div>
                                                      <div class="homemenu-content text-center">
                                                          <h4 class="homemenu-title">
                                                              Home 02
                                                          </h4>
                                                      </div>
                                                  </div>
                                                  <div class="homemenu">
                                                      <div class="homemenu-thumb mb-15">
                                                          <img src="assets/img/header/home-3.jpg" alt="img">
                                                          <div class="demo-button">
                                                              <a class='theme-btn' href='index-3.html'>
                                                                  Demo Page
                                                              </a>
                                                          </div>
                                                      </div>
                                                      <div class="homemenu-content text-center">
                                                          <h4 class="homemenu-title">
                                                              Home 03
                                                          </h4>
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      </ul> */}
                  </li>
                  {/* <li class="has-dropdown active d-xl-none">
                                      <a class='border-none' href='team.html'>
                                      Home
                                      </a>
                                      <ul class="submenu">
                                          <li><a href='index.htm'>Home 01</a></li>
                                          <li><a href='index-2.html'>Home 02</a></li>
                                          <li><a href='index-3.html'>Home 03</a></li>
                                      </ul>
                                  </li> */}
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  {/* <li class="has-dropdown">
                                      <a href='news.html'>
                                          Pages
                                      </a>
                                      <ul class="submenu">
                                          <li><a href='project.html'>Projects</a></li>
                                          <li><a href='project-details.html'>Project Details</a></li>
                                          <li><a href='team.html'>Team</a></li>
                                          <li><a href='team-details.html'>Team Details</a></li>
                                          <li><a href='faq.html'>faq</a></li>
                                          <li><a href='coming-soon.html'>Coming Soon</a></li>
                                          <li><a href='404.html'>404 Page</a></li>
                                      </ul>
                                  </li> */}
                  <li>
                    <a href="/serviceDetails">
                      Services
                    </a>
                    <ul className="submenu">
                      <li><a href="/service">Services</a></li>
                      <li><a href="/serviceDetails">Service Details</a></li>
                    </ul>
                  </li>
                  {/* <li>
                                      <a href='news.html'>
                                          Blog
                                      </a>
                                      <ul class="submenu">
                                          <li><a href='news.html'>Blog Grid</a></li>
                                          <li><a href='news-details.html'>Blog Details</a></li>
                                      </ul>
                                  </li> */}
                  <li>
                    <a href="/contactUs">Contact Us</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* <div className="header-right d-flex justify-content-end align-items-center">
          <a href="#0" className="search-trigger search-icon"><i className="fal fa-search" /></a>
          <div className="header-button">
            <a className="theme-btn" href="contact.html">
              <span>
                Get a quote
                <i className="fa-regular fa-angles-right" />
              </span>
            </a>
          </div>
          <div className="header__hamburger d-xl-none my-auto">
            <div className="sidebar__toggle">
              <img src="assets/img/logo/bar.png" alt="img" />
            </div>
          </div>
        </div> */}
        <div>
  <div className="login">
    <a href="/login"><b>Login</b></a>
  </div>
  <div className="register">
    <a href="/registration"><b>Registration</b></a>
  </div>
</div>
      </div>
    </div>
  </div>
</header>

        </div>
    )

}