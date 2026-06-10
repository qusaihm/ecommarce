import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function ProtectedRoutes({ children }) {
  const { userToken, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}