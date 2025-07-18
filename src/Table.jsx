import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const initialData = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

function DynamicTable() {
  const [data, setData] = useState(initialData);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ id: null, name: '', email: '' });
  const [editId, setEditId] = useState(null);

  const handleShow = (row) => {
    setEditId(row ? row.id : null);
    setForm(row || { id: null, name: '', email: '' });
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (editId) {
      setData(data.map(d => d.id === editId ? { ...form, id: editId } : d));
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }
    setShow(false);
  };

  const handleDelete = (id) => setData(data.filter(d => d.id !== id));

  return (
    <>
      <Button className="mb-3" onClick={() => handleShow()}>Add Row</Button>
      <Table striped bordered hover data-testid="dynamic-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => handleShow(row)} className="me-2">Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Row' : 'Add Row'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={form.email} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DynamicTable; 