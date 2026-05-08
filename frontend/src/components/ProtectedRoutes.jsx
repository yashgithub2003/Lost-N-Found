import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  // wait for auth check
  if (loading) {
    return <div>Loading...</div>;
  }

  // if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // authenticated
  return <>{children}</>;
};

export default ProtectedRoutes;