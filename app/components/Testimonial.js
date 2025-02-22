export default function Testimonial(){
    return(
        <div>
            <section className="testimonial-section fix">
  <div className="container">
    <div className="section-title text-center">
      <span className="justify-content-center wow fadeInUp"><img src="assets/img/icon/07.svg" alt="img" />Clients Testimonials</span>
      <h2 className="wow fadeInUp" data-wow-delay=".3s">What Our Customers Say About <br /> Our Services</h2>
    </div>
    <div className="swiper testimonial-slider">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="testimonial-card-items">
            <div className="client-img bg-cover" style={{backgroundImage: 'url("assets/img/testimonial/client-1.png")'}}>
              <div className="icon">
                <i className="fas fa-quote-right" />
              </div>
            </div>
            <p>
              It uses a dictionary of over 200 Latin words, combined with handful model tence structures, to generate Lorem Ipsum which lo reasonable. The gener Lorem Ipsum done
            </p>
            <div className="client-info">
              <span>Founder</span>
              <h3>Leslie Alexander</h3>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="testimonial-card-items">
            <div className="client-img bg-cover" style={{backgroundImage: 'url("assets/img/testimonial/client-2.png")'}}>
              <div className="icon">
                <i className="fas fa-quote-right" />
              </div>
            </div>
            <p>
              It uses a dictionary of over 200 Latin words, combined with handful model tence structures, to generate Lorem Ipsum which lo reasonable. The gener Lorem Ipsum done
            </p>
            <div className="client-info">
              <span>Founder</span>
              <h3>Albert Flores</h3>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="testimonial-card-items">
            <div className="client-img bg-cover" style={{backgroundImage: 'url("assets/img/testimonial/client-3.png")'}}>
              <div className="icon">
                <i className="fas fa-quote-right" />
              </div>
            </div>
            <p>
              It uses a dictionary of over 200 Latin words, combined with handful model tence structures, to generate Lorem Ipsum which lo reasonable. The gener Lorem Ipsum done
            </p>
            <div className="client-info">
              <span>Founder</span>
              <h3>Guy Hawkins</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
    )
}