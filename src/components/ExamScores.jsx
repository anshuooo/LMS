import React, { useEffect, useState } from "react";
import axios from "axios";

const ExamScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch exam scores from backend
    const fetchScores = async () => {
      try {
        const response = await axios.get("/api/exams/scores");
        setScores(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam scores:", error);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Exam Scores</h2>

      {loading ? (
        <p>Loading scores...</p>
      ) : scores.length === 0 ? (
        <p>No exam scores available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Exam</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Total Marks</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((exam) => (
                <tr key={exam._id} className="border-b">
                  <td className="p-3">{exam.subject}</td>
                  <td className="p-3">{exam.score}</td>
                  <td className="p-3">{exam.totalMarks}</td>
                  <td
                    className={`p-3 font-semibold ${
                      exam.score >= exam.passingMarks ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {exam.score >= exam.passingMarks ? "Passed" : "Failed"}
                  </td>
                  <td className="p-3">{new Date(exam.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExamScores;
