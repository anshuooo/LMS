import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import CourseProgress from "../components/CourseProgress";
import ExamScores from "../components/ExamScores";
import DownloadNotes from "../components/DownloadNotes";
import WatchedVideos from "../components/WatchedVideos";

import CertificateDownload from "../components/CertificateDownload";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/USER_ID")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      <ProfileCard user={user} />
      <CourseProgress courses={user.enrolledCourses} />
      <ExamScores exams={user.examScores} upcoming={user.upcomingExams} />
      <DownloadNotes notes={user.downloadedNotes} />
      <WatchedVideos videos={user.watchedVideos} />
      
      <CertificateDownload courses={user.completedCourses} />
    </div>
  );
};

export default Dashboard;
