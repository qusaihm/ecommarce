import axios from "axios";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const sendCode = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}auth/sendcode`,
        {
          email: email,
        }
      );

      if (data.message === "success") {
        toast.info("Your code has been sent", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        navigate("/resetpassword");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="form-signin w-100 m-auto mt-5 mb-4">
        <form onSubmit={sendCode}>
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
              onChange={handleChange}
              className="form-control"
              placeholder="name@example.com"
            />
            <label>Please enter your email</label>
          </div>

          <button
            type="submit"
            className="btn btn-outline-success w-100 py-2 mt-3"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
