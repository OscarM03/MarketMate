import Store from "../models/Store.js";
import User from "../models/User.js";
import uploadToCloudinary from "../utils/imageCloudinaryUpload.js";
import fs from "fs";

const createStore = async (req, res) => {
    const {
        name,
        description,
        email,
        phone,
        latitude,
        longitude,
        address,
        facebook = "",
        instagram = "",
        tiktok = "",
        hours = "",
    } = req.body;
    const ownerId = req.user._id;

    try {
        const user = await User.findById(ownerId);
        if (!user || user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only vendors can create stores",
            });
        }

        let imageUrl;
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.path);
            fs.unlinkSync(req.file.path);
        }

        const newStore = new Store({
            name,
            description,
            email,
            phone,
            latitude,
            longitude,
            address,
            storeImage: imageUrl,
            facebook,
            instagram,
            tiktok,
            hours,
            owner: ownerId,
        });

        await newStore.save();
        res.status(201).json({
            success: true,
            data: newStore,
        });
    } catch (error) {
        console.error("Error creating store:", error);
        res.status(500).json({
            success: false,
            message: "Error creating store",
        });
    }
};

const updateStore = async (req, res) => {
    const { id } = req.params;
    const ownerId = req.user._id;
    try {
        // Build an update object with only provided fields
        const updateData = {};
        const allowedFields = [
            "name",
            "description",
            "email",
            "phone",
            "latitude",
            "longitude",
            "address",
            "facebook",
            "instagram",
            "tiktok",
            "hours",
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                if (["latitude", "longitude"].includes(field)) {
                    updateData[field] = parseFloat(req.body[field]);
                } else {
                    updateData[field] = req.body[field];
                }
            }
        });

        // Handle image upload if a new image is provided
        if (req.file) {
            // Upload to Cloudinary and get URL
            const imageUrl = await uploadToCloudinary(req.file.path);
            updateData.storeImage = imageUrl;
            // Delete local file
            fs.unlinkSync(req.file.path);
        }

        updateData.owner = ownerId; // Always ensure ownership

        const updatedStore = await Store.findOneAndUpdate(
            { _id: id, owner: ownerId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedStore) {
            return res.status(404).json({
                success: false,
                message:
                    "Store not found or you don't have permission to update it",
            });
        }

        res.status(200).json({
            success: true,
            message: "Store updated successfully",
            data: updatedStore,
        });
    } catch (error) {
        console.error("Error updating store:", error);
        res.status(500).json({
            success: false,
            message: "Error updating store",
        });
    }
};

const deleteStore = async (req, res) => {
    const { id } = req.params;
    const ownerId = req.user._id;

    try {
        const deletedStore = await Store.findOneAndDelete({
            _id: id,
            owner: ownerId,
        });

        if (!deletedStore) {
            return res.status(404).json({
                success: false,
                message:
                    "Store not found or you don't have permission to delete it",
            });
        }

        res.status(200).json({
            success: true,
            message: "Store deleted successfully",
            data: deletedStore,
        });
    } catch (error) {
        console.error("Error deleting store:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting store",
        });
    }
};

const getStoreById = async (req, res) => {
    const { id } = req.params;

    try {
        const store = await Store.findById(id).populate("products");

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found",
            });
        }

        res.status(200).json({
            success: true,
            data: store,
        });
    } catch (error) {
        console.error("Error fetching store:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching store",
        });
    }
};

const getAllStores = async (req, res) => {
    const { query = "" } = req.query;
    const page = Number(req.query.page) || 1;
    const pageSize = 10;

    try {
        //Build a filter
        const filter = query
            ? {
                  $or: [
                      { name: { $regex: query, $options: "i" } },
                      { description: { $regex: query, $options: "i" } },
                      { address: { $regex: query, $options: "i" } },
                  ],
              }
            : {};

        const stores = await Store.find(filter)
            .select("_id name description address storeImage products")
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        // .populate("owner", "name email");

        const totalStores = await Store.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: stores,
            pagination: {
                totalItems: totalStores,
                totalPages: Math.ceil(totalStores / pageSize),
                currentPage: page,
            },
        });
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching stores",
        });
    }
};

const getStoreByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user || user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only vendors can access their store",
            });
        }

        const store = await Store.findOne({ owner: userId });

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Store fetched successfully",
            data: store,
        });
    } catch (error) {
        console.error("Error fetching store by user ID:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching store",
        });
    }
};

export {
    createStore,
    updateStore,
    deleteStore,
    getStoreById,
    getAllStores,
    getStoreByUserId,
};
