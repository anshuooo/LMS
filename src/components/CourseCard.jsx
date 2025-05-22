import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ title, description, image, id }) => {
  const navigate = useNavigate();

  // fallback image if no image is provided
  const fallbackImage = "https://via.placeholder.com/300x200";

  return (
    <div
      onClick={() => navigate(`/courses/${id}`)}
      className="cursor-pointer border rounded-xl shadow hover:shadow-lg transition p-4 bg-white"
    >
      <img
        src={image || fallbackImage}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {description?.slice(0, 100)}...
      </p>
    </div>
  );
};

export default CourseCard;
