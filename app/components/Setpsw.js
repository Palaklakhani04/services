export default function Setpsw(){
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
      <h2>Set Password</h2>
      <hr />
      <label htmlFor="new-psw"><b>New Password</b></label>
      <input type="password" placeholder="Enter New Password" name="new-psw" id="new-psw" required />
      <label htmlFor="confirm-psw"><b>Confirm Password</b></label>
      <input type="password" placeholder="Enter Confirm Password" name="confirm-psw" id="confirm-psw" required />
      <button type="submit" className="loginbtn">Submit</button>
      <hr />
                        <a href="/" className="centerhome">Home</a>
    </div>  
  </form>
</div>

        </div>
    )
}