import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        phone: {
            type: String,
        },
        address: {
            street: String,
            city: String,
            district: String,
            ward: String,
            zipCode: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            type: String, // URL ảnh đại diện
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);

