import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUser } from '../../context/AuthContext';
import './Login.css'
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firebaseLogin } = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await firebaseLogin(email, password);
  }

  return (
    <div id="login">
      <Form onSubmit={onSubmit}>
        <div id="title" className='d-flex justify-content-center align-items-baseline mb-3'>
          <span>My</span>
          <span>F</span>
          <span>P</span>
          <span>T</span>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            autoComplete="username email"
            placeholder="Enter email"
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" className='w-100'>
          Login
        </Button>
      </Form>
    </div>
  )
}
