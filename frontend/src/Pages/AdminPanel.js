import React, { useEffect, useState } from "react";
import useAdminStore from "../store/useAdminStore";
import "./AdminPanel.css";

const AdminPanel = () => {
    const {
        products,
        fetchAllProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        users,
        fetchAllUsers,
        deleteUser,
        orders,
        fetchAllOrders,
    } = useAdminStore();

    const [activeTab, setActiveTab] = useState("users");
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        new_price: "", // Thêm trường new_price
        category: "",
        is_popular: false,
        is_new: false,
        image: "",
        stock: 0,
    });
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch dữ liệu khi tab thay đổi
    useEffect(() => {
        if (activeTab === "users") fetchAllUsers();
        else if (activeTab === "products") fetchAllProducts();
        else if (activeTab === "orders") fetchAllOrders();
    }, [activeTab]);

    const handleDeleteUser = async (id) => {
        const success = await deleteUser(id);
        if (success) {
            console.log("Đã xóa người dùng");
        }
    };

    const handleDeleteProduct = async (id) => {
        const success = await deleteProduct(id);
        if (success) {
            console.log("Sản phẩm đã được xóa thành công:", id);
            fetchAllProducts(); // Tải lại danh sách sản phẩm
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setActiveTab("editProduct");
    };

    const handleAddProduct = async () => {
        const success = await createProduct(newProduct);
        if (success) {
            console.log("Sản phẩm đã được thêm thành công:", success);
            fetchAllProducts(); // Tải lại danh sách sản phẩm
            setActiveTab("products"); // Quay lại tab danh sách sản phẩm
        }
    };

    const handleUpdateProduct = async () => {
        const success = await updateProduct(editingProduct._id, editingProduct);
        if (success) {
            console.log("Sản phẩm đã được cập nhật thành công:", success);
            fetchAllProducts();
            setActiveTab("products");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result }); // Lưu base64 của ảnh vào state
            };
            reader.readAsDataURL(file);
        }
    };

    const renderAddProductTab = () => (
        <div>
            <h2>Thêm Sản Phẩm</h2>
            <form>
                <div>
                    <label>Tên sản phẩm</label>
                    <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Mô tả</label>
                    <textarea
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, description: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Giá</label>
                    <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Giá mới</label>
                    <input
                        type="number"
                        value={newProduct.new_price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, new_price: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Loại</label>
                    <input
                        type="text"
                        value={newProduct.category}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, category: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Hình ảnh</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                    />
                </div>
                <div>
                    <label>Số lượng</label>
                    <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={newProduct.is_popular}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, is_popular: e.target.checked })
                            }
                        />
                        Phổ biến
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={newProduct.is_new}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, is_new: e.target.checked })
                            }
                        />
                        Mới
                    </label>
                </div>
                <button type="button" onClick={handleAddProduct}>
                    Thêm
                </button>
            </form>
        </div>
    );

    const renderEditProductTab = () => (
        <div>
            <h2>Sửa Sản Phẩm</h2>
            <form>
                <div>
                    <label>Tên sản phẩm</label>
                    <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Mô tả</label>
                    <textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Giá</label>
                    <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Giá mới</label>
                    <input
                        type="number"
                        value={editingProduct.new_price}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, new_price: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Loại</label>
                    <input
                        type="text"
                        value={editingProduct.category}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, category: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Hình ảnh</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                    />
                </div>
                <div>
                    <label>Số lượng</label>
                    <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, stock: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={editingProduct.is_popular}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, is_popular: e.target.checked })
                            }
                        />
                        Phổ biến
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={editingProduct.is_new}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, is_new: e.target.checked })
                            }
                        />
                        Mới
                    </label>
                </div>
                <button type="button" onClick={handleUpdateProduct}>
                    Lưu
                </button>
            </form>
        </div>
    );

    // Giao diện từng tab
    const renderUsersTab = () => (
        <div>
            <h2>Danh sách người dùng</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderProductsTab = () => (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <button
                className="add-button mb-3"
                onClick={() => setActiveTab("addProduct")}
            >
                Thêm Sản Phẩm
            </button>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Loại</th>
                        <th>Giá cũ</th>
                        <th>Giá mới</th>
                        <th>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.old_price} VNĐ</td>
                            <td>{product.new_price} VNĐ</td>
                            <td>{product.stock}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditProduct(product)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteProduct(product._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderOrdersTab = () => (
        <div>
            <h2>Danh sách đơn hàng</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID Đơn hàng</th>
                        <th>Tên người nhận</th>
                        <th>Địa chỉ giao hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId?.username || order.userId || "Không xác định"}</td>
                            <td>{order.shippingAddress}</td>
                            <td>{order.total_price} VNĐ</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    // Giao diện chính

    return (
        <div className="container-fluid" style={{ margin: "0" }}>
            <div className="row">
                {/* Sidebar */}
                <div className="col-3">
                    <div className="sidebar p-3 bg-light vh-100">
                        <h4 className="mb-4">Admin Panel</h4>
                        <ul className="list-unstyled">
                            <li>
                                <button
                                    className={`details btn btn-link w-100 text-start ${activeTab === "users" ? "fw-bold" : ""}`}
                                    onClick={() => setActiveTab("users")}
                                >
                                    Quản lý Users
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`details btn btn-link w-100 text-start ${activeTab === "products" ? "fw-bold" : ""}`}
                                    onClick={() => setActiveTab("products")}
                                >
                                    Quản lý Sản phẩm
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`details btn btn-link w-100 text-start ${activeTab === "orders" ? "fw-bold" : ""}`}
                                    onClick={() => setActiveTab("orders")}
                                >
                                    Quản lý Đơn hàng
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Nội dung chính */}
                <div className="col-9 p-4">
                    <div className="bg-white rounded shadow p-4">
                        {activeTab === "users" && renderUsersTab()}
                        {activeTab === "products" && renderProductsTab()}
                        {activeTab === "orders" && renderOrdersTab()}
                        {activeTab === "addProduct" && renderAddProductTab()}
                        {activeTab === "editProduct" && renderEditProductTab()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
