import axios from "axios";
import React, { useContext, useState } from "react";
import { object, string } from "yup";
import { Flip, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";

export default function ResetPassword() {
  const { setUserToken } = useContext(UserContext);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const Resetschema = object({
      email: string().email("plz enter valid email"),
      password: string().min(8).max(20).required(),
    });

    try {
      await Resetschema.validate(user, { abortEarly: false });
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
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API}auth/forgotPassword`,
          {
            email: user.email,
            password: user.password,
            code: user.code,
          }
        );
        setUser({ userName: "", email: "", password: "" });

        console.log(data);

        if (data.message == "success") {
          toast.success(" reset successfuly", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });

          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
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
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}

      <main className="form-signin w-100 m-auto mt-5 mb-4">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-4"
            src="src/assets/image/img-1.png"
            alt
            width={280}
            height={150}
          />

          <div className="form-floating">
            <input
              type="email"
              value={user.email}
              name="email"
              onChange={handelChange}
              className="form-control"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput"> email</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              value={user.code}
              name="code"
              onChange={handelChange}
              className="form-control"
              placeholder="****"
            />
            <label htmlFor="floatingInput"> Code</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handelChange}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword"> new password</label>
          </div>

          <button
            type="submit"
            className="btn btn-outline-success"
            disabled={loader ? "disabled" : ""}
          >
            {!loader ? "reset" : "...wait"}
          </button>
        </form>
      </main>
    </>
  );
}
