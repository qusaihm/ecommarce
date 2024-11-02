import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cart.css";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userToken");

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(data);
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProducts = async (productId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}cart/removeItem`,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const updateQuantity = async (productId, action) => {
    const endpoint =
      action === "increase" ? "incraseQuantity" : "decraseQuantity";
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}cart/${endpoint}`,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error(`Error ${action} quantity:`, error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error in clear cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.details.finalPrice;
    }, 0);
  };

  useEffect(() => {
    getProducts();
  }, [refresh]);

  return (
    <>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#d2c9ff" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className=" card-registration card-registration-2"
                style={{ borderRadius: 15 }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0">Shopping Cart</h1>
                          <h6 className="mb-0 text-muted">
                            {products.length} items
                          </h6>
                        </div>

                        <div>
                          {loading ? (
                            <div className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : products.length > 0 ? (
                            products.map((product) => {
                              const totalPrice =
                                product.quantity * product.details.finalPrice;
                              return (
                                <div key={product.productId}>
                                  <hr className="my-4" />
                                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                      <img
                                        src={
                                          product.details.mainImage.secure_url
                                        }
                                        className="img-fluid rounded-3"
                                        alt={product.details.name}
                                      />
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                      <h6 className="mb-0">
                                        {product.details.name}
                                      </h6>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
                                      <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() =>
                                          updateQuantity(
                                            product.productId,
                                            "decrease"
                                          )
                                        }
                                        disabled={product.quantity <= 1}
                                      >
                                        -
                                      </button>

                                      <input
                                        id="form1"
                                        min={1}
                                        name="quantity"
                                        value={product.quantity}
                                        type="number"
                                        className="form-control form-control-sm mx-2 text-center"
                                        readOnly
                                      />

                                      <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() =>
                                          updateQuantity(
                                            product.productId,
                                            "increase"
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                      <h6 className="mb-0">
                                        €{product.details.finalPrice}
                                      </h6>
                                      <p>
                                        Total Price: €{totalPrice.toFixed(2)}
                                      </p>
                                    </div>

                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() =>
                                          removeProducts(product.productId)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p>No products available</p>
                          )}
                          <div className="row mb-4 d-flex mt-4 align-items-center">
                            <button
                              onClick={() => clearCart()}
                              type="button"
                              className="btn btn-warning"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 bg-body-tertiary">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            items {products.length}
                          </h5>
                          <h5>€{calculateTotalPrice().toFixed(2)}</h5>
                        </div>
                        <h5 className="text-uppercase mb-3">Shipping</h5>
                        <div className="mb-4 pb-2">
                          <select data-mdb-select-init>
                            <option value={1}>Standard-Delivery- €5.00</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                            <option value={4}>Four</option>
                          </select>
                        </div>

                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>€{calculateTotalPrice().toFixed(2)}</h5>
                        </div>

                        {products.length > 0 && (
                          <Link to={"/order"}>
                            <button
                              type="button"
                              className="btn btn-dark btn-block btn-lg"
                            >
                              Checkout
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
