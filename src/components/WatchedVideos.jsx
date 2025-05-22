import React, { useEffect, useState } from "react";
import axios from "axios";

const WatchedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch watched videos from backend
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos/watched");
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching watched videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Recently Watched Videos</h2>

      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No watched videos available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {videos.map((video) => (
            <div key={video._id} className="flex justify-between items-center border-b py-3">
              <div>
                <p className="text-lg font-medium">{video.title}</p>
                <p className="text-gray-500 text-sm">
                  Duration: {video.duration} | Last Watched: {new Date(video.lastWatched).toLocaleDateString()}
                </p>
              </div>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Resume Watching
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchedVideos;
