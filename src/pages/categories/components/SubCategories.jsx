import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Flip, Slide, toast, Zoom } from "react-toastify";
import Products from "./../../products/components/Products";
import NotFound from "../../../components/NotFound";
import "./subCategories.css";

export default function SubCategories() {
  const { id } = useParams("id");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}products/category/${id}`
      );
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}cart`,
        { productId },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );

      if (data.message === "success") {
        toast.success("Add to Cart successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Zoom,
        });
      }
    }
  };

  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-secondary ms-4">
          Back to home
        </button>
      </Link>
      <div className="d-flex p-4 gap-3 mb-3 flex-wrap">
        {loading ? (
          <div className="loader-container">
            <div className="spinner spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : products.length < 1 ? (
          <NotFound />
        ) : (
          products.map((product) => (
            <div className="card" style={{ width: "18rem" }} key={product._id}>
              <img
                src={product.mainImage.secure_url}
                alt={product.name}
                className="card-img-top h-75"
              />
              <div className="card-body h-25">
                <h6 className="h-50">{product.name}</h6>
                <button
                  onClick={() => addToCart(product._id)}
                  className="btn btn-outline-danger"
                >
                  add to cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
