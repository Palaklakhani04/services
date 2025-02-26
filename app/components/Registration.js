"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Registration() {

  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  console.log(name, 'name')

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
            <input type="text" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" required />
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="contact"><b>Contact Number</b></label>
            <input size="number" placeholder="Enter contact number" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength={10} required />
            <label htmlFor="address"><b>Address</b></label>
            <textarea name="address" placeholder="Enter Your Full Address " value={address} onChange={(e) => setAddress(e.target.value)} defaultValue={""} />
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="psw-confim"><b>Confirm Password</b></label>
            <input type="password" placeholder="confirm Password" name="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} required />
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