import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from Redux

import LearnerDashboard from "./pages/LearnerDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ExamDashboard from "./pages/ExamDashboard"; // Import ExamDashboard
import Contact from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import CreateCourseForm from "./pages/CreateCourse";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseList from "./pages/CourseList";
import ExamineeProfile from "./pages/ExamineeProfile"; 
import EditProfile from "./pages/EditProfile";    
import CourseReview from "./pages/CourseReview";
import ExamAttemptPage from "./pages/ExamAttempt";
import MediaUpload from "./components/MediaUpload";
import MediaGallery from "./components/MediaGallery";
const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux state

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return element;
};

function App() {
  return (
    <>
      <Navbar />

      <Routes>
      <Route path="/course/:courseId/CourseReview" element={<CourseReview />} />

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/examinee-profile" element={<ExamineeProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/CourseReview" element={<CourseReview />} />
        <Route path="/MediaUpload" element={<MediaUpload />} />
        <Route path="/MediaGallery" element={<MediaGallery/>} />

        {/* Protected Routes */}
        <Route 
          path="/admin-dashboard" 
          element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} 
        />
        <Route 
          path="/learner-dashboard" 
          element={<ProtectedRoute element={<LearnerDashboard />} allowedRoles={["learner"]} />} 
        />
        <Route 
          path="/trainer-dashboard" 
          element={<ProtectedRoute element={<TrainerDashboard />} allowedRoles={["trainer"]} />} 
        />
        <Route 
          path="/create-course" 
          element={<ProtectedRoute element={<CreateCourseForm />} allowedRoles={["trainer"]} />} 
        />
       <Route 
  path="/exam-dashboard" 
  element={<ProtectedRoute element={<ExamDashboard />} allowedRoles={["learner", "examinee"]} />} 
/>
<Route 
  path="/dashboard/learner/exam/:code" 
  element={<ProtectedRoute element={<ExamAttemptPage />} allowedRoles={["learner", "examinee"]} />} 
/>


      </Routes>

      <Footer />
    </>
  );
}

export default App;
