import React, { useState } from 'react';
import { Form, Dropdown, Button, Card } from 'react-bootstrap';

function Dropdowns() {
  const [dropdown, setDropdown] = useState('Option 1');
  const [checkbox, setCheckbox] = useState(false);
  const [radio, setRadio] = useState('A');

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Dropdowns, Checkboxes, Radios</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Dropdown</Form.Label>
            <Form.Select value={dropdown} onChange={e => setDropdown(e.target.value)} data-testid="dropdown">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Check me out" checked={checkbox} onChange={e => setCheckbox(e.target.checked)} data-testid="checkbox" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Radio Buttons</Form.Label>
            <div>
              <Form.Check inline type="radio" label="A" name="radioGroup" value="A" checked={radio === 'A'} onChange={e => setRadio(e.target.value)} data-testid="radio-a" />
              <Form.Check inline type="radio" label="B" name="radioGroup" value="B" checked={radio === 'B'} onChange={e => setRadio(e.target.value)} data-testid="radio-b" />
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Dropdowns; 