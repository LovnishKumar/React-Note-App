import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/ContextProvider";

const Navbar = () => {
  const { user, setQuery, setUser } = UserAuth();
  const navigate = useNavigate();

    function getInitials() {
  if (!user?.name) return "";
  const nameParts = user.name.trim().split(" ");
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
  const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.[0]?.toUpperCase() : "";
  return firstInitial + lastInitial;
}

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
  <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
    {/* Logo */}
    <div className="text-xl font-bold">
      <Link to="/">Note App</Link>
    </div>

    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search notes..."
      className="bg-gray-600 px-4 py-2 rounded w-1/4 outline-none"
      onChange={(e) => setQuery(e.target.value)}
    />

    {/* Right Section */}
    <div className="flex items-center">
      {!user ? (
        <>
          <Link
            to="/login"
            className="mr-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="mr-4 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Signup
          </Link>
        </>
      ) : (
        <>
          {/* Profile Picture or Initials + Name */}
          <div
            className="flex items-center mr-4 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile Pic"
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <div className="bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full mr-2 font-semibold uppercase">
                {getInitials(user.name)}
              </div>
            )}
            <span>{user.name}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-red-500 mr-4 px-4 py-2 rounded hover:bg-red-600"
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
