import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function UserProfile() {
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    setProfile(form);
    setEdit(false);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">User Profile</h3>
        {edit ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={form.email} onChange={handleChange} />
            </Form.Group>
            <Button onClick={handleSave} className="me-2">Save</Button>
            <Button variant="secondary" onClick={() => setEdit(false)}>Cancel</Button>
          </Form>
        ) : (
          <>
            <div><strong>Name:</strong> {profile.name}</div>
            <div><strong>Email:</strong> {profile.email}</div>
            <Button className="mt-3" onClick={() => setEdit(true)}>Edit</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserProfile; 