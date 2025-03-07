// frontend/src/components/PositionsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PositionsList() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/positions');
        setPositions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPositions();
  }, []);

  return (
    <div>
      <h2>Available Research Positions</h2>
      <ul>
        {positions.map((pos) => (
          <li key={pos._id}>
            <h3>{pos.title}</h3>
            <p>{pos.description}</p>
            <p><strong>Qualifications:</strong> {pos.qualifications}</p>
            <p><strong>Contact:</strong> {pos.contactEmail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PositionsList;
