import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [learner, setLearner] = useState({
    name: "",
    role: "",
    profilePic: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("learner"));
    if (userData) {
      setLearner(userData);
    } else {
      navigate("/edit-profile");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLearner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("learner", JSON.stringify(learner));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Edit Profile</h2>

        <label className="block mb-2 text-gray-700">Name</label>
        <input type="text" name="name" value={learner.name} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label className="block mb-2 text-gray-700">Role</label>
        <input type="text" name="role" value={learner.role} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-md" required />

        <label className="block mb-2 text-gray-700">Profile Picture URL</label>
        <input type="text" name="profilePic" value={learner.profilePic} onChange={handleChange} className="w-full px-4 py-2 mb-6 border rounded-md" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
