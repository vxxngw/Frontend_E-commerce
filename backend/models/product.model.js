const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["men", "women", "kid"], // Các danh mục sản phẩm
    required: true,
  },
  image: {
    type: String,
    required: true, // Đường dẫn tới hình ảnh sản phẩm
  },
  new_price: {
    type: Number,
    required: true, // Giá mới của sản phẩm
  },
  old_price: {
    type: Number, // Giá cũ của sản phẩm (nếu có)
  },
  description: {
    type: String,
    default: "", // Mô tả sản phẩm
  },
  rating: {
    type: Number,
    default: 0, // Đánh giá sản phẩm
    min: 0,
    max: 5,
  },
  stock: {
    type: Number,
    default: 0, // Số lượng tồn kho
  },
  is_popular: {
    type: Boolean,
    default: false, // Đánh dấu sản phẩm nổi bật
  },
  tags: {
    type: [String],
    default: [], // Tags mô tả sản phẩm, ví dụ: ["mới", "bán chạy"]
  },
  sold: {
    type: Number,
    default: 0, // Số lượng đã bán
  },
  brand: {
    type: String,
    default: "", // Thương hiệu sản phẩm
  },
  colors: {
    type: [String],
    default: [], // Mảng các màu sắc sản phẩm có sẵn
  },
  sizes: {
    type: [String],
    default: [], // Mảng các kích thước sản phẩm có sẵn
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Người dùng đánh giá
    rating: { type: Number, required: true }, // Đánh giá của người dùng
    comment: { type: String, required: true }, // Bình luận của người dùng
    date: { type: Date, default: Date.now }, // Thời gian đánh giá
  }]
}, {
  timestamps: true, // Tự động thêm trường createdAt và updatedAt
});
module.exports = mongoose.model("Product", productSchema); // ✅
