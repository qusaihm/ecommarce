import React, { useEffect, useState } from "react";
import "./myOrder.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
    setLoading(false);
  }, []);

  return (
    <>
      <h2 className="text-center text-orange my-4">My Orders</h2>
      <div className="container">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-warning" role="status" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center">You don't have any orders yet!</p>
        ) : (
          orders.map((item) => (
            <div key={item.id} className="card mb-4 shadow-sm">
              <div className="card-body">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Address: {item.address}</li>
                  <li className="list-group-item">Phone: {item.phone}</li>
                  <li className="list-group-item">Date: {item.date}</li>
                  <li className="list-group-item">Total: ${item.finalPrice}</li>
                </ul>
                <h6 className="text-orange">Products</h6>
                <div className="d-flex flex-wrap gap-3">
                  {item.products.map((product) => (
                    <div key={product.id} className="card" style={{ width: "18rem" }}>
                      <img
                        src={product.image}
                        className="card-img-top p-3"
                        alt={product.title}
                        style={{ height: "150px", objectFit: "contain" }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{product.title?.substring(0, 40)}...</h6>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Price: ${product.price}</li>
                        <li className="list-group-item">Quantity: {product.quantity}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}