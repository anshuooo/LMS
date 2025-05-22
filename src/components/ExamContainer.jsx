import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExamContainer = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/exam/all");
      setExams(data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  const handleNavigate = (code) => {
    navigate(`/dashboard/Learner/exam/${code}`);
  };

  // ✅ Delete exam handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/exam/${id}`);
      setExams((prev) => prev.filter((exam) => exam._id !== id));
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Available Exams</h2>

      {exams.length === 0 ? (
        <p className="text-center text-gray-600">No exams available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between relative"
            >
              {/* ❌ Delete Button */}
              <button
                onClick={() => handleDelete(exam._id)}
                className="absolute top-2 right-2 text-red-600 font-bold text-lg hover:text-red-800"
                title="Delete Exam"
              >
                ×
              </button>

              <div>
                <h3 className="text-lg font-semibold text-gray-700">{exam.subject}</h3>
                <p className="text-sm text-gray-500">Code: {exam.code}</p>
              </div>
              <button
                onClick={() => handleNavigate(exam.code)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamContainer;
