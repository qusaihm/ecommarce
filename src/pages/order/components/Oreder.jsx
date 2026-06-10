import React, { useState } from "react";
import { Slide, toast } from "react-toastify";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import "./order.css";
import mainImage from "../../../assets/image/img-1.png";

export default function Order() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const validateOrder = async () => {
    const validationSchema = object({
      address: string().min(3, "Address too short").max(50, "Address too long").required("Address is required"),
      phone: string().min(8, "Phone too short").max(15, "Phone too long").required("Phone is required"),
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

    // Save order to localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const newOrder = {
      id: Date.now(),
      address: order.address,
      phone: order.phone,
      products: cart,
      finalPrice: total.toFixed(2),
      date: new Date().toLocaleDateString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.removeItem("cart");

    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      transition: Slide,
    });

    navigate("/user/profile/myorder");
  };

  return (
    <main className="main-content form-signin w-100 m-auto mt-5 mb-4">
      <form onSubmit={handleSubmit}>
        <img className="mb-4" src={mainImage} alt="Logo" width={280} height={150} />

        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => <p key={index}>{error}</p>)}
          </div>
        )}

        <div className="form-floating mb-3">
          <input type="text" name="address" value={order.address} onChange={handleChange} className="form-control" placeholder="Address" />
          <label>Address</label>
        </div>

        <div className="form-floating mb-3">
          <input type="text" name="phone" value={order.phone} onChange={handleChange} className="form-control" placeholder="Phone" />
          <label>Phone</label>
        </div>

        <button type="submit" className="btn w-100 py-2 btn btn-success">
          Place Order
        </button>
      </form>
    </main>
  );
}