// App.js

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Reports from './components/Reports';
import Home from './components/Home';
import './styles.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  }

  return (
    <div className="App">
      <Navbar onSectionChange={handleSectionChange} />
      {currentSection === 'home' && <Home />}
      {currentSection === 'inventory' && <Inventory />}
      {currentSection === 'sales' && <Sales />}
      {currentSection === 'reports' && <Reports />}
    </div>
  );
}

export default App;
