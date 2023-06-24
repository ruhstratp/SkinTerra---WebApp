import React, { useState, useEffect, useContext } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../services/cartContext";
import AddToCartButton from "../services/addToCart";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";
import "../assets/css/productPage.css";
import StarRating from "../services/starRatings";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [sections, setSections] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    rating: 0,
    content: "",
  });

  const userToken = localStorage.getItem("authToken");

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  };

  const fetchReviews = async () => {
    if (!userToken) {
      return;
    }

    try {
      const reviewsResponse = await axios.get(
        `http://localhost:5001/api/reviews/product/${productId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const sortedReviews = reviewsResponse.data.sort(
        (a, b) => b.likes - a.likes
      );
      setReviews(sortedReviews);
    } catch (error) {
      return <ErrorPage />;
    }
  };
  const fetchProduct = async () => {
    const config = userToken
      ? { headers: { Authorization: `Bearer ${userToken}` } }
      : undefined;

    try {
      const productResponse = await axios.get(
        `http://localhost:5001/api/products/${productId}`,
        config
      );
      setProduct(productResponse.data);
    } catch (error) {
      return <ErrorPage />;
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    setLikedReviews(getLocalStorage("likedReviews", []));
    setDislikedReviews(getLocalStorage("dislikedReviews", []));
  }, [productId]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return "N/A";
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    return averageRating;
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const showAllReviews = () => {
    setReviewsToShow(reviews.length);
  };

  const toggleSection = (section) => {
    setSections({ ...sections, [section]: !sections[section] });
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    setReview({ ...review, rating: newRating });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!userToken) {
      alert("Please log in to submit a review.");
      return;
    }

    const newReview = {
      text: review.content,
      rating: review.rating,
    };
    try {
      const response = await axios.post(
        `http://localhost:5001/api/reviews/product/${productId}`,
        newReview,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setReviews([...reviews, response.data]);
      setReview({ rating: 0, content: "", likes: 0, dislikes: 0 });
    } catch (error) {
      return <ErrorPage />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const hasUserLiked = (reviewId) => {
    return likedReviews.includes(reviewId);
  };

  const hasUserDisliked = (reviewId) => {
    return dislikedReviews.includes(reviewId);
  };

  const likeReview = async (reviewId, currentLikes, currentDislikes) => {
    if (!userToken) {
      alert("Please log in to like reviews.");
      return;
    }
    if (hasUserLiked(reviewId)) {
      alert("You have already liked this review.");
      return;
    }

    const newLikes = currentLikes + 1;
    const newDislikes = hasUserDisliked(reviewId)
      ? currentDislikes - 1
      : currentDislikes;

    setLikedReviews([...likedReviews, reviewId]);
    setLocalStorage("likedReviews", [...likedReviews, reviewId]);
    setDislikedReviews(dislikedReviews.filter((id) => id !== reviewId));
    setLocalStorage(
      "dislikedReviews",
      dislikedReviews.filter((id) => id !== reviewId)
    );

    try {
      await axios.put(
        `http://localhost:5001/api/reviews/${reviewId}/likes`,
        { likes: newLikes },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      await axios.put(
        `http://localhost:5001/api/reviews/${reviewId}/dislikes`,
        { dislikes: newDislikes },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchReviews();
    } catch (error) {
      return <ErrorPage />;
    }
  };

  const dislikeReview = async (reviewId, currentLikes, currentDislikes) => {
    if (!userToken) {
      alert("Please log in to dislike reviews.");
      return;
    }

    if (hasUserDisliked(reviewId)) {
      alert("You have already disliked this review.");
      return;
    }

    const newLikes = hasUserLiked(reviewId) ? currentLikes - 1 : currentLikes;
    const newDislikes = currentDislikes + 1;

    setLikedReviews(likedReviews.filter((id) => id !== reviewId));
    setLocalStorage(
      "likedReviews",
      likedReviews.filter((id) => id !== reviewId)
    );
    setDislikedReviews([...dislikedReviews, reviewId]);
    setLocalStorage("dislikedReviews", [...dislikedReviews, reviewId]);

    try {
      await axios.put(
        `http://localhost:5001/api/reviews/${reviewId}/likes`,
        { likes: newLikes },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      await axios.put(
        `http://localhost:5001/api/reviews/${reviewId}/dislikes`,
        { dislikes: newDislikes },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchReviews();
    } catch (error) {
      return <ErrorPage />;
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <div className="product-details">
        <div className="product-left">
          <div className="image-container">
            <img
              src={require(`../assets/img/${product.image}`)}
              alt={product.name}
            />
          </div>
          <div className="product-info">
            <h3 onClick={() => toggleSection("details")}>
              Product Details <span>{sections.details ? "-" : "+"}</span>
            </h3>
            {sections.details && (
              <div className="details">
                <p>{product.details}</p>
              </div>
            )}
            <h3 onClick={() => toggleSection("usage")}>
              How to use <span>{sections.usage ? "-" : "+"}</span>
            </h3>
            {sections.usage && (
              <div className="usage">
                <p>{product.usage}</p>
              </div>
            )}
            <h3 onClick={() => toggleSection("ingredients")}>
              Ingredients <span>{sections.ingredients ? "-" : "+"}</span>
            </h3>
            {sections.ingredients && (
              <div className="ingredients">
                <p>
                  {product.ingredients
                    ? product.ingredients.toUpperCase()
                    : "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="product-right">
          <h2>{product.name}</h2>
          <h2>{product.type}</h2>
          <h4>{product.shortDescription}</h4>
          <p>
            <span className="stars">★★★★★</span> ({calculateAverageRating()}){" "}
            <span className="total-reviews">({reviews.length} reviews)</span>
          </p>
          <div className="add-to-cart-container">
            <div className="quantity-container">
              <button className="quantity-button" onClick={decrementQuantity}>
                -
              </button>
              <input
                className="quantity-input"
                type="number"
                value={quantity}
                min="1"
                readOnly
              />
              <button className="quantity-button" onClick={incrementQuantity}>
                +
              </button>
            </div>
            <AddToCartButton
              className="add-to-cart-button"
              product={product}
              quantity={quantity}
              onAddToCart={(quantity) => {
                handleAddToCart(product, quantity);
              }}
            />
          </div>

          <hr />

          <div className="reviews-section">
            <h3>Write a review</h3>
            <form className="review-form" onSubmit={submitReview}>
              <label htmlFor="rating">Rating</label>
              <StarRating
                rating={userRating}
                onRatingChange={handleRatingChange}
              />
              <label>
                Review:
                <textarea
                  name="content"
                  value={review.content}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <button type="submit">Submit Review</button>
            </form>
            <h3>Review Highlights</h3>
            <ul className="review-list">
              {reviews.slice(0, reviewsToShow).map((review, index) => (
                <li key={index}>
                  <p>Rating: {review.rating}/5</p>
                  <p className="review-text">{review.text}</p>
                  <button
                    className="like-btn"
                    onClick={() =>
                      likeReview(review._id, review.likes, review.dislikes)
                    }
                    disabled={hasUserLiked(review._id)}
                  >
                    <FaThumbsUp /> ({review.likes})
                  </button>
                  <button
                    className="dislike-btn"
                    onClick={() =>
                      dislikeReview(review._id, review.likes, review.dislikes)
                    }
                    disabled={hasUserDisliked(review._id)}
                  >
                    <FaThumbsDown /> ({review.dislikes})
                  </button>
                </li>
              ))}
            </ul>
            {reviewsToShow < reviews.length && (
              <button className="read-all-btn" onClick={showAllReviews}>
                Read all reviews
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
