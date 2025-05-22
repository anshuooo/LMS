import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ setEmail, setPassword, handleLogin, email, password, loading, error, localError }) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 text-center">
      <h2 className="text-xl font-semibold mb-4">LMS Login</h2>
      {localError && <p className="text-red-500">{localError}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg" />
      <button onClick={handleLogin} className="w-full bg-black text-white py-2 px-4 rounded-lg mt-2" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

const Signup = ({ username, setUsername, email, setEmail, password, setPassword, role, setRole, handleSignup, loading, error, success }) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 text-center">
      <h2 className="text-xl font-semibold mb-4">LMS Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg" />
      <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg">
        <option value="learner">Learner</option>
        <option value="examinee">Examinee</option>
        <option value="trainer">Trainer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup} className="w-full bg-black text-white py-2 px-4 rounded-lg mt-2" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showSignup, setShowSignup] = useState(false);

  // Shared states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const [success, setSuccess] = useState(null);
  const [localError, setLocalError] = useState(null);

  const handleLogin = async () => {
    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem("learner", JSON.stringify(user));
      navigate("/dashboard");
      localStorage.setItem("trainer", JSON.stringify(user));
      navigate("/trainer-dashboard");
    } catch (err) {
      setLocalError(err?.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      await dispatch(registerUser({ username, email, password, role })).unwrap();
      setSuccess("User registered successfully! Please login.");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("learner");
      setTimeout(() => setShowSignup(false), 2000);
    } catch (err) {
      setSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?education')" }}>
      <div>
        <div className="flex justify-between mb-4">
          <button onClick={() => setShowSignup(false)} className={`py-2 px-4 rounded-l-lg w-1/2 ${!showSignup ? "bg-black text-white" : "bg-gray-300 text-black"}`}>Login</button>
          <button onClick={() => setShowSignup(true)} className={`py-2 px-4 rounded-r-lg w-1/2 ${showSignup ? "bg-black text-white" : "bg-gray-300 text-black"}`}>Sign Up</button>
        </div>
        {showSignup ? (
          <Signup
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            handleSignup={handleSignup}
            loading={loading}
            error={error}
            success={success}
          />
        ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            loading={loading}
            error={error}
            localError={localError}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
