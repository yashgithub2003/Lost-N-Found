import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 reusable function
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/getuser",
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};