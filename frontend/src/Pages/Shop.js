import React, { useEffect } from 'react';
import useProductStore from '../store/useProductStore';
import Item from '../Components/Item/Item';
import DescribeUs from '../Components/DescribeUs/DescribeUs';
import './Shop.css';

const Shop = () => {
    const {
        popularProducts,
        newCollection,
        fetchPopularProducts,
        fetchNewCollection,
        loading,
        error
    } = useProductStore();

    useEffect(() => {
        fetchPopularProducts();
        fetchNewCollection();
    }, []);

    return (
        <div className="shop-page">
            {/* === PHỔ BIẾN CHO NỮ === */}
            <section style={{ marginBottom: '3rem' }}>
                <h2>PHỔ BIẾN CHO NỮ</h2>
                <hr />
                {loading && <p>Đang tải...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="grid-container">
                    {popularProducts.map(product => (
                        <Item
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            new_price={product.new_price}
                            old_price={product.old_price}
                        />
                    ))}
                </div>
            </section>

            {/* === BỘ SƯU TẬP MỚI === */}
            <section style={{ marginBottom: '3rem' }}>
                <h2>BỘ SƯU TẬP MỚI</h2>
                <hr />
                {loading && <p>Đang tải...</p>}
                <div className="grid-container">
                    {newCollection.slice(0, 8).map(product => (  /* Lọc 8 sản phẩm đầu tiên */
                        <Item
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            new_price={product.new_price}
                            old_price={product.old_price}
                        />
                    ))}
                </div>
            </section>

            {/* === Giới thiệu về chúng tôi === */}
            <DescribeUs />
        </div>
    );
};

export default Shop;
