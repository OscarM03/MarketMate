import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { createReview, deleteReview, getAllReviews, getEntityReviews, getUsersReviews, updateReview } from '../controllers/reviews-controller.js';


const router = express.Router();

router.post('/create', authMiddleware, createReview);
router.post('/update/:reviewId', authMiddleware, updateReview);
router.delete('/delete/:reviewId', authMiddleware, deleteReview);
router.get('/product/:productId', authMiddleware, getEntityReviews);
router.get('/store/:storeId', authMiddleware, getEntityReviews);
router.get("/user-reviews", authMiddleware, getUsersReviews);
router.get('/all', authMiddleware, getAllReviews);


export default router;