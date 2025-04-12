import React from 'react';
import { useLocation } from 'react-router-dom';
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="search-results-container">
      <div className="cart-search-results">
        <h2>Kết quả tìm kiếm</h2>

        <div className="results">
          {results.length > 0 ? (
            results.map((product) => (
              <div className="search-result-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-result-image"
                />
                <div className="search-result-info">
                  <p>{product.name}</p>
                  <p style={{ fontWeight: "bold", color: "#333" }}>
                    {product.new_price} ₫
                  </p>
                  <p style={{ textDecoration: "line-through", color: "#888" }}>
                    {product.old_price} ₫
                  </p>
                  <button>Thêm vào giỏ</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">Không tìm thấy sản phẩm phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
