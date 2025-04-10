import React, { useState } from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImage from "../Components/Assets/Pasted-20250410-122037_preview_rev_1.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu"),
  });

  const handleSubmit = (values) => {
    alert(`Đăng nhập thành công\nEmail: ${values.email}`);
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="" />
      </div>
      <div className="login-form">
        <h2>Sign In</h2>
        <p>Unlock your world.</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <label>Email</label>
            <Field name="email" type="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <div className="password-field">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" className="btn-primary">Sign In</button>
            <button type="button" className="btn-outline"><Link to="/register" className="create-account-link">Create Account</Link></button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
