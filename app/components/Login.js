"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()


    const handleLogin = async () => {

        const data = JSON.stringify(
            {
                email: email,
                password: password
            });

        try {
            const response = await axios.post('/api/login', data)
            if (response.status === 200) {
                router.push('/');
                console.log("Login Successful:", response.data);
            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            console.log('Error in login api', error)
        }

    }

    return (
        <div>
            <div className="registration">
                <div className="logo">
                    <a className="header-logo" href="/">
                        <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
                    </a>
                </div>
                <div>

                    <div className="container">
                        <h2 onClick={()=> navigate('/')} className="cursor-pointer">Login</h2>
                        <hr />
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <p>forget password <a href="/forgotpws">Reset password</a>.</p>
                        <button className="loginbtn" onClick={() => handleLogin()} >Login</button>
                        <p>New user<a href="/registration"> Registration</a>.</p>
                        <hr />
                        <a href="/" className="centerhome">Home</a>
                    </div>
                </div>
            </div>
        </div>

    )
}