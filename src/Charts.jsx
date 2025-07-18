import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const barData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

const pieData = {
  labels: ['Apple', 'Banana', 'Cherry'],
  datasets: [
    {
      label: 'Fruits',
      data: [10, 20, 30],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
    },
  ],
};

function Charts() {
  return (
    <Card className="mx-auto" style={{ maxWidth: 600 }}>
      <Card.Body>
        <h3 className="mb-3">Charts & Graphs</h3>
        <div className="mb-4">
          <h5>Bar Chart</h5>
          <Bar data={barData} />
        </div>
        <div>
          <h5>Pie Chart</h5>
          <Pie data={pieData} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Charts; 