import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found. Please log in.</p>;

  // Role-based navigation
  const handleDashboardRedirect = () => {
    switch (user.role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "trainer":
        navigate("/trainer-dashboard");
        break;
      case "learner":
        navigate("/learner-dashboard");
        break;
      case "examinee": // ✅ Correct path for examinee
        navigate("/exam-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <p><strong>Username:</strong> {user.username || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Button Redirects Correctly */}
      <button
        onClick={handleDashboardRedirect}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default ProfilePage;
