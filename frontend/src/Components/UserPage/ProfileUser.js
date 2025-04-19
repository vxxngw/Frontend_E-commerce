import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const ProfileUser = () => {
    const { user, updateUser, isUpdating } = useAuthStore();
    const [name, setName] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || {
        street: "",
        city: "",
        district: "",
        ward: "",
        zipCode: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            setName(user.username || "");
            setEmail(user.email || "");
            setAvatar(user.avatar || "");
            setPhone(user.phone || "");
            setAddress(user.address || {
                street: "",
                city: "",
                district: "",
                ward: "",
                zipCode: ""
            });
        }
    }, [user, navigate]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        updateUser({ username: name, email, avatar, phone, address });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(user?.username || "");
        setEmail(user?.email || "");
        setAvatar(user?.avatar || "");
        setPhone(user?.phone || "");
        setAddress(user?.address || {
            street: "",
            city: "",
            district: "",
            ward: "",
            zipCode: ""
        });
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            {/* Sidebar */}
            <div className="profile-sidebar">
                <h2>Cài đặt tài khoản</h2>
                <ul>
                    <li className="profile-active">Thông tin cá nhân</li>
                    <li>Bảo mật</li>
                    <li>Nhóm</li>
                    <li>Thành viên</li>
                    <li>Thông báo</li>
                    <li>Thanh toán</li>
                    <li>Xuất dữ liệu</li>
                    <li className="profile-delete">Xóa tài khoản</li>
                </ul>
            </div>

            {/* Main content */}
            <div className="profile-main">
                {/* Header */}
                <div className="profile-section">
                    <div className="profile-header">
                        <div className="profile-info">
                            <img src={avatar || "https://via.placeholder.com/100"} alt="Avatar" />
                            <div>
                                <h3>{name}</h3>
                                <p>{`${address.city || ""}, ${address.district || ""}`}</p>
                            </div>
                        </div>
                        <div className="profile-edit-btn" onClick={() => setIsEditing(!isEditing)}>Chỉnh sửa ✎</div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="profile-section">
                    <div className="profile-header">
                        <h3>Thông tin cá nhân</h3>
                        <div className="profile-edit-btn" onClick={() => setIsEditing(!isEditing)}>Chỉnh sửa ✎</div>
                    </div>
                    <div className="profile-info-grid">
                        <div><strong>Tên</strong><span>{isEditing ? <input value={name} onChange={(e) => setName(e.target.value)} /> : name}</span></div>
                        <div><strong>Email</strong><span>{isEditing ? <input value={email} onChange={(e) => setEmail(e.target.value)} /> : email}</span></div>
                        <div><strong>Số điện thoại</strong><span>{isEditing ? <input value={phone} onChange={(e) => setPhone(e.target.value)} /> : phone}</span></div>
                    </div>
                </div>

                {/* Address */}
                <div className="profile-section">
                    <div className="profile-header">
                        <h3>Địa chỉ</h3>
                        <div className="profile-edit-btn" onClick={() => setIsEditing(!isEditing)}>Chỉnh sửa ✎</div>
                    </div>
                    <div className="profile-info-grid">
                        {isEditing ? (
                            <>
                                <div><strong>Đường</strong><input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} /></div>
                                <div><strong>Thành phố</strong><input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /></div>
                                <div><strong>Quận</strong><input value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} /></div>
                                <div><strong>Phường</strong><input value={address.ward} onChange={(e) => setAddress({ ...address, ward: e.target.value })} /></div>
                                <div><strong>Mã bưu chính</strong><input value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} /></div>
                            </>
                        ) : (
                            <div><span>{`${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.zipCode}`}</span></div>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                {isEditing && (
                    <div className="profile-buttons">
                        <button onClick={handleSave} disabled={isUpdating}>{isUpdating ? "Đang cập nhật..." : "Lưu"}</button>
                        <button onClick={handleCancel}>Hủy</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileUser;
