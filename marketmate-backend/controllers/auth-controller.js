import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/tokenGenerator.js";

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }

        // Validate role to prevent unauthorized admin registration
        if (role === "admin") {
            if (email !== process.env.ADMIN_EMAIL) {
                return res.status(403).json({
                    success: false,
                    message: "Only the owner can register as admin",
                });
            }

            // Admin should only be 1, so check if an admin already exists
            // This is to ensure that only one admin can be registered
            const existingAdmin = await User.findOne({ role: "admin" });
            if (existingAdmin) {
                return res
                    .status(403)
                    .json({ success: false, message: "Admin already exists" });
            }
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user", // Default to 'user' if no role is provided
        });

        await newUser.save();

        // Generate token for email verification
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.EMAIL_SECRET,
            { expiresIn: "15m" }
        );

        const activationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

        // Send email
        await sendEmail(
            newUser.email,
            "Confirm your MarketMate account",
            `<h1>Welcome to MarketMate</h1>
            <p>Click below to confirm your account:</p>
        <a href="${activationLink}">Verify Email</a>`
        );

        // Final response
        res.status(201).json({
            success: true,
            message:
                "User registered successfully. Please check your email to verify your account.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res
                .status(400)
                .json({ success: false, message: "Token is required" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

        // Find the user by ID from the token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Check if the user is already activated
        if (user.isActivated) {
            return res.status(400).json({
                success: false,
                code: "EMAIL_ALREADY_VERIFIED",
                message: "User is already verified",
            });
        }

        // Activate the user
        user.isActivated = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error("Error during email verification:", error);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res
                .status(400)
                .json({ success: false, message: "Verification link expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({
                success: false,
                message: "Invalid verification token",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Server error during verification",
        });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, please register",
            });
        }

        if (user.isActivated) {
            return res.status(400).json({
                success: false,
                code: "EMAIL_ALREADY_VERIFIED",
                message: "Email is already verified",
            });
        }

        // Create new token (expires in 15 minutes)
        const token = jwt.sign({ userId: user._id }, process.env.EMAIL_SECRET, {
            expiresIn: "15m",
        });

        const activationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

        await sendEmail(
            user.email,
            "Resend: Confirm your MarketMate account",
            `<h1>Email Verification</h1>
            <p>Click below to confirm your account:</p>
            <a href="${activationLink}">Verify Email</a>`
        );

        return res.status(200).json({
            success: true,
            message: "Verification email resent successfully",
        });
    } catch (error) {
        console.error("Resend error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist.",
            });
        }

        // Check if user is activated
        if (!user.isActivated) {
            return res.status(401).json({
                success: false,
                code: "EMAIL_NOT_VERIFIED",
                message: "Please verify your email before logging in.",
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        // Generate JWT token
        const { token: accessToken, expireTimeStamp } = generateAccessToken(
            user._id
        );
        const refreshToken = generateRefreshToken(user._id);

        // Store refresh token in DB (invalidate old one)
        user.refreshToken = refreshToken;
        await user.save();

        // Set refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            samesite: "strict", // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            accessToken: accessToken,
            expireTimeStamp: expireTimeStamp,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res
            .status(401)
            .json({ success: false, message: "Refresh token missing" })
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_JWT_SECRET
        );

        // Find user and check if stored refresh token matches
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Invalid or revoked refresh token",
                });
        }

        //Generate new access token
        const { token: newAccessToken, expiryTimeStamp } = generateAccessToken(user._id);

        //rotate refresh token (invalidation)
        // const newRefreshToken = generateRefreshToken(user._id);
        // user.refreshToken = newRefreshToken;
        // await user.save();

        // //Set new refresh token in cookie
        // console.log("Refreshing token now .....")
        // res.cookie("refreshToken", newRefreshToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            expiryTimeStamp: expiryTimeStamp,
        });
    } catch (err) {
        console.error("Refresh token error:", err.message);
        return res.status(403).json({
            success: false,
            message:
                err.name === "TokenExpiredError"
                    ? "Refresh token expired"
                    : "Invalid refresh token",
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If that email is registered, a reset link has been sent. Check your Email.",
            }); // Don't expose user existence
        }

        // Generate reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.RESET_PASSWORD_SECRET,
            { expiresIn: "15m" }
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        // Send reset email
        await sendEmail(
            user.email,
            "Reset your MarketMate password",
            `<h1>Reset Password</h1>
             <p>Click below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`
        );

        return res.status(200).json({
            success: true,
            message: "If that email is registered, a reset link has been sent. Check your Email.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Verify the reset token
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

        // Find the user by ID from the token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.isActivated) {
            return res.status(403).json({
                success: false,
                code: "USER_NOT_ACTIVATED",
                message: "User account is not activated",
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(400).json({
                success: false,
                code: "TOKEN_EXPIRED",
                message: "Reset token expired",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({
                success: false,
                message: "Invalid reset token",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

export {
    register,
    verifyEmail,
    resendVerificationEmail,
    login,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
};
