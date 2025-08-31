import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
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
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        storeImage: {
            type: String,
            default: "https://example.com/default-profile-picture.png",
            trim: true,
        },
        facebook: {
            type: String,
            default: "",
        },
        instagram: { 
            type: String, 
            default: "" 
        },
        tiktok: { 
            type: String, 
            default: "" 
        },
        hours: { 
            type: String, 
            default: "" 
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
                default: [],
            },
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
