import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./categories.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { UserContext } from "../../../context/User";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Categories() {
  const { userName } = useContext(UserContext);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}categories/active?&limit=9`
      );
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {Categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="category card shadow-sm mb-5" style={{ width: "85%" }}>
                <img
                  src={category.image.secure_url}
                  className="card-img-top"
                  alt="category"
                />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  {userName && (
                    <Link
                      className="btnq btn btn-primary btn-lg"
                      to={`/categories/${category._id}`}
                    >
                      Details
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
