import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://example.com/default-profile-picture.png",
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'user',
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);