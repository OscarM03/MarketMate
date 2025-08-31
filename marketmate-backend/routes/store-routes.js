import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { createStore, updateStore, deleteStore, getAllStores, getStoreById, getStoreByUserId } from '../controllers/store-controllers.js';
import uploadMiddleware from '../middleware/upload-middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, uploadMiddleware.single('imageFile'), createStore);
router.put('/update/:id', authMiddleware, uploadMiddleware.single('imageFile'), updateStore);
router.delete('/delete/:id', authMiddleware, deleteStore);
router.get('/my-store', authMiddleware, getStoreByUserId);
router.get('/all', getAllStores);
router.get('/:id', getStoreById);

export default router;
