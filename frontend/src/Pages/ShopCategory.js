import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Contexts/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [filterCriteria, setFilterCriteria] = useState(''); // Trạng thái lưu tiêu chí lọc

    // Hàm lọc sản phẩm dựa trên tiêu chí đã chọn
    const filterProducts = () => {
        if (!filterCriteria) return all_product; // Nếu không có tiêu chí lọc, trả về toàn bộ sản phẩm

        return all_product.filter(item => {
            if (filterCriteria === 'priceLowToHigh') {
                return item; // Bạn có thể áp dụng logic sắp xếp sau
            } else if (filterCriteria === 'priceHighToLow') {
                return item; // Tương tự, logic sắp xếp khác
            } else if (filterCriteria === 'name') {
                return item.name.toLowerCase().includes(filterCriteria.toLowerCase()); // Lọc theo tên
            }
            return item;
        });
    };

    // Lọc các sản phẩm theo tiêu chí và sau đó chỉ hiển thị những sản phẩm phù hợp
    const filteredProducts = filterProducts();

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of {all_product.length} products
                </p>
                <div className="shopcategory-sort">
                    Sort by
                    <select onChange={(e) => setFilterCriteria(e.target.value)} value={filterCriteria}>
                        <option value="">Select</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="name">Name</option>
                    </select>
                    <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.map((item, index) => {
                    if (props.category === item.category) {
                        return (
                            <Item
                                key={index}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;
