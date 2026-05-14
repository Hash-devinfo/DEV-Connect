import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-500 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        DevConnect
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {/* Not logged in */}
        {!user && (
          <>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
            <Link to="/login" className={isActive("/login")}>
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Get Started
            </Link>
          </>
        )}

        {/* Logged in as User */}
        {user?.role === "user" && (
          <>
            <Link to="/user" className={isActive("/user")}>
              Dashboard
            </Link>
            <span className="text-sm text-gray-400">👋 {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}

        {/* Logged in as Developer */}
        {user?.role === "developer" && (
          <>
            <Link to="/developer" className={isActive("/developer")}>
              Projects
            </Link>
            <Link to="/developer/bids" className={isActive("/developer/bids")}>  
      My Bids
    </Link>
            <span className="text-sm text-gray-400">👋 {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
