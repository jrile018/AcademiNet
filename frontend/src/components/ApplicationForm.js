// frontend/src/components/ApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ApplicationForm() {
  const [application, setApplication] = useState({
    student: '',
    position: '',
    coverLetter: ''
  });

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/applications', application);
      alert('Application submitted successfully!');
      setApplication({ student: '', position: '', coverLetter: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting application');
    }
  };

  return (
    <div>
      <h2>Apply for a Research Position</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input name="student" value={application.student} onChange={handleChange} required />
        </div>
        <div>
          <label>Position ID:</label>
          <input name="position" value={application.position} onChange={handleChange} required />
        </div>
        <div>
          <label>Cover Letter:</label>
          <textarea name="coverLetter" value={application.coverLetter} onChange={handleChange} />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;
