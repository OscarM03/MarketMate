import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { addItemToCart, createCart, deleteCart, deleteCartItem, getCartByUserId, updateCart } from '../controllers/cart-controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createCart);
router.post('/update', authMiddleware, updateCart);
router.post('/add-item', authMiddleware, addItemToCart);
router.delete('/delete/item/:productId', authMiddleware, deleteCartItem);
router.delete('/delete/:cartId', authMiddleware, deleteCart)
router.get('/my-cart', authMiddleware, getCartByUserId);

export default router; 