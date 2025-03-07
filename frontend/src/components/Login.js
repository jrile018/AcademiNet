// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMessage(res.data.message + ". Your account ID is " + res.data.accountId);
    } catch (err) {
      setMessage(err.response?.data.error || 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit">Login</button>
      </form>
      <div className="login-options">
        <button className="forgot-password">Forgot Password?</button>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
