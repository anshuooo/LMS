import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    certificationAvailable: false,
    duration: {
      totalHours: 0,
      lessonsCount: 0,
    },
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("duration.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        duration: {
          ...prev.duration,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("price", formData.price);
      form.append("certificationAvailable", formData.certificationAvailable);
      form.append("duration", JSON.stringify(formData.duration));
      if (thumbnail) form.append("thumbnail", thumbnail);
      if (video) form.append("video", video);

      const token = localStorage.getItem("token");
      const res = await axios.post("/api/courses", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Course Created!");
      navigate(`/courses/${res.data._id}`); 
      console.log(res.data);
    } catch (err) {
      console.error("❌ Error creating course:", err.response?.data || err.message);
      alert("Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">🎓 Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Course title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the course..."
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <input
              name="category"
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
              placeholder="e.g. Programming"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Price (₹)</label>
            <input
              name="price"
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="certificationAvailable"
              onChange={handleChange}
              className="h-5 w-5 text-blue-600"
            />
            <span className="font-medium">Certificate Available</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Total Hours</label>
            <input
              name="duration.totalHours"
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
              placeholder="e.g. 12"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Lessons Count</label>
            <input
              name="duration.lessonsCount"
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
              placeholder="e.g. 10"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Course Preview Video</label>
          <input
            type="file"
            accept="video/*"
            className="w-full"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "⏳ Creating..." : "🚀 Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
