import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Multi-step Form</h3>
        <Form>
          {step === 1 && (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} data-testid="step1-name" />
            </Form.Group>
          )}
          {step === 2 && (
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={form.email} onChange={handleChange} data-testid="step2-email" />
            </Form.Group>
          )}
          <div className="d-flex justify-content-between">
            <Button disabled={step === 1} onClick={() => setStep(step - 1)} data-testid="prev-step">Previous</Button>
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)} data-testid="next-step">Next</Button>
            ) : (
              <Button variant="success" data-testid="submit-form">Submit</Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default MultiStepForm; 