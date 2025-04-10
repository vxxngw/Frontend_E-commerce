import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Contexts/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  // Hiển thị thông báo
  const showDropdownNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000); // 1 giây
  };

  // Xử lý chọn và bỏ chọn kích thước
  const handleSizeToggle = (size) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!selectedSize) {
      showDropdownNotification('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.');
      return;
    }
    addToCart(product.id, selectedSize);
    showDropdownNotification(`Đã thêm ${product.name} (Kích thước: ${selectedSize}) vào giỏ hàng!`);
  };

  // Mua ngay
  const handleBuyNow = () => {
    if (!selectedSize) {
      showDropdownNotification('Vui lòng chọn kích thước trước khi mua.');
      return;
    }
    addToCart(product.id, selectedSize);
    navigate('/payment');
  };

  return (
    <div className="productdisplay">
      {/* Thông báo dạng dropdown */}
      <div id="notification"></div>

      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={product.image} alt="Ảnh sản phẩm" />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="Ảnh sản phẩm chính" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="Đánh giá" />
          ))}
          <img src={star_dull_icon} alt="Đánh giá" />
          <p>(122 đánh giá)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Một chiếc áo nhẹ, thường được dệt kim, ôm sát cơ thể, có cổ tròn và tay ngắn, được mặc như một chiếc áo bên trong hoặc áo ngoài.
        </div>
        <div className="productdisplay-right-size">
          <h1>Chọn kích thước</h1>
          <div className="productdisplay-right-sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>
          <button className="buy-now-button" onClick={handleBuyNow}>
            MUA NGAY
          </button>
        </div>
        <p className="productdisplay-right-category">
          <span>Danh mục: </span>Phụ nữ, Áo phông, CropTop
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>Hiện đại, Mới nhất
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;