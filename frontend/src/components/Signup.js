// src/components/Signup.js
import './SignupSuccess.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function validatePassword(pwd) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return pwd.length >= 8 && re.test(pwd);
  }

  function validateName(name) {
    return /^[A-Z][A-Za-z-]*$/.test(name);
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateName(firstName)) {
      setMessage("First name is invalid. It must start with an uppercase letter, contain no spaces, and only letters and dashes are allowed.");
      return;
    }
    if (!validateName(lastName)) {
      setMessage("Last name is invalid. It must start with an uppercase letter, contain no spaces, and only letters and dashes are allowed.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Confirmed password is mispelled. Passwords do not match.");
      return;
    }
    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters long and contain at least one number and one special character.");
      return;
    }
    if (!email.endsWith('.edu')) {
      setMessage("Email must end in .edu");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });
      // Redirect to SignupSuccess and pass the email in location state.
      navigate('/signup-success', { state: { email } });
    } catch (err) {
      setMessage(err.response?.data.error || 'An error occurred');
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <p>Password must be at least 8 characters long and contain at least one number and one special character.</p>
      <p>First and Last names must start with an uppercase letter, contain no spaces, and only letters and dashes are allowed.</p>
      <form onSubmit={handleSignup} className="signup-form">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email (.edu):</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
