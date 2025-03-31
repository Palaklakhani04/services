"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState({
    title: "",
    description: "",
    price: "",
    filePath: "",
    features: [], // Added Features Array
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchService = async () => {
    try {
      const response = await axios.get(`/api/services/${id}`);
      console.log("Fetched Service:", response.data.services);
  
      const fetchedService = response.data.services;
  
      // Ensure features is always an array
      let formattedFeatures = [];
      if (fetchedService.features) {
        try {
          formattedFeatures = Array.isArray(fetchedService.features)
            ? fetchedService.features
            : JSON.parse(fetchedService.features);
        } catch (error) {
          console.error("Error parsing features:", error);
          formattedFeatures = [];
        }
      }
  
      setService({
        ...fetchedService,
        features: formattedFeatures, // Ensuring it's always an array
      });
    } catch (err) {
      console.error("Error fetching service:", err);
      setError("Service not found!");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  
  
  
  
  // Make sure it runs inside useEffect
  useEffect(() => {
    if (id) fetchService();
  }, [id]);
  

  const setFeature = (index, field, value) => {
    const updatedFeatures = [...service.features];
    updatedFeatures[index][field] = value;
    setService({ ...service, features: updatedFeatures });
  };

  const addFeature = () => {
    setService((prev) => ({
        ...prev,
        features: prev.features ? [...prev.features, { name: "", description: "" }] : [{ name: "", description: "" }],
    }));
  };

  const removeFeature = (index) => {
    setService({
      ...service,
      features: service.features.filter((_, i) => i !== index),
    });
  };

  // Handle Image Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as Base64
      reader.onloadend = () => {
        setSelectedFile(reader.result); // Store Base64 string in state
      };
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedService = {
      ...service,
      features: JSON.stringify(service.features), // Convert features to JSON
      file: selectedFile || service.filePath, // Send Base64 string OR keep old file path
    };
  
    console.log("🚀 Sending Data to API:", updatedService);
  
    try {
      const response = await axios.put(`/api/update-service/${id}`, updatedService, {
        headers: { "Content-Type": "application/json" }, // JSON headers
      });
  
      console.log("✅ API Update Response:", response.data);
      alert("Service updated successfully!");
      router.push("/admin/Service");
    } catch (err) {
      console.error("❌ Error updating service:", err.response?.data || err.message);
      alert("Failed to update service.");
    }
  };
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    // <div>
    //   <AdminDashboardLayout title={"Edit Service"} />
    // <div className="max-w-2xl mx-auto  p-8 bg-white shadow-lg rounded-lg ">
      
    //   <h2 className="text-2xl font-bold mb-6">Edit Service</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <input
    //       type="text"
    //       placeholder="Title"
    //       value={service.title}
    //       onChange={(e) => setService({ ...service, title: e.target.value })}
    //       className="w-full p-2 border text-black rounded-lg"
    //       required
    //     />
    //     <textarea
    //       placeholder="Description"
    //       value={service.description}
    //       onChange={(e) => setService({ ...service, description: e.target.value })}
    //       className="w-full p-2 border rounded-lg"
    //       required
    //     />
    //     <input
    //       type="number"
    //       placeholder="Price"
    //       value={service.price}
    //       onChange={(e) => setService({ ...service, price: e.target.value })}
    //       className="w-full p-2 border text-black rounded-lg"
    //       required
    //     />
    //     {/* Image Upload */}
    //     <input type="file" 
    //     onChange={handleFileChange} 
    //     className="w-full p-2 border text-black rounded-lg" />

    //     {/* Features Section */}
    //     <h3 className="text-base mt-2 font-semibold">Service Features</h3>
    //     {service?.features?.map((feature, index) => (
    //       <div key={index} className="flex gap-2">
    //         <input
    //           type="text"
    //           value={feature.name}
    //           onChange={(e) => setFeature(index, "name", e.target.value)}
    //           placeholder="Feature Title"
    //           className="flex-1 text-black p-2 border mt-3 rounded-md"
    //           required
    //         />
    //         <input
    //           type="text"
    //           value={feature.description}
    //           onChange={(e) => setFeature(index, "description", e.target.value)}
    //           placeholder="Feature Description"
    //           className="flex-1 text-black p-2 mt-3 border rounded-md"
    //           required
    //         />
    //         <button
    //           type="button"
    //           onClick={() => removeFeature(index)}
    //           className="bg-red-500 text-white px-3 py-1 mt-3 rounded-md hover:bg-red-600"
    //         >
    //           ✕
    //         </button>
    //       </div>
    //     ))}

    //     <button
    //       type="button"
    //       onClick={addFeature}
    //       className="w-full bg-blue-500 text-white px-3 mt-3 mb-3 py-2 rounded-md hover:bg-blue-600"
    //     >
    //       + Add More Feature
    //     </button>

    //     <button
    //       type="submit"
    //       className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
    //     >
    //       Save Changes
    //     </button>
    //   </form>
    // </div>
    // </div>
    <div>
    <AdminDashboardLayout title={"Edit Service"} />
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
    
    <div className="max-w-xl w-full p-5 bg-white shadow-md rounded-lg sm:p-7">
      <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        <input
          type="text"
          placeholder="Title"
          value={service.title}
          onChange={(e) => setService({ ...service, title: e.target.value })}
          className="w-full p-2 border text-black rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Description"
          value={service.description}
          onChange={(e) => setService({ ...service, description: e.target.value })}
          className="w-full p-2 border rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={service.price}
          onChange={(e) => setService({ ...service, price: e.target.value })}
          className="w-full p-2 border text-black rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border text-black rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <h3 className="text-sm sm:text-base mt-2 font-semibold">Service Features</h3>
        {service?.features?.map((feature, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              value={feature.name}
              onChange={(e) => setFeature(index, "name", e.target.value)}
              placeholder="Feature Title"
              className="flex-1 text-black p-2 border rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              value={feature.description}
              onChange={(e) => setFeature(index, "description", e.target.value)}
              placeholder="Feature Description"
              className="flex-1 text-black p-2 border rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 sm:px-3 sm:py-1.5"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="w-full bg-blue-500 text-white px-3 py-2 mt-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          + Add More Feature
        </button>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
  </div>
  

  );
}



