import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { createProduct, deleteProduct, getAllProducts, getAllVendorProducts, getProductById, getProductByVendorId, getProductsByStore, updateProduct } from "../controllers/products-controller.js";
import uploadMiddleware from "../middleware/upload-middleware.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    uploadMiddleware.fields([
        { name: "imageFile", maxCount: 1 },
        { name: "galleryFiles", maxCount: 7 },
    ]),
    createProduct
);
router.put(
    "/update/:productId",
    authMiddleware,
    uploadMiddleware.fields([
        { name: "imageFile", maxCount: 1 },
        { name: "galleryFiles", maxCount: 7 },
    ]),
    updateProduct
);
router.delete("/delete/:productId", authMiddleware, deleteProduct);
router.get("/vendor/:productId", authMiddleware, getProductByVendorId);
router.get("/store/:storeId", authMiddleware, getProductsByStore);
router.get("/all", getAllProducts);
router.get("/vendor", authMiddleware, getAllVendorProducts);
router.get("/:productId", authMiddleware, getProductById);


export default router;