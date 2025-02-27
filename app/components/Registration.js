"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EMAIL_REGEX } from "../utils/constants";


export default function Registration() {

  const router = useRouter();

  const [message, setMessage] = useState()

  const [input, setInput] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    otp: '',
    password: '',
    confirmpassword: '',
  });

  const [validations, setValidations] = useState({
    name: false,
    email: false,
    mobile: false,
    address: false,
    password: false,
    confirmpassword: false,
  });

  const handelInputs = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setValidations({ ...validations, [e.target.name]: false });
  };



  const handleRegister = async () => {

    if (!input.name) {
      setValidations({ ...validations, name: true });
      setMessage('Name is required.');
      return;
    }

    if (!input.email) {
      setValidations({ ...validations, email: true });
      setMessage('Email is required.');
      return;
    }
    if (!EMAIL_REGEX.test(input.email)) {
      setValidations({ ...validations, email: true });
      setMessage('Please enter valid email address.');
      return;
    }

    if (!input.mobile) {
      setValidations({ ...validations, mobile: true });
      setMessage('Mobile number is required.');
      return;
    }

    if (!input.address) {
      setValidations({ ...validations, address: true });
      setMessage('Address is required.');
      return;
    }

    if (!input.password) {
      setValidations({ ...validations, password: true });
      setMessage('Password is required.');
      return;
    }

    if (input.password.length < 8) {
      setValidations({ ...validations, password: true });
      setMessage('Enter Valid Password minimum 8 character.');
      return;
    }

    if (!(input.confirmpassword === input.password)) {
      setValidations({ ...validations, confirmpassword: true });
      setMessage('Password Not Match.');
      return;
    }

    const data = JSON.stringify(
      {
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        address: input.address,
        otp: '',
        password: input.password
      });


    try {
      const response = await axios.post('/api/register', data)
      if (response.status === 200) {
        // navigate('/dashboard')
        console.log(response, 'register-response')
        router.push('/login');
      } else {
        console.log('Something went wrong')
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
            <p>Please fill this form to create an account.</p>
            {message &&
              <p className="text-[#ff5555] text-lg">{message}</p>
            }
            <hr />
            <label htmlFor="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Full Name" value={input.name} onChange={handelInputs} name="name" id="name" required />
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" value={input.email} onChange={handelInputs} required />
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