import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            storeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Store",
                required: true,
            },
            quantity: { type: Number, required: true, min: 1, default: 1 },
        },
    ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
