import React, { useState } from 'react';
import { Pagination, ListGroup, Card } from 'react-bootstrap';

const items = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);
const pageSize = 5;

function PaginationDemo() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(items.length / pageSize);
  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Pagination</h3>
        <ListGroup className="mb-3">
          {pagedItems.map(item => <ListGroup.Item key={item}>{item}</ListGroup.Item>)}
        </ListGroup>
        <Pagination>
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} data-testid="prev-page" />
          {[...Array(pageCount)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={page === idx + 1}
              onClick={() => setPage(idx + 1)}
              data-testid={`page-${idx + 1}`}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === pageCount} onClick={() => setPage(page + 1)} data-testid="next-page" />
        </Pagination>
      </Card.Body>
    </Card>
  );
}

export default PaginationDemo; 