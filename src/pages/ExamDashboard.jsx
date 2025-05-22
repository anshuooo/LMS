import { useState } from "react";
import axios from "axios";
import QuestionForm from "../pages/QuestionForm";

const ExamDashboard = () => {
  const [code, setCode] = useState("");
  const [subject, setSubject] = useState("");
  const [createdExam, setCreatedExam] = useState(null);

  const handleCreateExam = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/exam/create", {
        code,
        subject,
        createdBy: "trainer123", // Replace with actual user ID
      });
      setCreatedExam(data);
    } catch (err) {
      console.error(err);
      alert("Error creating exam");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {!createdExam ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Create Exam</h2>
          <input
            type="text"
            placeholder="Secret Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border px-3 py-2 w-full"
          />
          <button
            onClick={handleCreateExam}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Exam
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Questions for: {createdExam.subject}</h2>
          <QuestionForm examId={createdExam._id} />
        </div>
      )}
    </div>
  );
};

export default ExamDashboard;
