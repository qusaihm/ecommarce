import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../../../assets/image/img-1.png";

export default function ResetPassword() {
  const navigate = useNavigate();

  return (
    <main className="form-signin w-100 m-auto mt-5 mb-4 text-center">
      <div className="p-4 rounded shadow-sm bg-light" style={{ maxWidth: "400px", margin: "auto" }}>
        <img className="mb-4" src={mainImage} alt="logo" width={280} height={150} />
        <h1 className="h3 mb-3 fw-normal">Check Your Email</h1>
        <p className="text-muted">
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
        </p>
        <button className="btn btn-primary w-100 py-2 mt-3" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </main>
  );
}