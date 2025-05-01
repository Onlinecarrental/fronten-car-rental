import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, type }) => {
  const data = localStorage.getItem(type); // sirf localStorage
  return data ? children : <Navigate to="/" />;
};

export default ProtectedRoute;