import axios from "axios";
import React, { useContext, useState } from "react";
import { object, string } from "yup";
import { Flip, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import "./Login.css";

export default function Login() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const LoginSchema = object({
      email: string().email("Please enter a valid email"),
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

    if (await validateData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}auth/signin`,
          {
            email: user.email,
            password: user.password,
          }
        );

        setUser({
          email: "",
          password: "",
        });

        if (data.message === "success") {
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Flip,
          });

          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed!", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
      <main className="form-signin w-100 m-auto text-center mt-5 mb-4">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow-sm bg-light"
          style={{ maxWidth: "400px" }}
        >
          <img
            className="mb-4"
            src="src/assets/image/img-1.png"
            alt="logo"
            width={280}
            height={150}
          />
          <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

          {errors.length > 0 && (
            <div className="alert alert-danger">
              {errors.map((error, index) => (
                <p key={index} className="mb-1">
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              type="email"
              value={user.email}
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <NavLink className="nav-link mb-3 text-primary" to="/forgetpassword">
            Forgot password?
          </NavLink>

          <button
            type="submit"
            className={`btn btn-primary w-100 py-2 ${loader ? "disabled" : ""}`}
            disabled={loader}
          >
            {loader ? "Please wait..." : "Login"}
          </button>
        </form>
      </main>
    </>
  );
}
