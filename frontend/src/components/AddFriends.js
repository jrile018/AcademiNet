// src/components/AddFriends.js
import React, { useState } from 'react';
import './AddFriends.css'; // Optionally create this file for styling

function AddFriends() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // For now, simulate a search (you can integrate backend search later)
    console.log("Searching for friend:", searchQuery);
    setResult(`Results for "${searchQuery}" (this is a placeholder)`);
  };

  return (
    <div className="add-friends-page">
      <h2>Add Friends</h2>
      <form onSubmit={handleSearch}>
        <label>Search by Name and Account Number (e.g., John Doe#ABC123XYZ0):</label>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default AddFriends;
