import React from "react";
import "./DescribeUs.css";
import about_us from "../Assets/aboutus.png";
import about_us_2 from "../Assets/aboutus_2.png";

const DescribeUs = () => {
  return (
    <div    >
        <div className='new-about'>
            <h1>ABOUT US</h1>
        </div>
    <div className="about-us-section isolate page-width">
      <div className="grid grid--1-col grid--2-col-tablet">
        {/* Hình ảnh minh họa */}
        <div className="grid-item about-us-image">
          <img src={about_us} alt="About Us" />
        </div>

        {/* Phần mô tả */}
        <div className="grid-item about-us-text">
          <h2>ABOUT US | LEVENTS</h2>
          <p>
            Chúng tôi là thương hiệu thời trang tiên phong trong việc mang đến
            các thiết kế đột phá, hiện đại và thân thiện với môi trường. Mỗi sản
            phẩm đều được chăm chút tỉ mỉ để tôn vinh phong cách và cá tính của
            bạn.
          </p>
          <p>
            Với sứ mệnh cung cấp thời trang bền vững, chúng tôi luôn đặt chất
            lượng và khách hàng làm trung tâm, góp phần xây dựng một cộng đồng
            thời trang Việt mạnh mẽ.
          </p>
        </div>
      </div>
    </div>
    <div className="about-us-section isolate page-width">
      <div className="grid grid--1-col grid--2-col-tablet">
        {/* Phần mô tả */}
        <div className="grid-item about-us-text">
          <h2>THE PRODUCT | 2024</h2>
          <p>
            Chúng tôi là thương hiệu thời trang tiên phong trong việc mang đến
            các thiết kế đột phá, hiện đại và thân thiện với môi trường. Mỗi sản
            phẩm đều được chăm chút tỉ mỉ để tôn vinh phong cách và cá tính của
            bạn.
          </p>
          <p>
            Với sứ mệnh cung cấp thời trang bền vững, chúng tôi luôn đặt chất
            lượng và khách hàng làm trung tâm, góp phần xây dựng một cộng đồng
            thời trang Việt mạnh mẽ.
          </p>
        </div>  
        {/* Hình ảnh minh họa */}
        <div className="grid-item about-us-image">
          <img src={about_us_2} alt="About Us" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default DescribeUs;
