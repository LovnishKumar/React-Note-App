import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();
export const UserAuth = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch notes from backend
  useEffect(() => {
    fetch(`${API_URL}/api/notes`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  }, [API_URL]);

  // Verify user token
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.log("Verification failed:", error.response?.data || error.message);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    verifyUser();
  }, [API_URL]);

  return (
    <AuthContext.Provider value={{ user, setUser, query, setQuery, notes, setNotes }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
