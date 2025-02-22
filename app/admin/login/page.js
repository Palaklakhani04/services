
import Login from "@/app/components/Login";

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
                    <form action="action_page.php">

                        <div className="container">
                            <h2>Login</h2>
                            <hr />
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="email" id="email" required />
                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
                            <p>forget password <a href="/forgotpws">Reset password</a>.</p>
                            <button type="submit" className="loginbtn">Login</button>
                            <p>New user<a href="/registration"> Registration</a>.</p>
                            <hr />
                            <a href="/" className="centerhome">Home</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}