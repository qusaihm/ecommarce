import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

const FAKESTORE_API = "https://fakestoreapi.com";

export default function SubCategories() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${FAKESTORE_API}/products/category/${id}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [id]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.error("Already in cart!", { position: "top-center", autoClose: 3000, theme: "dark" });
      return;
    }
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to Cart!", { position: "top-right", autoClose: 3000, theme: "dark", transition: Slide });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-capitalize">{id}</h3>
      {loading ? (
        <div className="d-flex justify-content-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {products.map((product) => (
            <div className="card" style={{ width: "18rem" }} key={product.id}>
              <img src={product.image} alt={product.title} className="card-img-top p-3" style={{ height: "200px", objectFit: "contain" }} />
              <div className="card-body d-flex flex-column">
                <h6 style={{ fontSize: "0.85rem" }}>{product.title.substring(0, 50)}...</h6>
                <p className="fw-bold">${product.price}</p>
                <div className="d-flex gap-2 mt-auto">
                  <Link className="btn btn-info btn-sm" to={`/details/${product.id}`}>Details</Link>
                  <button onClick={() => addToCart(product)} className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                    <FaCartPlus /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}