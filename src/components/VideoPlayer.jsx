import React from "react";

const VideoPlayer = ({ src }) => {
  return (
    <div className="video-container">
      <video controls className="w-60 h-40 rounded-lg shadow-lg">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
