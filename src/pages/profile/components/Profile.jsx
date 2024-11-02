import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}user/profile`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setProfile(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <section
        className="w-100 px-4 py-5"
        style={{ backgroundColor: "#f1f5fb", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row d-flex justify-content-center">
          <div className="col col-md-9 col-lg-7 col-xl-6">
            <div
              className="card shadow-sm"
              style={{ borderRadius: 15, backgroundColor: "#ffffff" }}
            >
              <div className="card-body p-4">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      {profile.image && profile.image.secure_url ? (
                        <img
                          src={profile.image.secure_url}
                          alt={profile._id}
                          className="profile-image"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h3 className="mb-1 text-orange">
                        UserName:{" "}
                        <span className="fw-bold">{profile.userName}</span>
                      </h3>
                      <div className="d-flex justify-content-start info-background mb-2">
                        <h5 className="mb-1">
                          Email: <span>{profile.email}</span>
                        </h5>
                      </div>
                      <div className="btns pt-3">
                        <Link to="myorder">
                          <button type="button" className="btn btn-custom">
                            My Orders
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </div>
  );
}
