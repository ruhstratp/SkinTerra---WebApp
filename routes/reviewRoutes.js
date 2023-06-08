const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../auth/authMiddleware');

// Review routes
router.post('/product/:productId',protect, reviewController.createReview);
router.get('/:reviewId', reviewController.getReview);
router.get('/product/:productId', reviewController.getReviewsByProduct);
router.put('/:reviewId', protect, reviewController.updateReview);
router.put('/:reviewId/likes', protect, reviewController.updateLikes);
router.put('/:reviewId/dislikes',protect, reviewController.updateDislikes);
router.delete('/:reviewId', protect, reviewController.deleteReview);

module.exports = router;
