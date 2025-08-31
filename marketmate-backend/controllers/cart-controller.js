import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const createCart = async (req, res) => {
    const { productId, quantity, storeId } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const cartItem = new Cart({
            userId,
            cartItems: [
                {
                    productId,
                    storeId,
                    quantity,
                },
            ],
        });

        await cartItem.save();

        return res.status(201).json({
            success: true,
            message: "Cart created successfully",
            data: cartItem,
        });
    } catch (error) {
        console.error("Error creating cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating cart",
        });
    }
};

const updateCart = async (req, res) => {
    const { productId, quantity, cartId } = req.body;
    const userId = req.user._id;

    try {
        const cartItem = await Cart.findOneAndUpdate(
            { userId, _id: cartId, "cartItems.productId": productId },
            { $set: { "cartItems.$.quantity": quantity } },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cartItem,
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating cart",
        });
    }
};

const deleteCartItem = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const cartItem = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { cartItems: { productId } } },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            data: cartItem,
        });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting cart item",
        });
    }
};

const deleteCart = async (req, res) => {
    const { cartId } = req.params;
    const userId = req.user._id;

    try {
        const deletedCart = await Cart.findOneAndDelete({ _id: cartId, userId });
        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found or already deleted",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart deleted successfully",
            data: deletedCart,
        });
    } catch (error) {
        console.error("Error deleting cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting cart",
        });
    }
}

const addItemToCart = async (req, res) => {
    const { productId, quantity, storeId } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const cart = await Cart.findOneAndUpdate(
            { userId, },
            { $addToSet: { cartItems: { productId, storeId, quantity } } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            data: cart,
        });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error adding item to cart",
        });
    }
};

const getCartByUserId = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId })
        .populate('cartItems.productId', 'name price productImage')
        .populate('cartItems.storeId', 'name latitude longitude address');
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart,
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching cart",
        });
    }
};

export { createCart, updateCart, deleteCartItem, deleteCart, getCartByUserId, addItemToCart };
