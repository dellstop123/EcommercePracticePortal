import React, { useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';

const steps = ['Step 1', 'Step 2', 'Step 3'];

function StepperProgress() {
  const [current, setCurrent] = useState(0);
  const percent = ((current + 1) / steps.length) * 100;
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Stepper / Progress Bar</h3>
        <div className="mb-3">
          {steps.map((step, idx) => (
            <span key={step} className={idx === current ? 'fw-bold text-primary' : ''}>
              {step}{idx < steps.length - 1 && ' > '}
            </span>
          ))}
        </div>
        <ProgressBar now={percent} label={`${Math.round(percent)}%`} className="mb-3" />
        <div className="d-flex justify-content-between">
          <Button disabled={current === 0} onClick={() => setCurrent(current - 1)} data-testid="stepper-prev">Previous</Button>
          <Button disabled={current === steps.length - 1} onClick={() => setCurrent(current + 1)} data-testid="stepper-next">Next</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StepperProgress; 