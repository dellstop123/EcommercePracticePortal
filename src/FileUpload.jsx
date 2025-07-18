import React, { useRef, useState } from 'react';
import { Form, Button, ProgressBar, Card } from 'react-bootstrap';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
    setProgress(0);
  };

  const handleUpload = () => {
    setProgress(100);
    setUploaded(true);
  };

  const handleDownload = () => {
    const blob = new Blob(['Sample file content'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">File Upload/Download</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" ref={inputRef} onChange={handleFileChange} data-testid="file-input" />
          </Form.Group>
          <Button variant="primary" onClick={handleUpload} disabled={!file} className="me-2">Upload</Button>
          <Button variant="secondary" onClick={handleDownload}>Download Sample</Button>
        </Form>
        {progress > 0 && <ProgressBar now={progress} label={`${progress}%`} className="mt-3" />}
        {uploaded && <div className="mt-2 text-success">File uploaded!</div>}
      </Card.Body>
    </Card>
  );
}

export default FileUpload; 