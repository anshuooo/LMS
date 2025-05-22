import { Link } from "react-router-dom";
import { Users, FileText, CreditCard, Shield } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminCard icon={Users} title="Manage Users" link="/admin/users" />
        <AdminCard icon={FileText} title="Moderate Courses" link="/admin/courses" />
        <AdminCard icon={CreditCard} title="Payments & Refunds" link="/admin/payments" />
        <AdminCard icon={Shield} title="Security & Reports" link="/admin/security" />
      </div>
    </div>
  );
};

const AdminCard = ({ icon: Icon, title, link }) => (
  <Link to={link} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition">
    <Icon size={32} className="text-red-500" />
    <span className="font-medium text-gray-700">{title}</span>
  </Link>
);

export default AdminDashboard;
