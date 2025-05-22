
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About LMS</h3>
            <p className="text-sm">
              Our Learning Management System provides high-quality courses, interactive learning, and expert guidance to help you upskill.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/courses" className="hover:text-blue-400">Courses</a></li>
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-500">
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-400">
                <FaTwitter className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-600">
                <FaLinkedinIn className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-pink-500">
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter to get the latest updates on new courses and offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
              <button className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-700 mt-8 pt-4">
          &copy; {new Date().getFullYear()} LMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
