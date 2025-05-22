import React, { useState } from 'react';
import axios from 'axios';

const MediaUpload = () => {
  const [media, setMedia] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!media) return;

    const formData = new FormData();
    formData.append('media', media);

    try {
      const res = await axios.post('http://localhost:3000/api/media/upload', formData);
      alert('Upload Success!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Upload Failed');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default MediaUpload;
