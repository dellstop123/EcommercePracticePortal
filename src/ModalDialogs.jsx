import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalDialogs() {
  const [show, setShow] = useState(false);
  return (
    <div className="text-center">
      <Button variant="primary" onClick={() => setShow(true)} data-testid="open-modal">Open Modal</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Automation Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a modal dialog for automation practice.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)} data-testid="close-modal">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDialogs; 