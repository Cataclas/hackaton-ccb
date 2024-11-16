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

// Registrar los componentes necesarios para ambos tipos de gráficas
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

const IndicadorGraficas = ({ proveedores, proveedorSeleccionado }) => {
  const [mostrarRadar, setMostrarRadar] = useState(false); // Estado para cambiar entre tipos de gráficos
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

    const datasets = top10Proveedores.map((proveedor) => {
      const colorBase =
        proveedor === proveedorSeleccionado ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.4)';
      return {
        label: proveedor.razon_social,
        backgroundColor: colorBase,
        borderColor:
          proveedor === proveedorSeleccionado ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [
          proveedor[`${indicador}_anio_uno`],
          proveedor[`${indicador}_anio_dos`],
          proveedor[`${indicador}_anio_tres`],
        ],
      };
    });

    return { labels, datasets };
  };

  const crearDatosRadarPorProveedor = (proveedor) => {
    return {
      labels: indicadores_radar.map((indicador) => indicador.replace('_', ' ').toUpperCase()),
      datasets: [
        {
          label: 'Año 2021',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: true,
          data: indicadores_radar.map((indicador) => proveedor[`${indicador}_anio_uno`] || 0),
        },
        {
          label: 'Año 2022',
          backgroundColor: 'rgba(54, 162, 235, 0.4)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: true,
          data: indicadores_radar.map((indicador) => proveedor[`${indicador}_anio_dos`] || 0),
        },
        {
          label: 'Año 2023',
          backgroundColor: 'rgba(75, 192, 192, 0.4)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
          data: indicadores_radar.map((indicador) => proveedor[`${indicador}_anio_tres`] || 0),
        },
      ],
    };
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mostrarRadar}
          onChange={() => setMostrarRadar(!mostrarRadar)}
        />
        Mostrar gráficas de radar
      </label>
      <div className="chart-wrapper">
        {mostrarRadar
          ? // Gráficas tipo radar
          proveedores.slice(0, 10).map((proveedor) => (
            <div key={proveedor.id} className="chart-container">
              <h4>{proveedor.razon_social}</h4>
              <Radar
                data={crearDatosRadarPorProveedor(proveedor)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          ))
          : // Gráficas tipo barra
          indicadores_barra.map((indicador) => (
            <div key={indicador} className="chart-container">
              <h4>{indicador.replace('_', ' ').toUpperCase()}</h4>
              <Bar
                data={crearDatosBarra(indicador)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false, position: 'top' },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default IndicadorGraficas;
