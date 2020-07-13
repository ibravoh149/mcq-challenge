import React, { useState } from "react";
import "./Login.scss";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
import jwt from "jsonwebtoken";

const secret = process.env.REAC_APP_JWT_SECRET || "p9082y7guvfdvbshj9e8";
const Login = (props) => {
  const [data, setData] = useState({ username: "", email: "" });

  const _handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      user: { ...data },
      token: jwt.sign({ ...data }, secret, { expiresIn: "86400s" }),
    };
    localStorage.setItem("data", JSON.stringify(dataObj));
    setTimeout(() => {
      props.history.push("/test");
    }, 100);
  };

  return (
    <div className="">
      <Row>
        <Col md={4} sm={12}></Col>
        <Col md={4} sm={12}>
          <div className="mcq-login-container">
            <h2>Welcome to your free MCQ test</h2>
            {/* <form className="mcq-login-container__form"></form> */}
            <Form
              className="mcq-login-container__form"
              onSubmit={_handleSubmit}
            >
              <div className="mcq-login-container__form--icon">
                <FaUserAlt />
              </div>

              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  required
                  onChange={_handleChange}
                  value={data.username}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  required
                  onChange={_handleChange}
                  value={data.email}
                  // pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                />
              </FormGroup>
              <Button color="primary">Login</Button>
            </Form>
          </div>
        </Col>
        <Col md={4} sm={12}></Col>
      </Row>
    </div>
  );
};

export default Login;
