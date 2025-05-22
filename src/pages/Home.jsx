import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import lms from "../assets/lms.jpg";
import Testimonials from "./Testimonials";
import ExamContainer from "../components/ExamContainer";

// ✅ Video Card Component
const VideoCard = ({ video }) => {
  return (
    <div className="relative group shadow rounded-md overflow-hidden">
      {/* Thumbnail overlay */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-all">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video */}
      <video
        src={video.videoUrl}
        controls
        muted
        className="w-full h-56 object-cover"
      />

      <div className="p-2">
        <h3 className="font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-500">{video.description}</p>
      </div>
    </div>
  );
};

function Home() {
  const [videos, setVideos] = useState([]);

  // ✅ Fetch videos from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Videos:", data);
        setVideos(data);
      })
      .catch(err => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Welcome to the LMS
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2">
          <img src={lms} alt="LMS" className="rounded-xl shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Learn, Grow, and Succeed with Our LMS
          </h2>
          <p className="text-gray-600 mt-2">
            Our Learning Management System (LMS) provides high-quality courses on web development, programming, and backend technologies.
          </p>
        </div>
      </div>

      {/* ✅ Video Section */}
      <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">🎥 Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <motion.div
              key={video._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">Loading videos...</p>
        )}
      </div>

      {/* Exams & Testimonials */}
      <ExamContainer />
      <Testimonials />
    </div>
  );
}

export default Home;
