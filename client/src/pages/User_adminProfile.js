import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { Col, Form, Input, Row, message } from "antd";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <div
        style={{
          marginTop: "0px",
          marginBottom: "0.5em",
          fontWeight: "500",
          textShadow: "2px 2px brown",
          fontSize: "3rem",
          marginLeft: "10px",
        }}
      >
        Profile
      </div>
      {user && (
        <Form
          layout="vertical"
          className="m-3"
          initialValues={{
            ...user,
          }}
          style={{
            background: "white",
            opacity: "0.95",
            borderRadius: "5px",
            fontFamily: ` 'PT Serif', serif`,
          }}
        >
          <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your Email Address" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
