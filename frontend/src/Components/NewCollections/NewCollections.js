import React, { useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import useProductStore from '../../store/useProductStore';

const NewCollections = () => {
    const { products, fetchProductsByCategory, loading, error } = useProductStore();

    useEffect(() => {
        fetchProductsByCategory("kid"); // Giả sử "new" là danh mục cho các bộ sưu tập mới
    }, [fetchProductsByCategory]);

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />

            {loading && <p>Đang tải...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="collections">
                {products.length > 0 ? (
                    products.map((item) => (
                        <Item
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    ))
                ) : (
                    <p>Không có sản phẩm mới nào.</p>
                )}
            </div>
        </div>
    );
};

export default NewCollections;
