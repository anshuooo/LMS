import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCertificate,
  FaBookOpen,
  FaEdit,
  FaComments,
  FaDownload,
  FaStar,
  FaQuestionCircle,
} from "react-icons/fa";

const enrolledCourses = [
  {
    id: 1,
    title: "React Basics",
    progress: 50,
    completed: false,
    courseId: { _id: "6615a0f9d66b2cd54321abcd" },
  },
  {
    id: 2,
    title: "Node.js Advanced",
    progress: 100,
    completed: true,
    courseId: { _id: "6615a1b2d66b2cd51234efgh" },
  },
];


const LearnerDashboard = () => {
  const navigate = useNavigate();
  const [learner, setLearner] = useState({ _id: "", name: "", role: "", profilePic: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("learner"));
    if (userData) {
      setLearner(userData);
    } else {
      navigate("/learner-dashboard");
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-white">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome back, {learner.name || "Learner"}! 👋
        </h1>
        <p className="text-gray-600 text-lg">Let’s continue your learning journey today.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 mb-12">
        <img
          src={learner.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">{learner.name || "Learner"}</h2>
          <p className="text-gray-600 capitalize">{learner.role || "Learner Role"}</p>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-500 rounded-lg transition duration-200"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Enrolled Courses</h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                <div className="relative w-full bg-gray-200 h-3 rounded-full mb-2">
                  <div
                    className={`h-full rounded-full ${course.progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Progress: <span className="font-bold">{course.progress}%</span>
                </p>
              </div>

              <div className="space-y-2">
              {course.completed && (
  <button
    onClick={() =>
      window.open(
        `http://localhost:3000/api/certificates/generate/${learner._id}/${course.courseId?._id || course.id}`,
        "_blank"
      )
    }
    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-all"
  >
    <FaCertificate /> Generate Certificate
  </button>
)}



 
  <Link
    to={`/course/${course.id}`}
    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all"
  >
    <FaBookOpen /> Continue Learning
  </Link>


 <Link to={`/course/${course.id}/exam`} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium">
                  <FaQuestionCircle /> Take Exam
                </Link>

                <Link to={`/course/${course.id}/materials`} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 font-medium">
                  <FaDownload /> Download Materials
                </Link>

                <Link to={`/course/${course.id}/discussion`} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 font-medium">
                  <FaComments /> Q&A Forum
                </Link>

                <Link to={`/course/${course.id}/CourseReview`} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 font-medium">
                  <FaStar /> Rate & Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
