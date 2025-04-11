// models/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["men", "women", "kid"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
  },
  description: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  stock: {
    type: Number,
    default: 0,
  },
  is_popular: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    default: "",
  },
  colors: {
    type: [String],
    default: [],
  },
  sizes: {
    type: [String],
    default: [], // ví dụ: ["S", "M", "L", "XL"]
  }
}, {
  timestamps: true,
});
export const Product = mongoose.model("Product", productSchema);

