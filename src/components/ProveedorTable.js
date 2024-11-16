import React from 'react';
import './ProveedorTable.css';

const ProveedorTable = ({ proveedores, onSelectProveedor, proveedorSeleccionado }) => {
  return (
    <table className="proveedor-table">
      <thead>
        <tr>
          <th>NIT</th>
          <th>Razón Social</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map((proveedor) => (
          <tr 
            key={proveedor.nit} 
            onClick={() => onSelectProveedor(proveedor)} 
            className={proveedor === proveedorSeleccionado ? 'selected' : ''}
          >
            <td>{proveedor.nit}</td>
            <td>{proveedor.razon_social}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProveedorTable;
