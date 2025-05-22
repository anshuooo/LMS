import React from "react";

const CourseProgress = ({ courses }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Enrolled Courses</h2>
      {courses.map((course) => (
        <div key={course.title}>
          <p>{course.title} - {course.progress}% completed</p>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseProgress;
