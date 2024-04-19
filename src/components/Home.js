// este es el codigo de inicio
import React from 'react';
import '../styles.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2 className="home-title">Bienvenido al Sistema de Control de Inventario y Ventas de Mariscos</h2>
        <p className="home-description">Por favor, selecciona una opción del menú de navegación para comenzar.</p>
        <img src="https://us.123rf.com/450wm/grgroup/grgroup1409/grgroup140901266/31586064-dise%C3%B1o-de-los-pescados-sobre-el-fondo-blanco-ilustraci%C3%B3n-vectorial.jpg?ver=6" alt="Mariscos" className="home-image" />
      </div>
    </div>
  );
}

export default Home;
