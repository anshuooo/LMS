import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ExamineeProfile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found. Please log in.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Examinee Profile</h2>
      <div className="p-4 border border-gray-300 rounded-lg">
        <p><strong>Username:</strong> {user.username || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone || "Not Added"}</p>
        <p><strong>Organization:</strong> {user.organization || "N/A"}</p>
        <p className="text-red-600">⚠ Examinees cannot enroll in courses.</p>
      </div>
    </div>
  );
};

export default ExamineeProfile;
