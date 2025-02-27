"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Setpsw(){

  const router = useRouter();
  const [message, setMessage] = useState()

  const [input, setInput] = useState({
    newpassword: '',
    confirmpassword: '',
  });

  const [validations, setValidations] = useState({
 
    newpassword: false,
    confirmpassword: false,
  });

  const handelInputs = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setValidations({ ...validations, [e.target.name]: false });
  };



  const handleSubmit = async () => {

    if (!input.newpassword) {
      setValidations({ ...validations, newpassword: true });
      setMessage('Password is required.');
      return;
    }

    if (input.newpassword.length < 8) {
      setValidations({ ...validations, newpassword: true });
      setMessage('Enter Valid Password minimum 8 character.');
      return;
    }

    if (!(input.confirmpassword === input.newpassword)) {
      setValidations({ ...validations, confirmpassword: true });
      setMessage('Password Not Match.');
      return;
    }

    const data = JSON.stringify(
      {
        email: localStorage?.getItem('email'),
        newpassword: input.newpassword,
      });


    try {
      const response = await axios.post('/api/setpsw', data)
      if (response.status === 200) {
        // navigate('/dashboard')
        console.log(response, 'new password created sucessfully')
        router.push('/login');
      } else {
        console.log ('Something went wrong')
      }
    } catch (error) {
      console.log('Error in creating password', error)
    }
  }



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
      <h2>Set Password</h2>
      {message &&
              <p className="text-[#ff5555] text-lg">{message}</p>
            }
      <hr />
      <label htmlFor="new-psw"><b>New Password</b></label>
      <input type="password" placeholder="Enter New Password" name="newpassword" value={input.newpassword} onChange={handelInputs} required />
      <label htmlFor="confirm-psw"><b>Confirm Password</b></label>
      <input type="password" placeholder="Enter Confirm Password" name="confirmpassword" value={input.confirmpassword} onChange={handelInputs} required />
      <button onClick={() => handleSubmit()} className="loginbtn">Submit</button>
      <hr />
       <a href="/" className="centerhome">Home</a>
    </div>  
  </div>
</div>

        </div>
    )
}