import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.sampleapis.com/beers/ale')
      .then(response => response.json())
      .then(data => setBeers(data))
      .catch(error => console.error('Error fetching the beers:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beer List</h1>
        <input
          type="text"
          placeholder="Search for a beer"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      <div className="beer-container">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image} alt={beer.name} />
            <h2>{beer.name}</h2>
            <p>Price: {beer.price}</p>
            <p>Rating: {beer.rating.average} (Reviews: {beer.rating.reviews})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
