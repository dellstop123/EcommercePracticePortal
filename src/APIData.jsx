import React, { useState } from 'react';
import { Button, ListGroup, Card, Spinner } from 'react-bootstrap';

function APIData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setData(['Item 1', 'Item 2', 'Item 3']);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">API Data Fetching</h3>
        <Button onClick={fetchData} disabled={loading} data-testid="fetch-btn">Fetch Data</Button>
        {loading && <Spinner animation="border" size="sm" className="ms-2" />}
        <ListGroup className="mt-3">
          {data.map((item, idx) => <ListGroup.Item key={idx}>{item}</ListGroup.Item>)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default APIData; 