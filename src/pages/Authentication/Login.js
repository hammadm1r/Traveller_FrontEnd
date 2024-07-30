import React, { useState } from "react";
import  "./form.css";
import { Form, Typography } from "antd";
import { Input } from "antd";
import { Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login',{email,password});
      setItem(KEY_ACCESS_TOKEN,response.result.accessToken);
      navigate("/", { replace: true });
    }catch (error) {
      console.log(error)
    }
    
  }
  
  return (
    <div className="appBg">
      <Form className="form">
        <Typography.Title
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bolder",
          }}
        >
          LOG IN
        </Typography.Title>
        <Form.Item label="Email" name={"myEmail"} >
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password" name={"myPassword"}>
          <Input.Password
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} htmlType="submit" block >
          Log In
        </Button>
        <Divider style={{ borderColor: "Black" }}>
          {" "}
          Do Not Have Account? <Link to="/signup">Signup</Link>
        </Divider>
      </Form>
    </div>
  );
}

export default Login;
