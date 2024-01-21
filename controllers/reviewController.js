const Review = require('../models/Review');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;



exports.createReview = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    console.log('req.user._id:', req.user._id);
    console.log('req.params.productId:', req.params.productId);

     const productId = parseInt(req.params.productId, 10);

    console.log('productId:', productId);

    const review = await Review.create({
      text: req.body.text,
      rating: req.body.rating,
      author: req.user._id,
      product: productId
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
        .populate('author', 'firstName lastName email');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const reviews = await Review.find({ product: productId })
        .populate('author', 'firstName lastName email');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (review.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'You are not authorized to update this review' });
    }
    review.text = req.body.text;
    review.rating = req.body.rating;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (review.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'You are not authorized to delete this review' });
    }
    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLikes = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.likes = req.body.likes;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDislikes = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.dislikes = req.body.dislikes;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
