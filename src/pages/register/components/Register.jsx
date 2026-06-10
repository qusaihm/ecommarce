import React, { useState } from "react";
import { object, string } from "yup";
import { Flip, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import "./register.css";
import mainImage from "../../../assets/image/img-1.png";

export default function Register() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({ userName: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateData = async () => {
    const RegisterSchema = object({
      userName: string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username can be up to 20 characters")
        .required("Username is required"),
      email: string().email("Please enter a valid email").required("Email is required"),
      password: string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password can be up to 20 characters")
        .required("Password is required"),
    });
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErrors([]);

    if (await validateData()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        await updateProfile(userCredential.user, { displayName: user.userName });

        toast.success("Your account has been created successfully!", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Flip,
        });

        navigate("/products");
      } catch (error) {
        let message = "Registration failed!";
        if (error.code === "auth/email-already-in-use") {
          message = "Email already exists";
        } else if (error.code === "auth/weak-password") {
          message = "Password is too weak";
        }
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Flip,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error, index) => <p key={index} className="mb-1">{error}</p>)}
        </div>
      )}

      <main className="form-signin w-100 m-auto text-center mt-5 mb-4">
        <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light" style={{ maxWidth: "400px" }}>
          <img className="mb-4" src={mainImage} alt="logo" width={280} height={150} />
          <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

          <div className="form-floating mb-3">
            <input type="text" value={user.userName} name="userName" onChange={handleChange} className="form-control" placeholder="Username" />
            <label>Username</label>
          </div>

          <div className="form-floating mb-3">
            <input type="email" value={user.email} name="email" onChange={handleChange} className="form-control" placeholder="name@example.com" />
            <label>Email</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" value={user.password} name="password" onChange={handleChange} className="form-control" placeholder="Password" />
            <label>Password</label>
          </div>

          <button type="submit" className="btn btn-outline-success w-100 py-2" disabled={loader}>
            {loader ? "Please wait..." : "Register"}
          </button>

          <p className="mt-3">Already have an account? <a href="/login">Login</a></p>
        </form>
      </main>
    </>
  );
}