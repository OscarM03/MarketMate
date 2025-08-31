import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        stock: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            default: "",
            trim: true,
        },
        productImage: {
            type: String,
            required: true,
            trim: true,
        },
        unit: {
            type: String,
            required: true,
            trim: true,
        },
        source: {
            type: String,
            required: true,
            trim: true,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
                default: [],
            },
        ],
        gallery: [
            {
                type: String,
                trim: true,
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
