// components/Intro.js
import React from 'react';
import './Intro.css';
import logo from '../assets/images/logo.jpeg';

const Intro = () => {
  return (
    <div className="intro">
      <img src={logo} alt="Logo" className="intro-logo" />
      <h1>Panel de Proveedores</h1>
      <p>
        Bienvenido al sistema de análisis de proveedores.<br />
        Selecciona un proveedor en la tabla para ver su información detallada y análisis de indicadores financieros.
      </p>
    </div>
  );
};


export default Intro;
