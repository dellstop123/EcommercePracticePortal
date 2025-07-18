import React, { useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

function Notifications() {
  const [show, setShow] = useState(false);
  return (
    <div className="text-center">
      <Button onClick={() => setShow(true)} data-testid="show-toast">Show Notification</Button>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={show} onClose={() => setShow(false)} delay={2000} autohide data-testid="toast">
          <Toast.Header>
            <strong className="me-auto">Automation Portal</strong>
          </Toast.Header>
          <Toast.Body>This is a notification for automation practice!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Notifications; 