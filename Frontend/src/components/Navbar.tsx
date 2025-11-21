import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Scale} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/membership", label: "Membership Details" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "Contact Us" },
  ];

  // isAdmin is now handled by the AuthContext

  const privateLinks = isAdmin
    ? [{ path: "/admin", label: "Admin Dashboard" }]
    : [
        { path: "/lawyers", label: "Lawyers" },
        { path: "/demised", label: "Demised Lawyers" },
        { path: "/profile", label: "My Profile" },
      ];

  const activeLinks = isLoggedIn
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black">
              lawyerwelfareindia{" "}
            </span>
          </Link>

          {/* Navigation Items - Center */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            {activeLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm px-2 py-1 rounded ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-black hover:text-black"
                  } transition-colors`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 rounded-lg transition-colors border border-red-600 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/join"
                  className={({ isActive }) =>
                    `text-sm px-3 py-1 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-700 text-white font-semibold"
                        : "bg-black text-white hover:bg-gray-500"
                    }`
                  }
                >
                  Join Now
                </NavLink>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm px-3 py-1 rounded-lg transition-colors border ${
                      isActive
                        ? "border-gray-700 text-gray-700 font-semibold"
                        : "border-black text-black hover:bg-gray-500 hover:text-white hover:border-none"
                    }`
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black ml-auto"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {activeLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm rounded ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-black hover:text-black"
                  } transition-colors`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-center text-sm px-4 py-2 rounded-lg transition-colors border border-red-600 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/join"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-center text-sm px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-700 text-white font-semibold"
                        : "bg-black text-white hover:bg-gray-500"
                    }`
                  }
                >
                  Join Now
                </NavLink>

                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-center text-sm px-4 py-2 rounded-lg transition-colors border ${
                      isActive
                        ? "bg-gray-700 text-white font-semibold"
                        : "border-black text-white hover:bg-gray-500"
                    }`
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
