import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Slide, toast, Zoom } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCartPlus } from "react-icons/fa";
import "./product.css";

const FAKESTORE_API = "https://fakestoreapi.com";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${FAKESTORE_API}/products`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

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

    toast.success("Added to Cart successfully", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Slide,
    });
  };

  return (
    <div className="products-page">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex p-4 gap-3 mb-3 flex-wrap">
            {displayedProducts.map((product) => (
              <div className="card" style={{ width: "18rem" }} key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top p-3"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 style={{ fontSize: "0.85rem" }}>{product.title.substring(0, 50)}...</h6>
                  <div className="mt-auto">
                    <p className="fw-bold">${product.price}</p>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <Link className="btn btn-info btn-sm" to={`/details/${product.id}`}>
                      Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                    >
                      <FaCartPlus /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination d-flex justify-content-center mb-4">
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-link ${page === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}