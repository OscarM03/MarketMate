import Product from "../models/Product.js";
import Store from "../models/Store.js";
import User from "../models/User.js";
import uploadToCloudinary from "../utils/imageCloudinaryUpload.js";
import fs from "fs";

const createProduct = async (req, res) => {
    const { name, description, price, category, stock, brand, unit, source } =
        req.body;

    const vendorId = req.user._id;
    try {
        const user = await User.findById(vendorId);
        if (!user || user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only vendors can create products",
            });
        }

        const [imageUrl, galleryUrls] = await Promise.all([
            uploadToCloudinary(req.files.imageFile[0].path).then((url) => {
                fs.unlinkSync(req.files.imageFile[0].path);
                return url;
            }),
            req.files?.galleryFiles?.length
                ? Promise.all(
                      req.files.galleryFiles.map(async (image) => {
                          const url = await uploadToCloudinary(image.path);
                          fs.unlinkSync(image.path);
                          return url;
                      })
                  )
                : Promise.resolve([]),
        ]);

        const store = await Store.findOne({ owner: vendorId });
        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found for the vendor",
            });
        }
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            brand,
            productImage: imageUrl,
            unit,
            source,
            vendor: vendorId,
            store: store._id,
            gallery: galleryUrls,
        });

        await newProduct.save();
        store.products.push(newProduct._id);
        await store.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
        });
    }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const vendorId = req.user._id;

    try {
        const updatedData = {};
        const allowedFields = [
            "name",
            "description",
            "price",
            "category",
            "stock",
            "brand",
            "unit",
            "source",
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        });

        // Handle productImage update
        if (req.files && req.files.imageFile) {
            const imageUrl = await uploadToCloudinary(
                req.files.imageFile[0].path
            );
            fs.unlinkSync(req.files.imageFile[0].path);
            updatedData.productImage = imageUrl;
        }

        // Handle gallery update (replace gallery with new images)
        let newGalleryImages = [];
        if (
            req.files &&
            req.files.galleryFiles &&
            req.files.galleryFiles.length > 0
        ) {
            const galleryUrls = await Promise.all(
                req.files.galleryFiles.map(async (image) => {
                    const url = await uploadToCloudinary(image.path);
                    fs.unlinkSync(image.path);
                    return url;
                })
            );
            newGalleryImages = galleryUrls;
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, vendor: vendorId },
            {
                $set: {
                    ...updatedData,
                },
                $push: {
                    gallery: {
                        $each: newGalleryImages,
                        $slice: -7, // Keep only the last 7 images
                    },
                },
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message:
                    "Product not found or you don't have permission to update it",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: "Error updating product",
        });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const vendorId = req.user._id;

    try {
        const deletedProduct = await Product.findOneAndDelete({
            _id: productId,
            vendor: vendorId,
        });

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message:
                    "Product not found or you don't have permission to delete it",
            });
        }

        // Remove product from store
        const store = await Store.findOne({ owner: vendorId });
        if (store) {
            store.products.pull(deletedProduct._id);
            await store.save();
        }

        res.status(200).json({
            success: true,
            data: deletedProduct,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting product",
        });
    }
};

const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId).populate(
            "store",
            "storeImage name description"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching product",
        });
    }
};

const getAllProducts = async (req, res) => {
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
                      { category: { $regex: query, $options: "i" } },
                      { brand: { $regex: query, $options: "i" } },
                      { source: { $regex: query, $options: "i" } },
                  ],
              }
            : {};

        const products = await Product.find(filter)
            .select("_id name description price productImage")
            .populate("store" , "name")
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                totalItems: totalProducts,
                totalPages: Math.ceil(totalProducts / pageSize),
                currentPage: page,
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
        });
    }
};

const getProductsByStore = async (req, res) => {
    const { storeId } = req.params;
    const { page = 1 } = req.query;
    const pageSize = 10;

    try {
        const products = await Product.find({ store: storeId })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments({ store: storeId });

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                totalItems: totalProducts,
                totalPages: Math.ceil(totalProducts / pageSize),
                currentPage: page,
            },
        });
    } catch (error) {
        console.error("Error fetching products by store:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products by store",
        });
    }
};

const getAllVendorProducts = async (req, res) => {
    const vendorId = req.user._id;
    console.log("Vendor ID:", vendorId);
    const { page = 1 } = req.query;
    const pageSize = 10;

    try {
        const user = await User.findById(vendorId);
        if (!user || user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only vendors can access their products",
            });
        }
        const products = await Product.find({ vendor: vendorId })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments({
            vendor: vendorId,
        });

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                totalItems: totalProducts,
                totalPages: Math.ceil(totalProducts / pageSize),
                currentPage: page,
            },
        });
    } catch (error) {
        console.error("Error fetching vendor products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching vendor products",
        });
    }
};

const getProductByVendorId = async (req, res) => {
    const vendorId = req.user._id;
    const { productId } = req.params;

    try {
        const user = await User.findById(vendorId);
        if (!user || user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only vendors can access their products",
            });
        }
        const product = await Product.findOne({
            _id: productId,
            vendor: vendorId,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching product",
        });
    }
};

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    getProductsByStore,
    getAllVendorProducts,
    getProductByVendorId,
};
