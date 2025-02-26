export default function Otpverify(){
    return(
        <div>
            <div className="registration">
            <div className="logo">
          <a className="header-logo" href="/">
            <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
          </a>
        </div>
  <div>
    <div className="container">
      <h2>OTP Verify</h2>
      <hr />
      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" className="email" id="email" disabled />
      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" className="email" id="email1" required />
      <input size="number" placeholder="Enter OTP" name="otp" className="otp" maxLength={6} required />
      <button type="submit" className="loginbtn">Submit</button>
      <hr />
        <a href="/" className="centerhome">Home</a>
    </div>  
  </div>
</div>

        </div>
    )
}