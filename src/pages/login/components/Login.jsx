import React, { useContext, useState } from "react";
import { object, string } from "yup";
import { Flip, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { UserContext } from "../../../context/User";
import "./Login.css";
import mainImage from "../../../assets/image/img-1.png";

export default function Login() {
  const { setUserToken, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateData = async () => {
    const LoginSchema = object({
      email: string().email("Please enter a valid email").required("Email is required"),
      password: string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .required("Password is required"),
    });
    try {
      await LoginSchema.validate(user, { abortEarly: false });
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
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
        const firebaseUser = userCredential.user;

        setUserToken(firebaseUser.uid);
        setUserName(firebaseUser.displayName || firebaseUser.email.split("@")[0]);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Flip,
        });

        navigate("/");
      } catch (error) {
        let message = "Login failed!";
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
          message = "Invalid email or password";
        } else if (error.code === "auth/too-many-requests") {
          message = "Too many attempts. Please try again later.";
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
    <main className="form-signin w-100 m-auto text-center mt-5 mb-4">
      <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light" style={{ maxWidth: "400px" }}>
        <img className="mb-4" src={mainImage} alt="logo" width={280} height={150} />
        <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => <p key={index} className="mb-1">{error}</p>)}
          </div>
        )}

        <div className="form-floating mb-3">
          <input type="email" value={user.email} name="email" onChange={handleChange} className="form-control" placeholder="name@example.com" />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input type="password" value={user.password} name="password" onChange={handleChange} className="form-control" placeholder="Password" />
          <label>Password</label>
        </div>

        <NavLink className="nav-link mb-3 text-primary" to="/forgetpassword">Forgot password?</NavLink>

        <button type="submit" className={`btn btn-primary w-100 py-2 ${loader ? "disabled" : ""}`} disabled={loader}>
          {loader ? "Please wait..." : "Login"}
        </button>

        <p className="mt-3">Don't have an account? <NavLink to="/register">Register</NavLink></p>
      </form>
    </main>
  );
}