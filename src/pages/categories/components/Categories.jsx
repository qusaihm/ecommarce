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

const FAKESTORE_API = "https://fakestoreapi.com";

const categoryImages = {
  "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
  "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
  "men's clothing": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400",
  "women's clothing": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400",
};

export default function Categories() {
  const { userName } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${FAKESTORE_API}/products/categories`);
      const formatted = data.map((cat) => ({
        _id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        image: categoryImages[cat] || "https://via.placeholder.com/300",
      }));
      setCategories(formatted);
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
    <div className="categories-wrapper">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1.3, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 18 },
            992: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="category card shadow-sm mb-5">
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  {userName && (
                    <Link className="btnq btn btn-primary btn-lg" to={`/categories/${category._id}`}>
                      Details
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}