import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../services/cartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";
import AddToCartButton from "../services/addToCart";

import AuthModal from "./AuthModal";
import AuthModalContext from "../services/authContext";
import useAuth from "../services/useAuth";

import "../assets/css/allProducts.css";

const Products = (props) => {
  const skinTypes = ["dry", "dehydrated", "oily", "combination"];
  const location = useLocation();
  const { addToCart } = useContext(CartContext);

  const { showLoginModal, toggleLoginModal } = useContext(AuthModalContext);
  const { loggedIn, onLoggedIn } = useAuth();

  // new state to hold fetched products
  const [fetchedProducts, setFetchedProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setFetchedProducts(response.data);
      } catch (error) {
        return <ErrorPage />;
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const skinType = searchParams.get("skinType");

    if (skinType) {
      const skinTypeElement = document.getElementById(skinType);
      if (skinTypeElement) {
        skinTypeElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.search, fetchedProducts]);

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  return (
    <>
      <Navbar />
      <AuthModal
        show={showLoginModal}
        onClose={toggleLoginModal}
        onLoggedIn={onLoggedIn}
      />
      <div className="shop-text">
        <div className="shop-all">Shop All</div>
        <div className="x16-items">(16 Items)</div>
      </div>

      <div className="all-products">
        {skinTypes.map((skinType) => {
          const skinTypeProducts = fetchedProducts.filter(
            (product) => product.skinType === skinType
          );

          return (
            <div key={skinType} id={skinType}>
              <h2 className="section-title">{`${skinType
                .charAt(0)
                .toUpperCase()}${skinType.slice(1)} Skin Routine`}</h2>

              <div className="description">
                {skinTypeProducts.map((product) => (
                  <div className="product-item" key={product.id}>
                    <Link
                      style={{ color: "transparent" }}
                      to={`/product/${product.id}`}
                    >
                      <img
                        className="product-image product1-1"
                        src={require(`../assets/img/${product.image}`)}
                        alt={product.name}
                      />

                      <h3 className="product-name">{product.name}</h3>
                    </Link>
                    <h3 className="product-type">{product.type}</h3>
                    <h4 className="product-ml">{product.ml}</h4>
                    <h4 className="product-step">{product.step}</h4>
                    <AddToCartButton
                      className="b39"
                      product={product}
                      quantity={1}
                      onAddToCart={(quantity) => {
                        handleAddToCart(product, quantity);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};
export default Products;
