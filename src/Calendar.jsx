import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';

function Calendar() {
  const [date, setDate] = useState('');
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Date Picker & Calendar</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select a date</Form.Label>
            <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} data-testid="date-picker" />
          </Form.Group>
        </Form>
        {date && <div className="mt-2">Selected date: {date}</div>}
      </Card.Body>
    </Card>
  );
}

export default Calendar; 