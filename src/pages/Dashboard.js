import React, { useState } from 'react';
import TopSuppliersChart from '../components/TopSuppliersChart';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    departamento: '',
    municipio: '',
    minProcesos: 0,
    maxProcesos: 100,
  });
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    // Aquí podrías disparar una acción si decides cambiar el modo de filtrado
    console.log("Filtros aplicados:", filters);
  };

  return (
    <div>
      <h1>Panel de Proveedores</h1>
      <div className="filters">
        <label>
          Departamento:
          <input
            type="text"
            name="departamento"
            value={filters.departamento}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Municipio:
          <input
            type="text"
            name="municipio"
            value={filters.municipio}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Rango de Procesos:
          <input
            type="number"
            name="minProcesos"
            value={filters.minProcesos}
            onChange={handleFilterChange}
          />
          -
          <input
            type="number"
            name="maxProcesos"
            value={filters.maxProcesos}
            onChange={handleFilterChange}
          />
        </label>
        <button onClick={handleApplyFilters}>Aplicar Filtros</button>
      </div>
      <TopSuppliersChart filters={filters} onSelectSupplier={setSelectedSupplier} />
      
      {selectedSupplier && (
        <div className="selected-supplier">
          <h2>Información del Proveedor Seleccionado</h2>
          <p>Razón Social: {selectedSupplier.razon_social}</p>
          <p>Correo: {selectedSupplier.correo}</p>
          <p>Teléfono: {selectedSupplier.telefono}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
