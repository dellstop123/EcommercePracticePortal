import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function APIAuthDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        setMessage('Login successful!');
      } else {
        setMessage('Invalid credentials');
      }
    }, 500);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">API Auth Demo</h3>
        {message && <Alert variant={message === 'Login successful!' ? 'success' : 'danger'}>{message}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default APIAuthDemo; 