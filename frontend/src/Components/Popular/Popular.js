import React, { useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import useProductStore from '../../store/useProductStore';


const Popular = () => {
    const { products, fetchPopularProducts, loading, error } = useProductStore();

    useEffect(() => {
        fetchPopularProducts();
    }, []);

    return (
        <div className='popular'>
            <h1>POPULAR IN WOMAN</h1>
            <hr />

            {loading && <p>Đang tải...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="popular-item">
                {products.map((item, index) => (
                    <Item
                        key={item._id || index}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;
