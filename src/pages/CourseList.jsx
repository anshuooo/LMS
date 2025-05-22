import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/courseSlice";
import CourseCard from "../components/CourseCard";

function CourseList() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <p className="text-gray-600 text-center">Loading courses...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            key={course._id || course.id}
            id={course._id || course.id}
            title={course.title}
            description={course.description}
            image={course.thumbnailUrl || "https://via.placeholder.com/300x200"} // fallback if no image
          />
        ))
      ) : (
        <p className="text-gray-600 text-center col-span-full">No courses available.</p>
      )}
    </div>
  );
}

export default CourseList;
