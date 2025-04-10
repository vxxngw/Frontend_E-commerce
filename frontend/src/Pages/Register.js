import React, { useState } from "react";
import "./Resgiter.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImage from "../Components/Assets/IMG_Resgiter.png";
const Resgiter = () => {

  const [submitMessage, setSubmitMessage] = useState("");
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên"),
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Xác nhận mật khẩu"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // ✅ Hiển thị thông báo phía dưới
    setSubmitMessage("🎉 Đăng ký thành công!");
    resetForm(); // Xóa dữ liệu trong form sau khi đăng ký xong (tùy chọn)
  };

  return (
    <div className="resgiter-container">
      <div className="resgiter-form">
        <h2>Resgiter</h2>
        <p>Unlock your world.</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
            <label>Full Name</label>
            <Field name="name" type="text" placeholder="Enter your name" />
            <ErrorMessage name="name" component="div" className="error" />

            <label>Email</label>
            <Field name="email" type="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field name="password" type="password" placeholder="Enter password" />
            <ErrorMessage name="password" component="div" className="error" />

            <label>Confirm Password</label>
            <Field name="confirmPassword" type="password" placeholder="Confirm password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />

            <button type="submit" className="btn-primary">Create Account</button>
                        {/* ✅ Thông báo hiển thị dưới form */}
                        {submitMessage && <div className="success-message">{submitMessage}</div>}
            <p style={{ marginTop: "1rem" }}>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </Formik>
      </div>
      <div className="resgiter-image">
        <img src={loginImage} alt="" />
      </div>
    </div>
  );
};

export default Resgiter;
