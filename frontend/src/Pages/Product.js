import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import useProductStore from '../store/useProductStore';

const Product = () => {
    const { productId } = useParams();
    const {
        product,
        loading,
        error,
        fetchProductById,
    } = useProductStore();

    useEffect(() => {
        if (productId) {
            console.log("productId từ URL:", productId);
            fetchProductById(productId);
        }
    }, [productId, fetchProductById]);

    if (loading) return <div>Đang tải sản phẩm...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Không tìm thấy sản phẩm!</div>;

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
};

export default Product;
