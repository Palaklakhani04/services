export default function CtaContact(){
    return(
        <div>
            <section className="cta-contact-section style-2 fix section-padding">
  <div className="container">
    <div className="cta-contact-wrapper">
      <div className="row g-4 justify-content-between align-items-center">
        <div className="col-xl-6 col-lg-6">
          <div className="cta-contact-content">
            <div className="section-title">
              <span className="text-white wow fadeInUp"><img src="assets/img/icon/08.svg" alt="img" />Get Free Consultancy </span>
              <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">Get Free Or Call Us For Consultancy</h2>
            </div>
            <h3 className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s"><a href="tel:+012345678900">+0123 45678 900</a></h3>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6">
          <div className="contact-into-items">
            <form action="#" id="contact-form" method="POST">
              <div className="row g-4">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                  <div className="form-clt">
                    <input type="text" name="name" id="name" placeholder="Full Name" />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                  <div className="form-clt">
                    <input type="text" name="email" id="email12" placeholder="Email" />
                  </div>
                </div>
                <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
                  <button type="submit" className="theme-btn">
                    Send Message <i className="fa-regular fa-angles-right" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
    )
}