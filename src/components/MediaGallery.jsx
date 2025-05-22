import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MediaGallery = () => {
  const [mediaList, setMediaList] = useState([]);

  const fetchMedia = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/media');
      console.log("Media List:", res.data); // 👈 DEBUG
      setMediaList(res.data); // or res.data.media if nested
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const deleteMedia = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/media/delete/${id}`);
      setMediaList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div>
      <h2>📂 Uploaded Media</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {mediaList.map((media) => (
          <div key={media._id}>
            {media.type === 'image' ? (
              <img src={media.url} alt="uploaded-img" width="200" />
            ) : (
              <video width="200" controls poster={media.thumbnail || ''}>
                <source src={media.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <button onClick={() => deleteMedia(media._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
