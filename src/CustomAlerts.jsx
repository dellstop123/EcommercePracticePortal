import React, { useState } from 'react';
import { Card, Alert, Button } from 'react-bootstrap';

function CustomAlerts() {
  const [show, setShow] = useState(false);
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Custom Alerts</h3>
        <Button onClick={() => setShow(!show)} data-testid="toggle-alert">
          {show ? 'Hide' : 'Show'} Alert
        </Button>
        {show && <Alert variant="info" className="mt-3" data-testid="custom-alert">This is a custom alert for automation practice!</Alert>}
      </Card.Body>
    </Card>
  );
}

export default CustomAlerts; 