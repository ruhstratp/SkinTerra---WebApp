import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import "./App.css";
import chatboxIcon from "./assets/img/chatbox-icon6.png";
import Homepage from "./components/HomePage";
import Auth from "./components/Auth";
import Products from "./components/AllProducts";
import ProductDetails from './components/ProductPage';
import AboutPage from "./components/About";
import ContactPage from "./components/Contact";
import Orders from "./components/Orders";
import Dashboard from "./components/Dashboard";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";
import ErrorPage from "./components/ErrorPage";
import Chatbot from "./components/Chatbot";
import ResetPassword from "./components/ResetPassword";

function App() {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  const shouldShowChatbot =
    location.pathname === "/" ||
    location.pathname === "/products" ||
    location.pathname.startsWith("/product") ||
    location.pathname === "/contact" ||
    location.pathname === "/about";

  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/" element={<Homepage {...homepageData} />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
        </Routes>
      </main>
      {shouldShowChatbot && (
        <div className="toggle-chatbot" onClick={toggleChatbot}>
          <img className="chatbot-photo" src={chatboxIcon} alt="Chat Box" />
        </div>
      )}
    {showChatbot && <Chatbot isOpen={showChatbot} setIsOpen={setShowChatbot} />}
    </React.Fragment>
  );
}

export default App;










const header1Data = {
  image3: "/img/image-3@2x.png",
};

const homepageData = {
  welcometitle: "Welcome!",
  welcometext:
    "Are you tired of seeing hundreds of products and not knowing what to choose? I know what it's like, that's why I created this page to help you and recommend what suits you!",
  shopProducts: "Shop  products",
  welcomeimage1: "../rectangle.png",
  b1: "B",
  u1: "u",
  i1: "i",
  l1: "l",
  d: "d",
  text_Label1: "",
  c: "c",
  u2: "u",
  s1: "s",
  t1: "t",
  o: "o",
  m: "m",
  i2: "i",
  z: "z",
  a1: "a",
  b2: "b",
  l2: "l",
  e1: "e",
  text_Label2: "",
  b3: "b",
  e2: "e",
  a2: "a",
  u3: "u",
  t2: "t",
  y: "y",
  text_Label3: "",
  w: "w",
  i3: "i",
  t3: "t",
  h: "h",
  text_Label4: "",
  u4: "u",
  s2: "s",
  welcomeimage2: "/img/welcomePhoto2.png",
  mostImportantThing: "Most important thing",
  whatsYourSkinType: "What’s your skin type?",
  dehyskin: "/img/dehyskin@2x.png",
  dehydratedSkin: "Dehydrated",
  // overlapGroup1: "/img/oilyskin@2x.png",
  oilySkin: "Oily",
  // overlapGroup2: "/img/combskin@2x.png",
  combinationSkin: "Combination",
  dryskin: "/img/dryskin@2x.png",
  drySkin: "Dry",
  dontKnow: "Don’t know?",
  letsFindOutYour: "Let’s find out your skin type through this quiz:",
  takeQuiz: "Take Quiz",
  image1: "/img/image-1.png",
  title: "Our Bestsellers",

  skinterra: "SkinTerra.",
  subscribetext:
    "Sign up for email updates on products, launches, and events. Unsubscribe anytime",
  email: "Email",
  submit: "Submit",
  aboutSkinterra: "About SkinTerra",
  aboutUs: "About Us",
  career: "Career",
  companyBlog: "Company Blog",
  help: "Help",
  place: "Contact",
  freedomGiftCard: "Freedom Gift Card",
  returnExchanges: "Return & Exchanges",
  helpFaq: "Help & FAQ",
  contactUs: "Contact Us",
  address: (
    <React.Fragment>
      127 West 30th Street, 9th Floor
      <br />
      New York, NY 10001
    </React.Fragment>
  ),
  socials: "/img/socials@2x.png",
  privacyPolicy: "Privacy Policy",
  termsOfUse: "Terms Of Use",
  accessbility: "Accessbility",
  cookieSetting: "Cookie Setting",
  ellipse2: "/img/ellipse-2@2x.png",
  headerProps: header1Data,
};








