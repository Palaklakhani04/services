"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Setpsw(){

  const router = useRouter();

  const [newpassword, setNewpassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  const handleSubmit = async () => {

    const data = JSON.stringify(
      {
        email: localStorage?.getItem('email'),
        newpassword: newpassword,
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
      <hr />
      <label htmlFor="new-psw"><b>New Password</b></label>
      <input type="password" placeholder="Enter New Password" name="new-psw" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} required />
      <label htmlFor="confirm-psw"><b>Confirm Password</b></label>
      <input type="password" placeholder="Enter Confirm Password" name="confirm-psw" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} required />
      <button onClick={() => handleSubmit()} className="loginbtn">Submit</button>
      <hr />
       <a href="/" className="centerhome">Home</a>
    </div>  
  </div>
</div>

        </div>
    )
}