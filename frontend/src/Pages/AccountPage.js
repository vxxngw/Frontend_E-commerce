import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css'; // Nhớ nhập tệp CSS

const AccountPage = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // hoặc hiển thị loader
  }

  return (
    <div className="account-page container mt-5">
      <h2 className="mb-4">Thông tin tài khoản</h2>
      <div className="card p-4 shadow-sm">
        <p><strong>Họ và tên:</strong> {currentUser.name}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        {/* Thêm các thông tin khác nếu cần */}
        <button className="btn-edit">Chỉnh sửa thông tin</button>
      </div>
    </div>
  );
};

export default AccountPage;
