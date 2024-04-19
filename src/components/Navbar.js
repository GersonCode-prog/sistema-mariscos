//Codigo del Menu

import React from 'react';
import '../styles.css'; 

const Navbar = ({ onSectionChange }) => {
  const handleSectionClick = (section) => {
    onSectionChange(section);
  }

  return (
    <nav className="navbar">
      <span className="navbar-logo">🦐</span> 
      <span className="navbar-title">Sistema de Venta de Mariscos</span>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#inventory" onClick={() => handleSectionClick('inventory')} className="nav-link">Inventario</a>
        </li>
        <li className="nav-item">
          <a href="#sales" onClick={() => handleSectionClick('sales')} className="nav-link">Ventas</a>
        </li>
        <li className="nav-item">
          <a href="#reports" onClick={() => handleSectionClick('reports')} className="nav-link">Reportes</a>
        </li>
      </ul>
      <a href="#home" onClick={() => handleSectionClick('home')} className="nav-link home">Inicio</a>
    </nav>
  );
}

export default Navbar;
