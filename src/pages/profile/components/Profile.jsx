import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../../context/User";
import "./profile.css";

export default function Profile() {
  const { userName, userEmail } = useContext(UserContext);

  return (
    <div>
      <section className="profile-section w-100 px-4 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-9 col-lg-7 col-xl-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex profile-content">
                  <div className="flex-shrink-0 profile-image-wrapper">
                    <div className="profile-image d-flex justify-content-center align-items-center bg-primary text-white rounded-circle">
                      {userName?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-grow-1 profile-info">
                    <h3 className="mb-1 text-orange profile-username">
                      Username: <span className="fw-bold">{userName}</span>
                    </h3>
                    <div className="d-flex justify-content-start info-background mb-2">
                      <h5 className="mb-1 profile-email">Email: <span>{userEmail}</span></h5>
                    </div>
                    <div className="btns pt-3">
                      <Link to="myorder">
                        <button type="button" className="btn btn-custom">My Orders</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </div>
  );
}