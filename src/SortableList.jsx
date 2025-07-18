import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Sortable from 'react-sortablejs';

const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

function SortableList() {
  const [items, setItems] = useState(initialItems);
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Sortable List</h3>
        <Sortable tag={ListGroup} onChange={order => setItems(order)}>
          {items.map(item => (
            <ListGroup.Item key={item} data-id={item} data-testid={`sortable-${item}`}>
              {item}
            </ListGroup.Item>
          ))}
        </Sortable>
      </Card.Body>
    </Card>
  );
}

export default SortableList; 