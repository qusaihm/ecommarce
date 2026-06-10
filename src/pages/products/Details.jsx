import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slide, toast, Zoom } from "react-toastify";
import axios from "axios";
import "./details.css";

const FAKESTORE_API = "https://fakestoreapi.com";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`${FAKESTORE_API}/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Product already in cart!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Zoom,
      });
      return;
    }

    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart successfully", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Slide,
    });
  };

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details container mt-5">
      <div className="row">
        <div className="col-md-5 text-center">
          <img src={product.image} alt={product.title} style={{ maxHeight: "350px", objectFit: "contain" }} className="img-fluid" />
        </div>
        <div className="col-md-7">
          <h2>{product.title}</h2>
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <p className="fs-4 fw-bold">${product.price}</p>
          <p>⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
          <p className="description">{product.description}</p>
          <button onClick={() => addToCart(product)} className="btn btn-outline-danger mt-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}