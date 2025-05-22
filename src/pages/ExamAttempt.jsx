import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamAttemptPage = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/exam/questions/${code}`);
        setQuestions(data.questions);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };

    fetchQuestions();
  }, [code]);

  const handleOptionSelect = (qIndex, option) => {
    if (isSubmitted) return; // Disable after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        Attempt Exam: {code}
      </h1>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500">No questions found.</p>
      ) : (
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {index + 1}. {q.questionText}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((opt, i) => {
                  const isCorrect = opt === q.correctAnswer;
                  const isSelected = selectedAnswers[index] === opt;

                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(index, opt)}
                      disabled={isSubmitted}
                      className={`flex items-center gap-3 py-2 px-4 rounded-lg border transition-all duration-200 text-left
                        ${
                          isSubmitted
                            ? isCorrect
                              ? "bg-green-100 border-green-500 text-green-800"
                              : isSelected
                              ? "bg-red-100 border-red-500 text-red-700"
                              : "bg-white text-gray-500 border-gray-300"
                            : isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                        }`}
                    >
                      <span className="font-bold">{optionLabels[i]}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {isSubmitted && (
                <p className="mt-3 text-sm text-gray-600">
                  ✅ Correct Answer: <span className="font-semibold">{q.correctAnswer}</span><br />
                  📝 Your Answer:{" "}
                  <span className={`font-semibold ${selectedAnswers[index] === q.correctAnswer ? "text-green-600" : "text-red-600"}`}>
                    {selectedAnswers[index] || "Not Attempted"}
                  </span>
                </p>
              )}
            </div>
          ))}

          {!isSubmitted && (
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="mt-8 bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-lg"
              >
                Submit Exam
              </button>
            </div>
          )}

          {isSubmitted && (
            <div className="text-center mt-10">
              <h2 className="text-2xl font-bold text-blue-700">
                🎉 Your Score: {score} / {questions.length}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {score === questions.length
                  ? "Perfect! Well done! 🏆"
                  : score >= questions.length / 2
                  ? "Good job! Keep practicing 👍"
                  : "Don't worry! Try again! 💪"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamAttemptPage;
