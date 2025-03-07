// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewsFeed from './components/NewsFeed';
import PositionForm from './components/PositionForm';
import PositionsList from './components/PositionsList';
import ApplicationForm from './components/ApplicationForm';
import Login from './components/Login';       // ADDED
import Signup from './components/Signup';     // ADDED
import AddFriends from './components/AddFriends'; // ADDED: Friend search page
import SignupSuccess from './components/SignupSuccess'; // ADDED: Signup success page
import './index.css'; // Our main CSS

function SideMenu({ isOpen, onClose }) {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <ul>
        <li>
          <Link to="/" onClick={onClose}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/positions" onClick={onClose}>
            View Positions
          </Link>
        </li>
        <li>
          <Link to="/post-position" onClick={onClose}>
            Post a Position
          </Link>
        </li>
        <li>
          <Link to="/apply" onClick={onClose}>
            Apply
          </Link>
        </li>
        {/* ---------- ADDED FRIENDS BUTTON ---------- */}
        <li>
          <Link to="/add-friends" onClick={onClose}>
            Add Friends
          </Link>
        </li>
        {/* ---------- END ADDED FRIENDS BUTTON ---------- */}
      </ul>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        {/* Header with Hamburger Icon, Title, and Login Button */}
        <header className="header">
          <div className="menu-icon" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="header-title">AcademiNet</div>
          {/* ---------- ADDED LOGIN BUTTON ---------- */}
          <div className="header-login">
            <Link to="/login">Login</Link>
          </div>
          {/* ---------- END ADDED LOGIN BUTTON ---------- */}
        </header>

        {/* Side Menu (Drawer) */}
        <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />

        <div className="container">
          <Routes>
            <Route path="/post-position" element={<PositionForm />} />
            <Route path="/positions" element={<PositionsList />} />
            <Route path="/apply" element={<ApplicationForm />} />
            {/* New routes for login, sign up, friend search, and signup success */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-friends" element={<AddFriends />} />
            <Route path="/signup-success" element={<SignupSuccess />} />
            {/* Default Route to NewsFeed */}
            <Route path="/" element={<NewsFeed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
