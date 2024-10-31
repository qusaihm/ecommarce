import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  const { cartCounter } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top mb-3">
      <div className="container-fluid">
        <img className="navbar-brand" src="public/Exclusive.png" alt="logo" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            {userName && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart {cartCounter > 0 && <span> </span>}
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userName ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userName} Profile
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/user/profile" className="dropdown-item">
                      {userName} Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="user/profile/myorder" className="dropdown-item">
                      {userName} Orders
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
