import React, { useContext } from "react";
import Categories from "../../categories/components/Categories";
import { UserContext } from "../../../context/User";
 

export default function Home() {
  return (
    <>
      <main className="  px-3  rowq p-5">
        <div className="part-a p-4">
          <img src="src/assets/image/img-1.png" alt="ecomerc" />
        </div>
        <div className="part-b">
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
