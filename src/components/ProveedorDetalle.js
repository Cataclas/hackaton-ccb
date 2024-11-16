import React from 'react';
import './ProveedorDetalle.css';

const ProveedorDetalle = ({ proveedor }) => {
  return (
    <div className="proveedor-detalle">
      {proveedor ? (
        <table>
          <tbody>
            {Object.entries(proveedor).map(([key, value]) => (
              <tr key={key}>
                <td>{key.replace(/_/g, ' ').toUpperCase()}</td>
                <td>{value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Seleccione un proveedor para ver los detalles.</p>
      )}
    </div>
  );
};

export default ProveedorDetalle;
