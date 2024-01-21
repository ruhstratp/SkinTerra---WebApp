import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/homePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SkincareQuiz from "./SkincareQuiz";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

import welcomePhoto1 from "../assets/img/welcomePhoto1.png";
import welcomePhoto2 from "../assets/img/welcomePhoto2.png";
import welcomeArrow from "../assets/img/arrow-1.svg";
import dryskin from "../assets/img/dryskin.png";
import dehyskin from "../assets/img/dehyskin.png";
import oilyskin from "../assets/img/oilyskin.png";
import combskin from "../assets/img/combskin.png";
import ErrorPage from "./ErrorPage";

function Homepage(props) {
  const {
    welcometext,
    b1,
    u1,
    i1,
    l1,
    d,
    text_Label1,
    c,
    u2,
    s1,
    t1,
    o,
    m,
    i2,
    z,
    a1,
    b2,
    l2,
    e1,
    text_Label2,
    b3,
    e2,
    a2,
    u3,
    t2,
    y,
    text_Label3,
    w,
    i3,
    t3,
    h,
    text_Label4,
    u4,
    s2,
    dehydratedSkin,
    oilySkin,
    combinationSkin,
    drySkin,
    letsFindOutYour,
    title,
  } = props;

  const navigate = useNavigate();
  const navigateToSection = (skinType) => {
    console.log("Navigate to section:", skinType);
    navigate(`/products?skinType=${skinType}`);
  };

  const [topRatedProducts, setTopRatedProducts] = useState([]);

  const fetchTopRatedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/products/top-rated"
      );
      setTopRatedProducts(response.data);
    } catch (error) {
      return <ErrorPage />;
    }
  };

  useEffect(() => {
    fetchTopRatedProducts();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const topRatedToShow = topRatedProducts.slice(0, 5);

  return (
    <>
      <Navbar />
      <div className="container-center-horizontal">
        <div className="homepage screen">
          <div className="welcome-section">
            <div className="overlap-group6-1">
              <div className="flex-col-6">
                <div className="welcome-title abhayalibre-bold-creole-40px typewriter">
                  Welcome!
                </div>
                <p className="welcome-text actor-normal-woodsmoke-16px">
                  {welcometext}
                </p>
                <div className="shop-products-text">
                  <div className="shop-products-1 abhayalibre-normal-woody-brown-24px">
                    Shop products
                  </div>
                  <div className="overlap-group-10">
                    <Link to="/products">
                      <img className="arrow" src={welcomeArrow} alt="Arrow" />
                      <div className="ellipse"></div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="overlap-group7-1">
                <img
                  className="welcome-image1"
                  src={welcomePhoto1}
                  alt="WelcomeImage1"
                />
                <div className="text-circle abhayalibre-bold-bistre-16-1px">
                  <div className="overlap-group4-2">
                    <div className="overlap-group-11">
                      <div className="b-9">{b1}</div>
                      <div className="overlap-group2-3 abhayalibre-bold-bistre-16-1px">
                        <div className="u-12">{u1}</div>
                        <div className="i-9">{i1}</div>
                        <div className="l-6">{l1}</div>
                        <div className="d-3">{d}</div>
                        <div className="text_label-12">{text_Label1}</div>
                        <div className="c-3">{c}</div>
                        <div className="u-13">{u2}</div>
                        <div className="s-6">{s1}</div>
                        <div className="t-9">{t1}</div>
                        <div className="o-3">{o}</div>
                        <div className="m-3">{m}</div>
                        <div className="i-10">{i2}</div>
                        <div className="z-3">{z}</div>
                      </div>
                      <div className="a-6">{a1}</div>
                    </div>
                    <div className="b-10">{b2}</div>
                  </div>
                  <div className="overlap-group5-2">
                    <div className="overlap-group3-2">
                      <div className="l-7">{l2}</div>
                      <div className="e-6">{e1}</div>
                    </div>
                    <div className="overlap-group1-3 abhayalibre-bold-bistre-16-1px">
                      <div className="text_label-13">{text_Label2}</div>
                      <div className="b-11">{b3}</div>
                      <div className="e-7">{e2}</div>
                      <div className="a-7">{a2}</div>
                      <div className="u-14">{u3}</div>
                      <div className="t-10">{t2}</div>
                      <div className="y-3">{y}</div>
                      <div className="text_label-14">{text_Label3}</div>
                      <div className="w-3">{w}</div>
                      <div className="i-11">{i3}</div>
                      <div className="t-11">{t3}</div>
                      <div className="h-3">{h}</div>
                      <div className="text_label-15">{text_Label4}</div>
                      <div className="u-15">{u4}</div>
                    </div>
                    <div className="s-7">{s2}</div>
                  </div>
                </div>
              </div>
              <img
                className="welcome-image2"
                src={welcomePhoto2}
                alt="WelcomeImage2"
              />
            </div>
          </div>

          <div className="skin-types-section">
            <div className="most-important-thing-1 abrilfatface-normal-woodsmoke-40px">
              Most important thing
            </div>
            <div className="whats-your-skin-type-1 abyssinicasil-normal-woodsmoke-24px">
              What's your skin type?
            </div>
            <div className="gallery-container">
              <div
                className="skinimage-container"
                onClick={() => navigateToSection("oily")}
              >
                <img
                  className="skin-image skin-type-image"
                  src={oilyskin}
                  alt="oilyskin"
                />
                <div className="skin-label actor-normal-white-24px">
                  {oilySkin}
                </div>
              </div>
              <div
                className="skinimage-container"
                onClick={() => navigateToSection("dry")}
              >
                <img
                  className="skin-image skin-type-image"
                  src={dryskin}
                  alt="dryskin"
                />
                <div className="skin-label actor-normal-white-24px">
                  {drySkin}
                </div>
              </div>
              <div
                className="skinimage-container"
                onClick={() => navigateToSection("combination")}
              >
                <img
                  className="skin-image skin-type-image"
                  src={combskin}
                  alt="combskin"
                />
                <div className="skin-label actor-normal-white-24px">
                  {combinationSkin}
                </div>
              </div>
              <div
                className="skinimage-container"
                onClick={() => navigateToSection("dehydrated")}
              >
                <img
                  className="skin-image skin-type-image"
                  src={dehyskin}
                  alt="dehyskin"
                />
                <div className="skin-label actor-normal-white-24px">
                  {dehydratedSkin}
                </div>
              </div>
            </div>
          </div>
          <div className="quiz-section">
            <div className="quiz-container">
              <div className="quiz-text">
                <div className="dont-know">Don't know?</div>
                <p className="lets-find-out">{letsFindOutYour}</p>
              </div>
              <div className="quiz-component">
                <SkincareQuiz />
              </div>
            </div>
          </div>
          <div className="best-sellers">
            <div className="bestsellers-title">{title}</div>
            <div className="carousel-container">
              <div
                className="carousel-items"
                style={{
                  transform: `translateX(-${
                    (100 / topRatedToShow.length) * currentSlide
                  }%)`,
                }}
              >
                {topRatedToShow.map((product) => (
                  <div key={product._id} className="carousel-item">
                    <Link to={`/product/${product.id}`}>
                      <img
                        className="carousel-image"
                        src={require(`../assets/img/${product.image}`)}
                        alt={product.name}
                      />
                      <p className="product-name">{product.name}</p>
                    </Link>
                    <div className="product-desc">
                      {product.shortDescription}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bs-arrow-container">
              <div className="bs-arrow-right" onClick={handleNextClick}>
                <i className="bs-arrow fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
