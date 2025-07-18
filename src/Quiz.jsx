import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const question = {
  text: 'Which tool is commonly used for web automation?',
  options: ['Selenium', 'Photoshop', 'Excel', 'Notepad'],
  answer: 'Selenium',
};

function Quiz() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(selected === question.answer ? 'Correct!' : 'Try again!');
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-3">Quiz/Practice</h3>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">{question.text}</div>
          {question.options.map(opt => (
            <Form.Check
              key={opt}
              type="radio"
              label={opt}
              name="quiz"
              value={opt}
              checked={selected === opt}
              onChange={e => setSelected(e.target.value)}
              data-testid={`option-${opt}`}
            />
          ))}
          <Button type="submit" className="mt-2" data-testid="submit-quiz">Submit</Button>
        </Form>
        {result && <div className="mt-2">{result}</div>}
      </Card.Body>
    </Card>
  );
}

export default Quiz; 