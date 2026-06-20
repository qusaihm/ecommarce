import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setProducts(cart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeProduct = (productId) => {
    const updated = products.filter((p) => p.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updated));
    setProducts(updated);
  };

  const updateQuantity = (productId, action) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const newQty = action === "increase" ? p.quantity + 1 : Math.max(1, p.quantity - 1);
        return { ...p, quantity: newQty };
      }
      return p;
    });
    localStorage.setItem("cart", JSON.stringify(updated));
    setProducts(updated);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setProducts([]);
  };

  const calculateTotal = () => products.reduce((total, p) => total + p.price * p.quantity, 0);

  return (
    <section className="h-100 h-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card-registration card-registration-2">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-12 col-lg-8">
                    <div className="cart-padding">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h1 className="fw-bold mb-0 cart-title">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">{products.length} items</h6>
                      </div>

                      {products.length === 0 ? (
                        <p>No products in cart. <Link to="/products">Shop now</Link></p>
                      ) : (
                        products.map((product) => (
                          <div key={product.id}>
                            <hr className="my-4" />
                            <div className="row mb-3 align-items-center cart-item-row">
                              <div className="col-4 col-sm-2">
                                <img
                                  src={product.image}
                                  className="img-fluid rounded-3"
                                  alt={product.title}
                                  style={{ objectFit: "contain", height: "70px" }}
                                />
                              </div>
                              <div className="col-8 col-sm-4 col-md-3">
                                <h6 className="mb-0 cart-item-title">{product.title.substring(0, 40)}...</h6>
                              </div>
                              <div className="col-7 col-sm-4 col-md-3 d-flex align-items-center mt-2 mt-sm-0">
                                <button
                                  className="btn btn-outline-dark btn-sm"
                                  onClick={() => updateQuantity(product.id, "decrease")}
                                  disabled={product.quantity <= 1}
                                >
                                  -
                                </button>
                                <input
                                  min={1}
                                  value={product.quantity}
                                  type="number"
                                  className="form-control form-control-sm mx-2 text-center"
                                  readOnly
                                />
                                <button
                                  className="btn btn-outline-dark btn-sm"
                                  onClick={() => updateQuantity(product.id, "increase")}
                                >
                                  +
                                </button>
                              </div>
                              <div className="col-5 col-sm-1 col-md-2 mt-2 mt-sm-0 text-sm-end">
                                <h6 className="mb-0">${(product.price * product.quantity).toFixed(2)}</h6>
                              </div>
                              <div className="col-12 col-sm-1 text-sm-end mt-2 mt-sm-0">
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => removeProduct(product.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                      {products.length > 0 && (
                        <button onClick={clearCart} type="button" className="btn btn-warning mt-3">
                          Clear Cart
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 bg-body-tertiary">
                    <div className="cart-padding">
                      <h3 className="fw-bold mb-4 mt-2 pt-1">Summary</h3>
                      <hr className="my-3" />
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="text-uppercase mb-0">Items {products.length}</h5>
                        <h5 className="mb-0">${calculateTotal().toFixed(2)}</h5>
                      </div>
                      <hr className="my-3" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase mb-0">Total price</h5>
                        <h5 className="mb-0">${calculateTotal().toFixed(2)}</h5>
                      </div>
                      {products.length > 0 && (
                        <Link to="/order">
                          <button type="button" className="btn btn-dark btn-block btn-lg w-100">
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
  );
}