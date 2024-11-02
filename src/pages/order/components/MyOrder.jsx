import axios from "axios";
import React, { useEffect, useState } from "react";
import "./myOrder.css";
import { Spinner } from "react-bootstrap";

export default function MyOrders() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}order`, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem("userToken")}`,
        },
      });
      setOrder(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <h2 className="text-center text-orange my-4">My Orders</h2>
      <div className="container">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : order.length === 0 ? (
          <p className="text-center">You don't have any orders yet!</p>
        ) : (
          order.map((item) => (
            <div key={item._id} className="card mb-4 shadow-sm">
              <div className="card-body">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Address: {item.address}</li>
                  <li className="list-group-item">
                    Phone Number: {item.phoneNumber}
                  </li>
                  <li className="list-group-item">
                    Final Price: ${item.finalPrice}
                  </li>
                </ul>
                <h6 className="text-orange">List of Products</h6>
                <div className="d-flex flex-wrap gap-3">
                  {item.products.map((product) => (
                    <div
                      key={product.productId._id}
                      className="card"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={product.productId.mainImage.secure_url}
                        className="card-img-top"
                        alt={product.productId.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.productId.name}</h5>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          Price: ${product.finalPrice}
                        </li>
                        <li className="list-group-item">
                          Quantity: {product.quantity}
                        </li>
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
