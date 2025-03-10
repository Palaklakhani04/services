"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await axios.get(`/api/services/${id}`);
      setService(response.data.services);
    } catch (err) {
      setError("Service not found!");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/update-service/${id}`, service);
      alert("Service updated successfully!");
      router.push("/admin/Service");
    } catch (err) {
      alert("Failed to update service.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={service.title}
          onChange={(e) => setService({ ...service, title: e.target.value })}
          className="w-full p-2 border text-black rounded-lg"
          required
        />
        <textarea
          placeholder="Description"
          value={service.description}
          onChange={(e) => setService({ ...service, description: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={service.price}
          onChange={(e) => setService({ ...service, price: e.target.value })}
          className="w-full p-2 border text-black rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={service.filePath}
          onChange={(e) => setService({ ...service, filePath: e.target.value })}
          className="w-full p-2 border text-black rounded-lg"
        />

        {/* Features Section */}
        <h3 className="text-base mt-2 font-semibold">Service Features</h3>
        {service?.features?.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={feature.name}
              onChange={(e) => setFeature(index, "name", e.target.value)}
              placeholder="Feature Title"
              className="flex-1 text-black p-2 border mt-3 rounded-md"
              required
            />
            <input
              type="text"
              value={feature.description}
              onChange={(e) => setFeature(index, "description", e.target.value)}
              placeholder="Feature Description"
              className="flex-1 text-black p-2 mt-3 border rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="bg-red-500 text-white px-3 py-1 mt-3 rounded-md hover:bg-red-600"
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

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
