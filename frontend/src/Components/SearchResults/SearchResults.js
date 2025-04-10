import React from 'react';
import Item from '../Item/Item';
import { useLocation } from 'react-router-dom';
import "./SearchResults.css"
const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="search-results-page">
      <div className='cart-search-results'>

      
    <h2>Kết quả tìm kiếm</h2>
    <div className='results'>
    {results.length > 0 ? (
      results.map((product) => (
        <Item
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          new_price={product.new_price}
          old_price={product.old_price}
        />
      ))
    ) : (
      <p>Không tìm thấy sản phẩm phù hợp.</p>
    )}
    </div>
  </div>
  </div>
  );
};

export default SearchResults;
