import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  React.useEffect(() => {
    document.body.className = dark ? 'bg-dark text-light' : '';
    return () => { document.body.className = ''; };
  }, [dark]);
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Theme / Dark Mode Toggle</h3>
        <Button onClick={() => setDark(d => !d)} data-testid="toggle-theme">
          Switch to {dark ? 'Light' : 'Dark'} Mode
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ThemeToggle; 