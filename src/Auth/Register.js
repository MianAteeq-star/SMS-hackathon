import { Button, DatePicker, Divider, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [state, setState] = useState(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col mb-0 ">
          <div
            className="card p-3 p-md-4"
            style={{ backgroundColor: "#90a955" }}
          >
            <Title className="text-center">Register</Title>
            <Divider />
            <Form layout="vertical">
              <Form.Item label="Full Name">
                <Input name="fullName" placeholder="Enter Your Full Name" />
              </Form.Item>
              <Form.Item label="Email">
                <Input name="email" placeholder="Enter Your Email" />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password
                  name="passwordf"
                  placeholder="Enter Your Password"
                />
              </Form.Item>
              <Form.Item label="Date of Birth">
                <DatePicker
                  className="w-100"
                  onChange={(dateObject, dateString) => {
                    setState((s) => ({ ...s, dob: dateString }));
                  }}
                />
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                shape="round"
                className="w-50"
                loading={""}
                onClick={""}
              >
                REGISTER
              </Button>
              <Button
                type="dashed"
                shape="round"
                size="large"
                className="w-50 "
              >
                <Link
                  to="/login  "
                  type="submit"
                  className="text-decoration-none"
                  onClick={""}
                >
                  LOGOUT
                </Link>
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
