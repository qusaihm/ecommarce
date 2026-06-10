import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import mainImage from "../../../assets/image/img-1.png";

export default function ForgetPassword() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email has been sent! Check your inbox.", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/login");
    } catch (error) {
      let message = "Failed to send reset email";
      if (error.code === "auth/user-not-found") message = "No account found with this email";
      if (error.code === "auth/invalid-email") message = "Invalid email address";
      toast.error(message, { position: "top-center", autoClose: 5000, theme: "colored" });
    } finally {
      setLoader(false);
    }
  };

  return (
    <main className="form-signin w-100 m-auto mt-5 mb-4">
      <form onSubmit={sendCode} className="p-4 rounded shadow-sm bg-light" style={{ maxWidth: "400px" }}>
        <img className="mb-4" src={mainImage} alt="logo" width={280} height={150} />
        <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
        <p className="text-muted mb-3">Enter your email and we'll send you a reset link.</p>

        <div className="form-floating mb-3">
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="name@example.com" />
          <label>Please enter your email</label>
        </div>

        <button type="submit" className="btn btn-outline-success w-100 py-2 mt-2" disabled={loader}>
          {loader ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </main>
  );
}