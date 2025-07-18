import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

function WebSocketDemo() {
  const [messages, setMessages] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setMessages(msgs => [...msgs, `Message at ${new Date().toLocaleTimeString()}`]);
    }, 2000);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <Card className="mx-auto" style={{ maxWidth: 500 }}>
      <Card.Body>
        <h3 className="mb-3">WebSocket / Realtime Demo</h3>
        <Button onClick={() => setRunning(r => !r)} className="mb-3" data-testid="toggle-ws">
          {running ? 'Stop' : 'Start'} Messages
        </Button>
        <ListGroup>
          {messages.map((msg, idx) => <ListGroup.Item key={idx}>{msg}</ListGroup.Item>)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default WebSocketDemo; 