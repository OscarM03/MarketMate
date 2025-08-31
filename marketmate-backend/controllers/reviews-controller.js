import Product from "../models/Product.js";
import Review from "../models/Review.js";
import Store from "../models/Store.js";
import User from "../models/User.js";

const createReview = async (req, res) => {
    const { productId, storeId, rating, comment } = req.body;
    const reviewerId = req.user._id;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: "Rating must be between 1 and 5.",
        });
    }

    try {
        const user = await User.findById(reviewerId);
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only users can create reviews",
            });
        }

        let entity, query, reviewData;
        if (productId) {
            entity = await Product.findById(productId);
            if (!entity) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            query = { reviewer: reviewerId, product: productId };
            reviewData = {
                reviewer: reviewerId,
                product: productId,
                rating,
                comment,
            };
        } else {
            entity = await Store.findById(storeId);
            if (!entity) {
                return res.status(404).json({
                    success: false,
                    message: "Store not found",
                });
            }
            query = { reviewer: reviewerId, store: storeId };
            reviewData = {
                reviewer: reviewerId,
                store: storeId,
                rating,
                comment,
            };
        }

        const existingReview = await Review.findOne(query);
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already reviewed this entity. Please edit it under your reviews in the profile page.",
            });
        }

        const newReview = new Review(reviewData);
        await newReview.save();

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: newReview,
        });
    } catch (error) {
        console.error("Error creating review:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating review",
        });
    }
};

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user._id;

    try {
        const updatedData = {};
        const allowedFields = ["rating", "comment"];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        });

        updatedData.reviewer = userId;

        const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewId, reviewer: userId },
            { $set: updatedData },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message:
                    "Review not found or you are not authorized to edit it.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: updatedReview,
        });
    } catch (error) {
        console.error("Error updating review:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating review",
        });
    }
};

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user._id;

    try {
        const deletedReview = await Review.findOneAndDelete({
            _id: reviewId,
            reviewer: userId,
        });

        if (!deletedReview) {
            return res.status(404).json({
                success: false,
                message:
                    "Review not found or you are not authorized to delete it.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: deletedReview,
        });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting review",
        });
    }
};

// Get reviews for either a product or a store, depending on params
const getEntityReviews = async (req, res) => {
    const { productId, storeId } = req.params;

    try {
        let reviews;
        if (productId) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            reviews = await Review.find({ product: productId }).populate(
                "reviewer",
                "username"
            );
        } else if (storeId) {
            const store = await Store.findById(storeId);
            if (!store) {
                return res.status(404).json({
                    success: false,
                    message: "Store not found",
                });
            }
            reviews = await Review.find({ store: storeId }).populate(
                "reviewer",
                "username"
            );
        } else {
            return res.status(400).json({
                success: false,
                message: "Provide either productId or storeId in params.",
            });
        }

        return res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching reviews",
        });
    }
};

const getUsersReviews = async (req, res) => {
    const userId = req.user._id;

    try {
        const reviews = await Review.find({ reviewer: userId })
            .populate("product", "name productImage")
            .populate("store", "name storeImage");

        return res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user reviews",
        });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("reviewer", "username")
            .populate("product", "name productImage")
            .populate("store", "name storeImage")
            .sort({ createdAt: -1 }); // Sort by newest first or descending

        return res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching all reviews",
        });
    }
};

export { createReview, updateReview, deleteReview, getEntityReviews, getUsersReviews, getAllReviews };
