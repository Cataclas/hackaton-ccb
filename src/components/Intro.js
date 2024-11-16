// components/Intro.js
import React from 'react';
import './Intro.css';

const Intro = () => {
  return (
    <div className="intro">
      <h1>Panel de Proveedores</h1>
      <p>
        Bienvenido al sistema de análisis de proveedores. Selecciona un proveedor en la tabla para
        ver su información detallada y análisis de indicadores financieros.
      </p>
    </div>
  );
};

export default Intro;
