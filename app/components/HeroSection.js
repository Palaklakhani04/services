export default function HeroSection(){
    return(
        <div>
            <section className="hero-section fix hero-3">
  <div className="array-button">
    <button className="array-prev"><i className="fa-regular fa-arrow-left-long" /></button>
    <button className="array-next"><i className="fa-regular fa-arrow-right-long" /></button>
  </div>
  <div className="swiper hero-slider">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-image bg-cover" style={{backgroundImage: 'url("assets/img/hero/hero-4.jpg")'}}>
        </div>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-12">
              <div className="hero-content">
                <h1 data-animation="fadeInUp" data-delay="1.3s">
                  We Are Experts In <br /> Roof Repairs
                </h1>
                <div className="hero-button">
                  <a className="theme-btn" data-animation="fadeInUp" data-delay="1.5s" href="about.html">
                    Read More <i className="fa-regular fa-angles-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-slide">
        <div className="slider-image bg-cover" style={{backgroundImage: 'url("assets/img/hero/hero-5.jpg")'}}>
        </div>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-12">
              <div className="hero-content">
                <h1 data-animation="fadeInUp" data-delay="1.3s">
                  We Are Experts In <br /> Roof Repairs
                </h1>
                <div className="hero-button">
                  <a className="theme-btn" data-animation="fadeInUp" data-delay="1.5s" href="about.html">
                    Read More <i className="fa-regular fa-angles-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-slide">
        <div className="slider-image bg-cover" style={{backgroundImage: 'url("assets/img/hero/hero-6.jpg")'}}>
        </div>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-12">
              <div className="hero-content">
                <h1 data-animation="fadeInUp" data-delay="1.3s">
                  We Are Experts In <br /> Roof Repairs
                </h1>
                <div className="hero-button">
                  <a className="theme-btn" data-animation="fadeInUp" data-delay="1.5s" href="about.html">
                    Read More <i className="fa-regular fa-angles-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="swiper-dot-2">
      <div className="dot-2" />
    </div>
  </div>
</section>

        </div>
    )
}