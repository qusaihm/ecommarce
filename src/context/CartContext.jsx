import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartCounter, setCartCounter] = useState(0);

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCounter(cart.length);
  };

  useEffect(() => {
    getCartCount();

    // Listen for cart updates
    window.addEventListener("storage", getCartCount);
    return () => window.removeEventListener("storage", getCartCount);
  }, []);

  return (
    <CartContext.Provider value={{ cartCounter, setCartCounter, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;