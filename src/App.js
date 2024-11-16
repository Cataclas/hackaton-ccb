import React, { useState, useEffect } from 'react';
import ProveedorTable from './components/ProveedorTable';
import IndicadorGraficas from './components/IndicadorGraficas';
import ProveedorDetalle from './components/ProveedorDetalle';
import Filtros from './components/Filtros';
import Intro from './components/Intro';
import './App.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({ departamento: '', municipio: '', categoria: '' });

  useEffect(() => {
    // Cargar datos desde el archivo JSON local
    fetch('/proveedores.json')
      .then(response => response.json())
      .then(data => {
        setProveedores(data);
        setProveedoresFiltrados(data); // Inicialmente muestra todos los proveedores
        setProveedorSeleccionado(data[0]); // Seleccionar el primero por defecto
      })
      .catch(error => console.error("Error cargando el JSON:", error));
  }, []);

  const handleFilterChange = (key, value) => {
    const nuevosFiltros = { ...filtros, [key]: value };
    setFiltros(nuevosFiltros);

    // Filtrar los proveedores según los filtros seleccionados
    const filtrados = proveedores.filter((proveedor) => {
      const cumpleDepartamento =
        !nuevosFiltros.departamento || proveedor.departamento === nuevosFiltros.departamento;
      const cumpleMunicipio =
        !nuevosFiltros.municipio || proveedor.municipio === nuevosFiltros.municipio;
      const cumpleCategoria =
        !nuevosFiltros.categoria || proveedor.categoria === nuevosFiltros.categoria;

      return cumpleDepartamento && cumpleMunicipio && cumpleCategoria;
    });

    setProveedoresFiltrados(filtrados);
    if (filtrados.length > 0) {
      setProveedorSeleccionado(filtrados[0]);
    } else {
      setProveedorSeleccionado(null);
    }
  };

  // Obtener valores únicos para los selectores de filtros
  const departamentos = [...new Set(proveedores.map((p) => p.departamento))];
  const municipios = [...new Set(proveedores.map((p) => p.municipio))];
  const categorias = [...new Set(proveedores.map((p) => p.categoria))];

  return (
    <div>
      <div className="intro">

        <Intro />
      </div>
      <div className="dashboard">

        <div className="left-panel">
          <Filtros
            departamentos={departamentos}
            municipios={municipios}
            categorias={categorias}
            onFilterChange={handleFilterChange}
          />
          <ProveedorTable
            proveedores={proveedoresFiltrados.length > 0 ? proveedoresFiltrados : proveedores}
            onSelectProveedor={setProveedorSeleccionado}
            proveedorSeleccionado={proveedorSeleccionado}
          />
        </div>
        <div className="center-panel">
          <IndicadorGraficas
            proveedores={proveedoresFiltrados.length > 0 ? proveedoresFiltrados : proveedores}
            proveedorSeleccionado={proveedorSeleccionado}
          />
        </div>
        <div className="right-panel">
          <ProveedorDetalle proveedor={proveedorSeleccionado} />
        </div>
      </div>
    </div>
  );
};

export default App;
