import React, { useState, useEffect } from 'react';
import ProveedorTable from './components/ProveedorTable';
import IndicadorGraficas from './components/IndicadorGraficas';
import Filtros from './components/Filtros';
import Intro from './components/Intro';

import obtenerRecomendacionesCohere from './services/Service'; // Asegúrate de que el nombre sea correcto

import './App.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({ departamento: '', municipio: '', categoria: '' });
  const [recomendaciones, setRecomendaciones] = useState([]); // Estado correctamente definido

  useEffect(() => {
    // Cargar datos desde el archivo JSON local
    const url = `${process.env.PUBLIC_URL}/proveedores.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data);
        setProveedoresFiltrados(data);
        setProveedorSeleccionado(data[0]);
      })
      .catch((error) => console.error('Error cargando el JSON:', error));
  }, []);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      if (proveedoresFiltrados.length > 0) {
        const nuevasRecomendaciones = await obtenerRecomendacionesCohere(proveedoresFiltrados);
        setRecomendaciones(nuevasRecomendaciones);
      } else {
        setRecomendaciones([]);
      }
    };
    fetchRecomendaciones();
  }, [proveedoresFiltrados]);

  const handleFilterChange = (key, value) => {
    const nuevosFiltros = { ...filtros, [key]: value };
    setFiltros(nuevosFiltros);

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
    setProveedorSeleccionado(filtrados.length > 0 ? filtrados[0] : null);
  };

  const departamentos = [...new Set(proveedores.map((p) => p.departamento))];
  const municipios = [...new Set(proveedores.map((p) => p.municipio))];
  const categorias = [...new Set(proveedores.map((p) => p.descripcion_categoria_unspsc_principal))];

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
          <div className="recomendaciones">
            <h3>Recomendaciones Generadas</h3>
            {recomendaciones.length > 0 ? (
              <ul>
                {recomendaciones.map((recomendacion, index) => (
                  <li key={index}>{recomendacion}</li>
                ))}
              </ul>
            ) : (
              <p>No hay recomendaciones disponibles.</p>
            )}
          </div>
        </div>

        <div className="center-panel">
          <div className="chart-wrapper">
            <IndicadorGraficas
              proveedores={proveedoresFiltrados.length > 0 ? proveedoresFiltrados : proveedores}
              proveedorSeleccionado={proveedorSeleccionado}
              obtenerRecomendaciones={obtenerRecomendacionesCohere}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
