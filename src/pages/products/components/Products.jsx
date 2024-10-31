import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Flip, Slide, toast, Zoom } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCartPlus } from "react-icons/fa";
 

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}products`,
          {
            params: { limit: itemsPerPage * totalPages },
          }
        );
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, [itemsPerPage, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}cart`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      console.log(data);
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
    <div className="products-page">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex p-4 gap-3 mb-3 flex-wrap">
            {displayedProducts.map((product) => (
              <div
                className="card"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  src={product.mainImage.secure_url}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h6>{product.name}</h6>
                  <div className="mt-auto">
                    {product.price === product.finalPrice ? (
                      <p> ${product.finalPrice}</p>
                    ) : (
                      <div className="d-flex">
                        <p className="mx-1 text-decoration-line-through text-danger">
                          ${product.price}
                        </p>
                        <p>${product.finalPrice}</p>
                      </div>
                    )}
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <Link
                      className="btn btn-info btn-sm"
                      to={`/details/${product._id}`}
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                    >
                      <FaCartPlus /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination d-flex justify-content-center">
            <button
              className="page-link"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`page-link ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              className="page-link"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
