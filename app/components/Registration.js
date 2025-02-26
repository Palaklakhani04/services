"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Registration() {

  const router = useRouter();

  const [input, setInput] = useState({
    name:'',
    email:'',
    mobile:'',
    address:'',
    password:'',
    confirmpassword:'',
  });

  const [validations, setValidations] = useState({
    name:false,
    email:false,
    mobile:false,
    address:false,
    password:false,
    confirmpassword:false,
  })

  const handleRegister = async () => {

    const data = JSON.stringify(
      {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        otp: '',
        password: password
      });


    try {
      const response = await axios.post('/api/register', data)
      if (response.status === 200) {
        // navigate('/dashboard')
        console.log(response, 'register-response')
        router.push('/login');
      } else {
        console.log ('Something went wrong')
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
            <h2>Register</h2>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label htmlFor="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Full Name" value={input.name} onChange={handelInputs} name="name" id="name" required />
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={input.email} onChange={handelInputs} required />
            <label htmlFor="contact"><b>Contact Number</b></label>
            <input size="number" placeholder="Enter contact number" name="mobile" value={input.mobile} onChange={handelInputs} maxLength={10} required />
            <label htmlFor="address"><b>Address</b></label>
            <textarea name="address" placeholder="Enter Your Full Address " value={input.address} onChange={handelInputs} defaultValue={""} />
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handelInputs} required />
            <label htmlFor="psw-confim"><b>Confirm Password</b></label>
            <input type="password" placeholder="confirm Password" name="confirmpassword" value={input.confirmpassword} onChange={handelInputs} required />
            <button onClick={() => handleRegister()} className="registerbtn">Register</button>
            <p>Already have an account? <a href="/login">login</a>.</p>
            <hr />
            <a href="/" className="centerhome">Home</a>
          </div>
        </div>
      </div>

    </div>
  )
}