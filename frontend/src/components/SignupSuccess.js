// src/components/SignupSuccess.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SignupSuccess.css';

function SignupSuccess() {
  const location = useLocation();
  const email = location.state?.email || '';
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/resend-confirmation', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data.error || 'An error occurred');
    }
    setResending(false);
  };

  return (
    <div className="signup-success-page">
      <h2>Congratulations on signing up!</h2>
      <p>You should have received an email to confirm your registration.</p>
      <p>Please click the link in that email to confirm your account.</p>
      <p>If you did not receive the email, click the button below to resend the confirmation email.</p>
      <button onClick={handleResend} disabled={resending}>
        {resending ? 'Resending...' : 'Resend Confirmation Email'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupSuccess;
