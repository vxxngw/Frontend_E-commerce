import Product from "../models/product.model.js";

export const insertManyProducts = async (req, res) => {
  try {
    const products = req.body; // Dữ liệu gửi từ frontend
    await Product.insertMany(products);
    res.status(201).json({ message: "Products added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add products", error });
  }
};
