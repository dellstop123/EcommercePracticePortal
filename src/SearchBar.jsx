import React, { useState } from 'react';
import { Form, ListGroup, Card } from 'react-bootstrap';

const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

function SearchBar() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setFiltered(val ? suggestions.filter(s => s.toLowerCase().includes(val.toLowerCase())) : []);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Search Bar</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" value={query} onChange={handleChange} placeholder="Type to search..." data-testid="search-input" />
          </Form.Group>
        </Form>
        {filtered.length > 0 && (
          <ListGroup>
            {filtered.map((item, idx) => <ListGroup.Item key={idx}>{item}</ListGroup.Item>)}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default SearchBar; 