import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slide, toast, Zoom } from "react-toastify";
import axios from "axios";
import Rating from "react-rating-stars-component";
import "./details.css";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}products/${id}`
        );
        setProduct(data.product);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

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
        toast.success("Added to cart successfully", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Zoom,
        });
      }
    }
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.mainImage.secure_url} alt={product.name} />
      <p>Price: ${product.finalPrice}</p>
      {product.price !== product.finalPrice && (
        <p className="text-decoration-line-through">
          Original Price: ${product.price}
        </p>
      )}

      <button
        onClick={() => addToCart(product._id)}
        className="btn btn-outline-danger"
      >
        Add to cart
      </button>
      <p className="description">Description: {product.description}</p>

      <h3>Reviews:</h3>
      <div className="reviews">
        {product.reviews.length ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review">
              <h6>{review.createdBy.userName}</h6>
              <Rating
                count={5}
                value={review.rating}
                size={20}
                activeColor="#ffd700"
                edit={false}
              />
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}
