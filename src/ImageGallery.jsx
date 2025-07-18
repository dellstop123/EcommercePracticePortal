import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const images = [
  'https://placekitten.com/200/200',
  'https://placekitten.com/201/200',
  'https://placekitten.com/202/200',
  'https://placekitten.com/203/200',
  'https://placekitten.com/204/200',
  'https://placekitten.com/205/200',
];

function ImageGallery() {
  return (
    <Card className="mx-auto" style={{ maxWidth: 700 }}>
      <Card.Body>
        <h3 className="mb-3">Image Gallery</h3>
        <Row>
          {images.map((src, idx) => (
            <Col xs={6} md={4} key={idx} className="mb-3">
              <Card>
                <Card.Img variant="top" src={src} alt={`Kitten ${idx + 1}`} />
                <Card.Body>
                  <Card.Text>Kitten {idx + 1}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ImageGallery; 