import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 NASA Project</h1>
        <p>Explore the universe with NASA's Open APIs</p>
      </header>
      <main>
        <div className="container">
          <h2>Welcome to NASA Project</h2>
          <p>This is a full-stack application that integrates with NASA's Open APIs.</p>
          <div className="features">
            <div className="feature">
              <h3>🌌 Astronomy Picture of the Day</h3>
              <p>Discover stunning images from space</p>
            </div>
            <div className="feature">
              <h3>🔴 Mars Rover Photos</h3>
              <p>Explore the surface of Mars through rover images</p>
            </div>
            <div className="feature">
              <h3>🔍 NASA Image Search</h3>
              <p>Search through NASA's vast collection of images</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 