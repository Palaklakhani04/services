"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Link from "next/link";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import toast, { Toaster } from "react-hot-toast";

export default function addServices() {

  const router = useRouter();


  const [message, setMessage] = useState()

  const [input, setInput] = useState({
    title: '',
    myfile: null,
    description: '',
    price: '',

  });

  const [validations, setValidations] = useState({
    title: false,
    myfile: false,
    description: false,
    price: false,
  });

  const handleInputs = (e) => {
    const { name, value, type, files } = e.target;
    setInput({ ...input, [name]: type === "file" ? files[0] : value });
    setValidations({ ...validations, [name]: false });
  }

  const [features, setFeatures] = useState([{ name: "", description: "" }]);



  // Handle Feature Change
  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  // Add New Feature
  const addFeature = () => {
    setFeatures([...features, { name: "", description: "" }]);
  };

  // Remove Feature
  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  console.log(features, 'features')


  const handleAdd = async () => {

    if (!input.title) {
      setValidations({ ...validations, title: true });
      setMessage('Title is required.');
      return;
    }

    if (!input.myfile) {
      setValidations({ ...validations, myfile: true });
      setMessage('File is required.');
      return;
    }

    if (!input.description) {
      setValidations({ ...validations, description: true });
      setMessage('Description is required.');
      return;
    }

    if (!input.price) {
      setValidations({ ...validations, price: true });
      setMessage('Price is required.');
      return;
    }

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("myfile", input.myfile);
    formData.append("description", input.description);
    formData.append("features", JSON.stringify(features)); // ✅ Convert features to a JSON string before sending
    formData.append("price", input.price);

    try {
      const response = await axios.post('/api/addservices', formData)
      if (response.status === 200) {
        console.log("Service Added Successfully:", response.data);
        toast.success("Service Added Successfully");
        router.push('/admin/Service');
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log('Error in login api', error)
      toast.error('Error in login api')
      
    }

  }


  return (
    // <div>
    //   <div className="registration">
    //     <div className="logo">
    //       <a className="header-logo" href="/">
    //         <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
    //       </a>
    //     </div>
    //     <div>
    //       <div className="container">
    //         <h2>Add Service</h2>
    //         {message &&
    //           <p className="text-[#ff5555] text-lg">{message}</p>
    //         }
    //         <hr />
    //         <label htmlFor="title"><b>Title</b></label>
    //         <input type="text" placeholder="Enter Title" name="title" value={input.title} onChange={handelInputs} required />

    //         <label htmlFor="myfile"><b>Select a file</b></label>
    //         <input type="file" id="myfile" name="myfile" onChange={handelInputs} />

    //         <label htmlFor="description"><b>Description</b></label>
    //         <input type="text" placeholder="Enter description" name="description" value={input.description} onChange={handelInputs} required />
            



    //         <h3 className="text-base mt-2 font-semibold">Service Features</h3>

    //         {features.map((feature, index) => (
    //           <div key={index} className="flex gap-2">
    //             <input type="text" value={feature.name} onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
    //               placeholder="Feature Title" className="flex-1 text-black p-2 border mt-3 rounded-md" required />

    //             <input type="text" value={feature.description} onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
    //               placeholder="Feature Description" className="flex-1 text-black p-2 mt-3 border rounded-md" required />

    //             <button type="button" onClick={() => removeFeature(index)}
    //               className="bg-red-500 text-white px-3 py-1 mt-3 rounded-md hover:bg-red-600">
    //               ✕
    //             </button>
    //           </div>
    //         ))}

    //         <button type="button" onClick={addFeature}
    //           className="w-full bg-blue-500 text-white px-3 mt-3 mb-3 py-2 rounded-md hover:bg-blue-600">
    //           + Add More Feature
    //         </button>


    //         <label htmlFor="price"><b>Price</b></label>
    //         <input type="number" placeholder="Enter Price" name="price" value={input.price} onChange={handelInputs} required />
    //         <button onClick={() => handleAdd()} className="registerbtn rounded-md py-2 hover:bg-green-600">Add</button>
    //       </div>
    //     </div>
    //   </div>

    // </div>

<div>
  <AdminDashboardLayout title={'Add Services'} />
  <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-100 mt-10">
    <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-lg sm:max-w-xl">

      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <img src="/assets/img/logo/black-logo.svg" alt="logo" className="w-16 sm:w-20" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-4">Add Service</h2>
        {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
      </div>
      <Toaster />

      {/* Service Title */}
      <div className="relative mb-4">
        <label className="absolute left-3 -top-2 text-xs sm:text-sm text-gray-500 bg-white px-1">
          Service Title
        </label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={handleInputs}
          className="w-full px-3 py-2 sm:py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter Service Title"
          required
        />
      </div>

      {/* Service Description */}
      <div className="relative mb-4">
        <label className="absolute left-3 -top-2 text-xs sm:text-sm text-gray-500 bg-white px-1">
          Service Description
        </label>
        <input
          type="text"
          name="description"
          value={input.description}
          onChange={handleInputs}
          className="w-full px-3 py-2 sm:py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter Service Description"
          required
        />
      </div>

      {/* Upload File */}
      <div className="relative mb-4">
        <label className="absolute left-3 -top-2 text-xs sm:text-sm text-gray-500 bg-white px-1">Upload Image</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          onChange={handleInputs}
          className="w-full px-3 py-3 sm:py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Service Features */}
      <h3 className="text-sm sm:text-base font-semibold mt-2">Service Features</h3>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full">
          <input
            type="text"
            value={feature.name}
            onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
            placeholder="Feature Title"
            className="flex-1 text-black p-2 border mt-3 rounded-md w-full sm:w-auto"
            required
          />
          <input
            type="text"
            value={feature.description}
            onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
            placeholder="Feature Description"
            className="flex-1 text-black p-2 border mt-3 rounded-md w-full sm:w-auto"
            required
          />
          <button
            type="button"
            onClick={() => removeFeature(index)}
            className="bg-red-500 text-white px-3 py-2 mt-3 rounded-md hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addFeature}
        className="w-full bg-blue-500 text-white px-3 mt-3 mb-3 py-2 rounded-md hover:bg-blue-600"
      >
        + Add More Feature
      </button>

      {/* Service Price */}
      <div className="relative mb-4">
        <label className="absolute left-3 -top-2 text-xs sm:text-sm text-gray-500 bg-white px-1">Price</label>
        <input
          type="number"
          name="price"
          value={input.price}
          onChange={handleInputs}
          className="w-full px-3 py-2 sm:py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter Price"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAdd}
        className="w-full py-2 sm:py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg transition hover:bg-green-600"
      >
        Add Service
      </button>

      <hr className="my-4" />

      <Link href="/admin/Service" className="flex flex-col items-center text-sm sm:text-base hover:text-blue-600">
        ← Back to Services
      </Link>

    </div>
  </div>
</div>


  );
}