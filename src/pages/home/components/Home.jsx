import React from "react";
import Categories from "../../categories/components/Categories";
import homeImage from '../../../assets/image/img-1.png';
import "./home.css";

export default function Home() {
  return (
    <>
      <main className="home-hero px-3 p-5">
        <div className="home-image-wrapper p-4">
          <img src={homeImage} alt="ecommerce" className="home-image" />
        </div>
        <div className="home-text">
          <h1>We offer everything for you.</h1>
          <p className="lead">
            Our store provides everything you need in terms of merchandise, and
            there are various collections and exclusive offers that you can
            easily order from our website.
          </p>
        </div>
      </main>

      <Categories />
    </>
  );
}