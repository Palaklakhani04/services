"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function login() {
    const [message, setMessage] = useState()

    const [input, setInput] = useState({
        email:'',
        password:'',
    });

    const [validations, setValidations] = useState({
        email: false,
        password: false,
    });

    const handelInputs = (e) =>{
        setInput({...input, [e.target.name]:[e.target.value]});
        setValidations({...validations, [e.target.name]:false});
    }


    const router = useRouter()


    const handelLogin = async () => {

        if (!input.email) {
            setValidations({ ...validations, email: true });
            setMessage('Email is required.');
            return;
          }

          if (!input.password) {
            setValidations({ ...validations, password: true });
            setMessage('Password is required.');
            return;
          }

        const data = JSON.stringify(
            {
                email: input.email,
                password: input.password,
                usertype: 'admin'
            });

        try {
            const response = await axios.post('/api/admin-login', data)
            if (response.status === 200) {
                router.push('/admin/dashboard');
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
                            {message &&
                             <p className="text-[#ff5555] text-lg">{message}</p>
                            }
                            <hr />
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="email" value={input.email} onChange={handelInputs}  required />
                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handelInputs} required />
                            <button onClick={()=>handelLogin()} className="loginbtn">Login</button>
                            <hr />
                            <a href="/" className="centerhome">Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}