
export default function dashboard(){
    return(
        <div>
            <div>
            <div className="logo">
                        <a className="header-logo" href="/">
                            <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
                        </a>
                    </div>
  <div className="dash-heading">
    <h2>Dashboard</h2>
  </div>
  <section className="counter-section fix section-padding">
    <div className="container">
      <div className="row g-4">
        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
          <div className="counter-items">
            {/* <div class="icon">
                          <img src="assets/img/icon/12.svg" alt="img">
                      </div> */}
            <div className="content1">
              <h3>Up Coming Services</h3>                             
              <h2><span className="count">10</span></h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
          <div className="counter-items">
            {/* <div class="icon">
                          <img src="assets/img/icon/13.svg" alt="img">
                      </div> */}
            <div className="content1">
              <h3>Cancel Services</h3>
              <h2><span className="count">3</span></h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
          <div className="counter-items">
            {/* <div class="icon">
                          <img src="assets/img/icon/14.svg" alt="img">
                      </div> */}
            <div className="content1">
              <h3>Complete Services </h3>                             
              <h2><span className="count">100</span></h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
          <div className="counter-items">
            {/* <div class="icon">
                          <img src="assets/img/icon/15.svg" alt="img">
                      </div> */}
            <div className="content1">
              <h3>Total Service</h3>     
              <h2><span className="count">10,000</span></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
     </div>
    )
}