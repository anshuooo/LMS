import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const CourseReview = () => {
  const { courseId } = useParams();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [review, setReview] = useState('');
  const [course, setCourse] = useState(null);

  // Fetch course details (optional)
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/reviews/${courseId}`, {
        rating,
        review,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      alert('Review submitted successfully!');
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Review submission failed:', error);
      alert('You may not be eligible to review this course.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Rate & Review Course</h2>
      {course && <p className="mb-2 text-lg text-gray-700">Course: {course.title}</p>}

      {/* Rating Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-3xl ${
              (hovered || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {/* Review Textarea */}
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        rows="4"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
};

export default CourseReview;
