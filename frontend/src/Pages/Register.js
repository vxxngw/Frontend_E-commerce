import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

function Register() {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Vui lòng nhập tên người dùng"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(6, "Mật khẩu tối thiểu 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
  });
  const handleSubmit = (values) => {
  // Lấy danh sách người dùng hiện tại từ localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra email đã tồn tại chưa
  const userExists = users.find(user => user.email === values.email);
  if (userExists) {
    alert("Email đã được đăng ký. Vui lòng sử dụng email khác.");
    return;
  }

  // Thêm người dùng mới
  const newUser = {
    username: values.username,
    email: values.email,
    password: values.password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users)); // Lưu vào localStorage

  alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập.");
  navigate("/login"); // Chuyển về trang Login
};

  return (
    <div className="formRegister d-flex justify-content-center text-align-center">
      <div
        className="row d-flex justify-content-center text-align-center form-main"
      >
        <div className="mm">
          <span className="title-main">Register</span>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="row" id="main-register">
              <div className="input-register-form">
                <div className="input-container">
                  <FontAwesomeIcon icon={faUser} className="icon-register" />
                  <Field
                    type="text"
                    name="username"
                    placeholder="Nhập tên người dùng"
                  />
                </div>
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="input-register-form">
                <div className="input-container">
                  <FontAwesomeIcon icon={faEnvelope} className="icon-register" />
                  <Field type="email" name="email" placeholder="Nhập email" />
                </div>
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-register-form">
                <div className="input-container">
                  <FontAwesomeIcon icon={faKey} className="icon-register" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <div className="input-register-form">
                <div className="input-container">
                  <FontAwesomeIcon icon={faKey} className="icon-register" />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <button type="submit" className="btn-login">Đăng Ký</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
