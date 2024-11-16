import React from 'react';
import './Filtros.css';

const Filtros = ({ departamentos, municipios, categorias, onFilterChange }) => {
  return (
    <div className="filtros-container">
      <h3>Filtros</h3>
      <div className="filtro">
        <label htmlFor="departamento">Departamento:</label>
        <select id="departamento" onChange={(e) => onFilterChange('departamento', e.target.value)}>
          <option value="">Todos</option>
          {departamentos.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro">
        <label htmlFor="municipio">Municipio:</label>
        <select id="municipio" onChange={(e) => onFilterChange('municipio', e.target.value)}>
          <option value="">Todos</option>
          {municipios.map((mun) => (
            <option key={mun} value={mun}>
              {mun}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro">
        <label htmlFor="categoria">Categoría:</label>
        <select id="categoria" onChange={(e) => onFilterChange('categoria', e.target.value)}>
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filtros;
