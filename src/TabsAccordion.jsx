import React from 'react';
import { Tabs, Tab, Accordion, Card } from 'react-bootstrap';

function TabsAccordion() {
  return (
    <Card className="mx-auto" style={{ maxWidth: 600 }}>
      <Card.Body>
        <h3 className="mb-3">Tabs & Accordion</h3>
        <Tabs defaultActiveKey="tab1" className="mb-3">
          <Tab eventKey="tab1" title="Tab 1">
            <p>This is Tab 1 content.</p>
          </Tab>
          <Tab eventKey="tab2" title="Tab 2">
            <p>This is Tab 2 content.</p>
          </Tab>
        </Tabs>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Content for accordion item #1.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Content for accordion item #2.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default TabsAccordion; 