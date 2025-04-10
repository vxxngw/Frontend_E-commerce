import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
    const handleSubmit = (values) => {
        // Lấy danh sách người dùng từ localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
      
        // Kiểm tra thông tin đăng nhập
        const user = users.find(
          user => user.email === values.email && user.password === values.password
        );
      
        if (user) {
          alert("Đăng nhập thành công!");
          navigate("/home"); // Chuyển hướng đến Home
        } else {
          alert("Email hoặc mật khẩu không chính xác. Hoặc tài khoản chưa được đăng ký.");
        }
      };
      
const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(6, "Mật khẩu tối thiểu 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  return (
    <div className="formLogin d-flex justify-content-center text-align-center">
      <div
        className="row d-flex justify-content-center text-align-center form-main"
      >
        <div className="mm">
          <span className="title-main">Login</span>
        </div>

        <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  <Form className="form-submit">
    <div className="row" id="main-login">
      <ErrorMessage name="email" component="div" className="error" />
      <div className="input-login-form">
        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} id="icon-login" />
        <Field type="email" name="email" placeholder="Nhập email" />
      </div>

      <ErrorMessage name="password" component="div" className="error" />
      <div className="input-login-form">
        <FontAwesomeIcon icon={faKey} style={{ marginRight: "8px" }} id="icon-login" />
        <Field type="password" name="password" placeholder="Nhập mật khẩu" />
      </div>
    </div>
    <button type="submit" className="btn-login">Đăng Nhập</button>
    
    {/* Liên kết Quên mật khẩu và Tạo tài khoản mới */}
    <div className="login-links">
      <Link to="/forget-password" className="forgot-password-link">
        Quên mật khẩu?
      </Link>
      <span className="separator">|</span>
      <Link to="/register" className="create-account-link">
        Tạo tài khoản mới
      </Link>
    </div>
  </Form>
</Formik>

      </div>
    </div>
  );
}

export default Login;
