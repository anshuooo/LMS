import { useState } from "react";
import axios from "axios";

const QuestionForm = ({ examId }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = async () => {
    if (!questionText || options.includes("") || !correctAnswer) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/exam/add-question/${examId}`, {
        questionText,
        options,
        correctAnswer,
      });

      setMessage("✅ Question added successfully!");
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } catch (err) {
      setMessage("❌ Error adding question");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Add a Question</h2>

      <label className="block mb-2 font-semibold text-gray-600">Question</label>
      <input
        type="text"
        className="w-full border px-3 py-2 mb-4 rounded"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {options.map((opt, i) => (
        <div key={i} className="mb-3">
          <label className="block text-sm font-medium text-gray-600">Option {i + 1}</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
          />
        </div>
      ))}

      <label className="block mt-4 font-semibold text-gray-600">Correct Answer</label>
      <select
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        <option value="">Select correct option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            Option {i + 1}: {opt}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddQuestion}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Add Question
      </button>

      {message && <p className="mt-3 text-sm text-center text-gray-700 font-semibold">{message}</p>}
    </div>
  );
};

export default QuestionForm;
