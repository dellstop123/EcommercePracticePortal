import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card } from 'react-bootstrap';

function RichTextEditor() {
  const [value, setValue] = useState('');
  return (
    <Card className="mx-auto" style={{ maxWidth: 600 }}>
      <Card.Body>
        <h3 className="mb-3">Rich Text Editor</h3>
        <ReactQuill theme="snow" value={value} onChange={setValue} data-testid="rich-text-editor" />
        <div className="mt-3">
          <h5>Preview:</h5>
          <div className="border p-2" dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default RichTextEditor; 