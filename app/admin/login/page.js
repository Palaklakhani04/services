


export default function login() {
    return (
        <div>
            <div>
                <div className="registration">
                    <div className="logo">
                        <a className="header-logo" href="/">
                            <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
                        </a>
                    </div>
                    <div>

                        <div className="container">
                            <h2>Admin Login</h2>
                            <hr />
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="email" id="email" required />
                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
                            <label htmlFor="usertype"><b>User Type</b></label>
                            <input type="usertype" placeholder="Enter Password" name="usertype" id="psw" required />
                            <button type="submit" className="loginbtn">Login</button>
                            <hr />
                            <a href="/" className="centerhome">Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}