import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/ContextProvider";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
const location = useLocation();
 const {user, setUser} = UserAuth()

 useEffect(() => {  
    if (user) {
      // Go back to the protected page the user wanted
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [user, navigate, location]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://react-note-app-1.onrender.com/api/auth/login",
        formData
      );
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border p-6 rounded-lg shadow w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded outline-none"
              placeholder="Enter Your Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded outline-none"
              placeholder="Enter Your Password"
              onChange={handleChange}
              required
            />
          </div>
          <button className="w-full bg-teal-600 text-white py-2">Login</button>
          <p className="text-center">
            Don't Have Account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
