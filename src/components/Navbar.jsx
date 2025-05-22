import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice"; // Import logout action
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, MoreVertical, User } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user from Redux

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
        EduSphere
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white text-black px-3 py-2 rounded-lg"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none px-2 w-full bg-transparent"
          />
          <button type="submit" className="ml-2 text-gray-600 hover:text-black">
            🔍
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/courses" className="hover:text-gray-300">Courses</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>

          {user ? (
            <>
              {/* Profile Link */}
              <Link to="/profile" className="flex items-center gap-2 hover:text-gray-300">
                <User size={20} /> {user.name}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 bg-gray-800 p-4 mt-2 rounded-lg">
          {/* Search Bar for Mobile */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white text-black px-3 py-2 rounded-lg"
          >
            <input
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none px-2 w-full bg-transparent"
            />
            <button type="submit" className="ml-2 text-gray-600 hover:text-black">
              🔍
            </button>
          </form>

          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/courses" className="hover:text-gray-300">Courses</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>

          {user ? (
            <>
              {/* Profile Link */}
              <Link to="/profile" className="flex items-center gap-2 hover:text-gray-300">
                <User size={20} /> {user.name}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
