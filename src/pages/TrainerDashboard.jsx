import { Link } from "react-router-dom";
import { PlusCircle, Video, BarChart3, MessageSquare } from "lucide-react";

const TrainerDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Trainer Dashboard</h1>

      {/* Create Course */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">Create New Course</h2>
        <Link to="/create-course" className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
          <PlusCircle size={20} className="inline-block mr-2" />
          Create Course
        </Link>
      </div>

      {/* Trainer Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TrainerCard icon={Video} title="Manage Videos" link="/trainer/videos" />
        <TrainerCard icon={BarChart3} title="Analytics" link="/trainer/analytics" />
        <TrainerCard icon={MessageSquare} title="Student Q&A" link="/trainer/discussions" />
      </div>
    </div>
  );
};

const TrainerCard = ({ icon: Icon, title, link }) => (
  <Link to={link} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition">
    <Icon size={32} className="text-blue-500" />
    <span className="font-medium text-gray-700">{title}</span>
  </Link>
);

export default TrainerDashboard;
