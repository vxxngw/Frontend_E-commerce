import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

function ForgetPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  });

  const handleSubmit = (values) => {
    // Kiểm tra email trong danh sách người dùng (ví dụ giả định từ localStorage)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === values.email);

    if (userExists) {
      setEmailSent(true);
      alert("Email khôi phục mật khẩu đã được gửi.");
    } else {
      alert("Email không tồn tại trong hệ thống.");
    }
  };

  return (
    <div className="formForgetPassword d-flex justify-content-center text-align-center">
      <div className="row d-flex justify-content-center text-align-center form-main">
        <div className="mm">
          <span className="title-main">Quên Mật Khẩu</span>
        </div>

        {emailSent ? (
          <div className="email-sent-message">
            <p>Email khôi phục mật khẩu đã được gửi! Vui lòng kiểm tra hòm thư.</p>
            <button className="btn-back-login" onClick={() => navigate("/login")}>Quay lại Đăng nhập</button>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="form-submit">
              <div className="row" id="main-forget-password">
                <ErrorMessage name="email" component="div" className="error" />
                <div className="input-forget-password-form">
                  <Field type="email" name="email" placeholder="Nhập email của bạn" />
                </div>
              </div>
              <button type="submit" className="btn-send-email">Gửi Email</button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
