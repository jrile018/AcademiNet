// frontend/src/components/PositionForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PositionForm() {
  const [position, setPosition] = useState({
    title: '',
    description: '',
    qualifications: '',
    contactEmail: '',
    postedBy: '' // In a full app, this would be the authenticated researcher's ID.
  });

  const handleChange = (e) => {
    setPosition({ ...position, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/positions', position);
      alert('Position posted successfully!');
      setPosition({ title: '', description: '', qualifications: '', contactEmail: '', postedBy: '' });
    } catch (err) {
      console.error(err);
      alert('Error posting position');
    }
  };

  return (
    <div>
      <h2>Post a Research Position</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input name="title" value={position.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={position.description} onChange={handleChange} />
        </div>
        <div>
          <label>Qualifications:</label>
          <textarea name="qualifications" value={position.qualifications} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Email:</label>
          <input name="contactEmail" type="email" value={position.contactEmail} onChange={handleChange} required />
        </div>
        <div>
          <label>Researcher ID:</label>
          <input name="postedBy" value={position.postedBy} onChange={handleChange} required />
        </div>
        <button type="submit">Post Position</button>
      </form>
    </div>
  );
}

export default PositionForm;
