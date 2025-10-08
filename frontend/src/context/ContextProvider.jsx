import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();



export const UserAuth = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {


  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [query, setQuery] = useState("");

  // Verify token on mount
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       return;
  //     }

  //     try {
  //       const res = await axios.get("http://localhost:5000/api/auth/verify", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (res.data.success) {
  //         setUser(res.data.user);
  //         localStorage.setItem("user", JSON.stringify(res.data.user));
  //       } 
  //       // else {
  //       //   setUser(null);
  //       //   localStorage.removeItem("token");
  //       //   localStorage.removeItem("user");
  //       // }
  //     } catch (error) {
  //       console.log("Verification failed:", error.response?.data || error.message);
  //       setUser(null);
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //     }
  //   };

  //   verifyUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, query, setQuery }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
