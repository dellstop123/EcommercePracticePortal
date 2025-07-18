import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';

const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function exportCSV() {
  const csv = [
    ['ID', 'Name', 'Email'],
    ...data.map(row => [row.id, row.name, row.email]),
  ].map(e => e.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function DataGridExport() {
  return (
    <Card className="mx-auto" style={{ maxWidth: 600 }}>
      <Card.Body>
        <h3 className="mb-3">Data Grid with Export</h3>
        <Button onClick={exportCSV} className="mb-3" data-testid="export-csv">Export as CSV</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default DataGridExport; 