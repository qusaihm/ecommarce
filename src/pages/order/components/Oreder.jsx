import axios from "axios";
import React, { useState } from "react";
import { Slide, toast, Zoom } from "react-toastify";
import { object, string } from "yup";
import "./order.css";

export default function Order() {
  const [errors, setErrors] = useState([]);
  const [order, setOrder] = useState({
    couponName: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const validateOrder = async () => {
    const validationSchema = object({
      couponName: string(),
      address: string().min(3).max(20).required(),
      phone: string().min(3).max(20).required(),
    });

    try {
      await validationSchema.validate(order, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateOrder();
    if (!isValid) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}order`,
        {
          couponName: order.couponName,
          address: order.address,
          phone: order.phone,
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (data.message === "success") {
        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });

        setOrder({ couponName: "", address: "", phone: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  return (
    <main className="main-content form-signin w-100 m-auto mt-5 mb-4">
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src="src/assets/image/img-1.png"
          alt="Logo"
          width={280}
          height={150}
        />

        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="form-floating">
          <input
            type="text"
            name="couponName"
            value={order.couponName}
            onChange={handleChange}
            className="form-control"
            placeholder="Coupon Name"
          />
          <label htmlFor="couponName">Coupon Name</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            name="address"
            value={order.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
          />
          <label htmlFor="address">Address</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            name="phone"
            value={order.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Phone"
          />
          <label htmlFor="phone">Phone</label>
        </div>

        <button type="submit" className="btn w-100 py-2 btn btn-success">
          Order to Install
        </button>
      </form>
    </main>
  );
}
