import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { awsConfig } from '../aws-exports';
import { Bar } from 'react-chartjs-2';

AWS.config.update(awsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TopSuppliersChart = ({ filters, onSelectSupplier }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Definir la consulta base
      let params = {
        TableName: 'general',
        Limit: 100, // Límite alto para reducir el escaneo, filtraremos luego los 10 primeros en frontend
      };

      // Agregar filtros dinámicos
      let filterExpressions = [];
      let expressionAttributeValues = {};

      if (filters.departamento) {
        filterExpressions.push('departamento = :departamento');
        expressionAttributeValues[':departamento'] = filters.departamento;
      }
      if (filters.municipio) {
        filterExpressions.push('municipio = :municipio');
        expressionAttributeValues[':municipio'] = filters.municipio;
      }
      if (filters.minProcesos || filters.maxProcesos) {
        filterExpressions.push('cant_procesos_anio_uno BETWEEN :minProcesos AND :maxProcesos');
        expressionAttributeValues[':minProcesos'] = filters.minProcesos || 0;
        expressionAttributeValues[':maxProcesos'] = filters.maxProcesos || 100;
      }

      // Añadir la expresión de filtro si hay filtros activos
      if (filterExpressions.length > 0) {
        params.FilterExpression = filterExpressions.join(' AND ');
        params.ExpressionAttributeValues = expressionAttributeValues;
      }

      try {
        const result = await dynamoDB.scan(params).promise();
        
        // Ordenar para obtener el "Top 10" según el número de procesos y limitar a 10 resultados
        const topData = result.Items
          .sort((a, b) => b.cant_procesos_anio_uno - a.cant_procesos_anio_uno)
          .slice(0, 10);

        setData(topData);
      } catch (error) {
        console.error("Error al obtener datos de DynamoDB", error);
      }
    };

    fetchData();
  }, [filters]);

  const chartData = {
    labels: data.map((item) => item.razon_social),
    datasets: [
      {
        label: 'Número de Procesos',
        data: data.map((item) => item.cant_procesos_anio_uno),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Número de Contratos',
        data: data.map((item) => item.cant_contratos_anio_uno),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Top 10 Empresas por Número de Procesos' },
        },
      }}
      onElementsClick={(elems) => {
        if (elems.length > 0) {
          const companyIndex = elems[0].index;
          onSelectSupplier(data[companyIndex]);
        }
      }}
    />
  );
};

export default TopSuppliersChart;
