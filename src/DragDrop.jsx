import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function DragDrop() {
  const [dropped, setDropped] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropped(true);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Drag & Drop</h3>
        <div
          draggable
          onDragStart={e => e.dataTransfer.setData('text/plain', 'drag-item')}
          className="p-2 mb-3 bg-primary text-white text-center"
          style={{ cursor: 'grab' }}
          data-testid="draggable-item"
        >
          Drag me
        </div>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="p-4 border border-secondary text-center"
          style={{ minHeight: 80 }}
          data-testid="drop-area"
        >
          {dropped ? 'Dropped!' : 'Drop here'}
        </div>
      </Card.Body>
    </Card>
  );
}

export default DragDrop; 