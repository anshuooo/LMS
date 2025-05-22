import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById, clearSelectedCourse } from "../redux/courseSlice";
import { useParams } from "react-router-dom";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { selectedCourse, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
    return () => {
      dispatch(clearSelectedCourse()); // Clear course details on unmount
    };
  }, [dispatch, courseId]);

  if (loading) return <p className="text-gray-600 text-center">Loading course details...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!selectedCourse) return <p className="text-gray-600 text-center">Course not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-60 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{selectedCourse.title}</h1>
      <p className="text-gray-700 mt-2">{selectedCourse.description}</p>
      <div className="mt-4">
        <p><strong>Lessons:</strong> {selectedCourse.duration?.lessonsCount}</p>
        <p><strong>Total Hours:</strong> {selectedCourse.duration?.totalHours}</p>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
