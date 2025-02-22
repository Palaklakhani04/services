export default function ContactSection(){
    return(
        <div>
           <div className="contact-section-12 section-padding">
  <div className="contact-image-2">
    <img src="assets/img/contact-2.jpg" alt="img" />
  </div>
  <div className="contact-wrapper-12">
    <div className="container">
      <div className="row">
        <div className="col-lg-6" />
        <div className="col-xl-6 col-lg-8">
          <div className="contact-content">
            <div className="section-title">
              <span className="wow fadeInUp"><img src="assets/img/icon/07.svg" alt="img" />Get in touch</span>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">Marketing for the digital age</h2>
            </div>
            <form action="#" id="contact-form" method="POST" className="mt-4 mt-md-0">
              <div className="row g-4">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                  <div className="form-clt">
                    <input type="text" name="name" id="name" placeholder="Your Name" />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                  <div className="form-clt">
                    <input type="text" name="email" id="email" placeholder="Email Address" />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                  <div className="form-clt">
                    <input type="text" name="phone" id="phone" placeholder="Phone number" />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                  <div className="form-clt">
                    <input type="text" name="subject" id="subject" placeholder="Subject" />
                  </div>
                </div>
                <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                  <div className="form-clt">
                    <textarea name="message" id="message" placeholder="Your Message" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                  <button type="submit" className="theme-btn">
                    submit here <i className="far fa-long-arrow-right" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}