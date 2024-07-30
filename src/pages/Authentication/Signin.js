import React from 'react'
import {Form, Typography} from 'antd';
import { Input } from 'antd';
import { Button,Divider } from 'antd';
import './form.css';
import {Link} from "react-router-dom";
import { useState } from 'react';
import { axiosClient } from "../../utils/axiosClient";

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await axiosClient.post('/auth/signup',{name,email,password});
    console.log(result);
  }
  return (
    <div className="appBg">
    <Form className="form">
    <Typography.Title style={{display:'flex', justifyContent: 'center',fontWeight:'bolder'}} >SIGN UP</Typography.Title>
    <Form.Item label='Name' name={'myName'}>
    <Input placeholder="Enter Your Name"
    onChange={(e) => setName(e.target.value)}
    />
    </Form.Item>
    <Form.Item label='Email' name={'myEmail'}>
    <Input placeholder="Enter Your Email"
      onChange={(e) => setEmail(e.target.value)}
     />
    </Form.Item>
    <Form.Item label='Password' name={'mypassword'}>
    <Input.Password placeholder="Enter Your Password"
    onChange={(e) => setPassword(e.target.value)}
     />
    </Form.Item>
    <Button type="primary" onClick={handleSubmit} htmlType='submit' block>Sign up</Button>
    <Divider style={{borderColor:"Black"}}> Already Have Account? <Link to="/login">Log in</Link></Divider>
    </Form></div>
  )
}

export default Signin