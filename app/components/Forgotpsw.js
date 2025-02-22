export default function Forgotpsw(){
    return(
        <div>
            <div className="registration">
            <div className="logo">
          <a className="header-logo" href="/">
            <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
          </a>
        </div>
  <form action="action_page.php">
    <div className="container">
      <h2>Forget Password</h2>
      <hr />
      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email" required />
      <button type="submit" className="loginbtn">Send OTP</button>
      <hr />
                        <a href="/" className="centerhome">Home</a>
    </div>  
  </form>
</div>

        </div>
    );
}