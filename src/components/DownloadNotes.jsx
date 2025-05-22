import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

const DownloadNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notes from backend
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Download Study Materials</h2>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="text-lg font-medium">{note.title}</p>
                <p className="text-gray-500 text-sm">{note.format}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                onClick={() => handleDownload(note.fileUrl, note.title)}
              >
                <FaDownload /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadNotes;
