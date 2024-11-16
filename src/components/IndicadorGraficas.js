import React, { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const proveedorDetalle = {
  nit: 'NIT',
  razon_social: 'Razón social',
  origen: 'Origen de los datos',
  codigo_categoria_unspsc_principal: 'Cod. Categoría',
  descripcion_categoria_unspsc_principal: 'Descripción de categoría',
  codigo_secop: 'Código SECOP',
  correo: 'Correo',
  correo_representante_legal: 'Correo Rep. Legal',
  pais: 'País',
  departamento: 'Departamento',
  municipio: 'Municipio',
  direccion: 'Dirección',
  es_entidad: 'Es entidad',
  es_grupo: 'Es grupo',
  espyme: 'Es pyme',
  esta_activa: 'Está activa',
  fecha_registro: 'Fecha de registro',
  n_mero_doc_representante_legal: 'Identificación del representante legal',
  nombre_representante_legal: 'Representante legal',
  sitio_web: 'Sitio Web',
  telefono: 'Teléfono',
  tipo_empresa: 'Tipo de empresa',
};

const IndicadorGraficas = ({ proveedores, proveedorSeleccionado, obtenerRecomendaciones }) => {
  const [vistaActiva, setVistaActiva] = useState('radar');
  const indicadores_barra = [
    'prueba_acida',
    'razon_corriente',
    'roe',
    'roa',
    'deuda_activos',
    'deuda_capital',
    'margen_bruto',
    'ganancia_neta',
  ];
  const indicadores_radar = [
    'prueba_acida',
    'razon_corriente',
    'roe',
    'roa',
    'deuda_activos',
    'deuda_capital',
    'margen_bruto',
  ];

  const crearDatosBarra = (indicador) => {
    const top10Proveedores = proveedores.slice(0, 10);
    const labels = [2021, 2022, 2023];

    const datasets = top10Proveedores.map((proveedor) => ({
      label: proveedor.razon_social,
      backgroundColor:
        proveedor === proveedorSeleccionado ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.4)',
      borderColor:
        proveedor === proveedorSeleccionado ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [
        proveedor[`${indicador}_anio_uno`],
        proveedor[`${indicador}_anio_dos`],
        proveedor[`${indicador}_anio_tres`],
      ],
    }));

    return { labels, datasets };
  };

  const crearDatosRadarPorProveedor = (proveedor) => ({
    labels: indicadores_radar.map((indicador) => indicador.replace('_', ' ').toUpperCase()),
    datasets: ['anio_uno', 'anio_dos', 'anio_tres'].map((anio, idx) => ({
      label: `Año 202${1 + idx}`,
      backgroundColor: `rgba(${255 - idx * 50}, ${99 + idx * 50}, ${132 + idx * 10}, 0.6)`,
      borderColor: `rgba(${255 - idx * 50}, ${99 + idx * 50}, ${132 + idx * 10}, 1)`,
      borderWidth: 2,
      fill: true,
      data: indicadores_radar.map((indicador) => proveedor[`${indicador}_${anio}`] || 0),
    })),
  });

  const renderVistaActiva = () => {
    switch (vistaActiva) {
      case 'radar':
        return proveedores.slice(0, 10).map((proveedor) => (
          <div key={proveedor.id} className="chart-container">
            <h4>{proveedor.razon_social}</h4>
            <Radar data={crearDatosRadarPorProveedor(proveedor)} options={{ responsive: true }} />
          </div>
        ));
      case 'barras':
        return indicadores_barra.map((indicador) => (
          <div key={indicador} className="chart-container">
            <h4>{indicador.replace('_', ' ').toUpperCase()}</h4>
            <Bar data={crearDatosBarra(indicador)} options={{
              responsive: true, plugins: {
                legend: {
                  display: false, // Esto elimina la leyenda
                },
              },
            }} />
          </div>
        ));
      case 'recomendaciones':
        return obtenerRecomendaciones ? (
          <div>
            <h3>
              Recomendaciones
            </h3>
            <ul>
              {obtenerRecomendaciones(proveedores).map((reco, idx) => (
                <li key={idx}>{reco}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No se encontraron recomendaciones.</p>
        );
      case 'detalle':
        return proveedorSeleccionado ? (
          <div>
            <h3>Detalle del Proveedor</h3>
            <table>
              <tbody>
                {Object.entries(proveedorDetalle).map(([key, label]) => (
                  <tr key={key}>
                    <td>{label}</td>
                    <td>{proveedorSeleccionado[key] || 'No disponible'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Seleccione un proveedor para ver el detalle.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setVistaActiva('radar')}>Compara</button>
        <button onClick={() => setVistaActiva('barras')}>Analiza</button>
        <button onClick={() => setVistaActiva('detalle')}>Detalle</button>
      </nav>
      <div>{renderVistaActiva()}</div>
    </div>
  );
};

export default IndicadorGraficas;
