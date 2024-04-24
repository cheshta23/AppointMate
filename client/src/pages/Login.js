import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      // window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <div className="home">
      <div className="main-heading">
        Welcome to <i>AppointMate</i>
      </div>
      <div className="main-content">
        <div className="left-side">
          <div className="content-1">
            Let's look at health in a whole new way!
          </div>
          <div className="content-2">
            <div className="sub-content">
              Healthcare Solution for a Better Life
            </div>
            <div className="sub-content">
              Find a Doctor and Book an Appointment
            </div>
          </div>
        </div>
        <div className="form-container">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form"
          >
            <h3 className="form-heading">Login</h3>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Link to="/register" className="m-2" style={{ color: "white" }}>
              Not a user? Register here
            </Link>
            <button className="btn btnclass" type="submit">
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
