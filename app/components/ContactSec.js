export default function ContactSec(){
    return(
        <div>
            <div className="contact-section-22 section-padding">
  <div className="container">
    <div className="contact-wrapper-11">
      <div className="row g-4 justify-content-between">
        <div className="col-lg-5">
          <div className="contact-content">
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              We would love to talk about <br /> you&nbsp;amazing ideas
            </h2>
            <p className="wow fadeInUp" data-wow-delay=".5s">
              Mauris non dignissim purus, ac commodo diam. Donec sitamet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellusnulla, sollicitudin at euismod nec.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="contact-form-area">
            <form action="contact.php" id="contact-form" method="POST">
              <div className="row g-4">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                  <div className="form-clt">
                    <input type="text" name="name" id="name" placeholder="Enter Name" />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                  <div className="form-clt">
                    <input type="text" name="email" id="email21" placeholder="Enter Email" />
                  </div>
                </div>
                <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                  <div className="form-clt">
                    <textarea name="message" id="message" placeholder="Enter Message" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                  <button type="submit" className="theme-btn ">
                    Send Message<i className="fa-solid fa-arrow-right-long" />
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