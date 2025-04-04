"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";

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

  const handleInputs = (e) => {
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
        toast.success('Password created sucessfully')
        console.log(response, 'new password created sucessfully')
        router.push('/login');
      } else {
        console.log ('Something went wrong')
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log('Error in creating password', error)
    }
  }



    return(


<div className="flex items-center justify-center min-h-screen p-6">
<div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
    {/* Header */}
    <div className="flex flex-col items-center mb-6">
        <img src="/assets/img/logo/logo1.png" alt="logo" className="w-18 h-12" />
        <h2 className="text-xl font-bold text-gray-800">Set Password</h2>
        <p className="text-gray-500 text-sm text-center mt-2">
            Create a new password for your account.
        </p>
    </div>
    <Toaster />


    {/* Display Error or Success Message */}
    {message && (
        <p className={`text-sm text-center mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
        </p>
    )}

    {/* New Password Input */}
    <div className="relative mb-4">
        <input
            type="password"
            name="newpassword"
            placeholder="Enter New Password"
            value={input.newpassword}
            onChange={handleInputs}
            required
            className="peer w-full px-3 py-2 border rounded-lg text-black  focus:outline"
        />
        <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
            New Password
        </label>
    </div>

    {/* Confirm Password Input */}
    <div className="relative mb-6">
        <input
            type="password"
            name="confirmpassword"
            placeholder="Enter Confirm Password"
            value={input.confirmpassword}
            onChange={handleInputs}
            required
            className="peer w-full px-3 py-2 border rounded-lg text-black  focus:outline"
        />
        <label className="absolute left-3 -top-2 text-sm text-gray-500 bg-white px-1">
            Confirm Password
        </label>
    </div>

    {/* Submit Button */}
    <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
    >
        Submit
    </button>

    {/* Divider */}
    <hr className="my-6" />

    {/* Back to Home Link */}
    <div className="text-center">
        <a href="/" className="text-blue-600 hover:underline font-medium">
            Back to Home
        </a>
    </div>
</div>
</div>
    );
}