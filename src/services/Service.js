import axios from 'axios';

async function obtenerRecomendacionesCohere(proveedores) {
  const apiKey = 'yAIU2kaQ6bxd4iDgoHklSbHOW320JXwDugv8CRcL';
  const prompt = `
  Dado el siguiente listado de proveedores con sus características financieras y operativas, genera recomendaciones específicas en formato de viñetas. Los proveedores son:

  ${proveedores
    .map(
      (p, i) => `
    Proveedor ${i + 1}: 
    - Razón Social: ${p.razon_social}
    - NIT: ${p.nit}
    - Ganancia Neta (2021-2023): ${p.ganancia_neta_anio_uno}, ${p.ganancia_neta_anio_dos}, ${p.ganancia_neta_anio_tres}
    - ROA (2021-2023): ${p.roa_anio_uno}, ${p.roa_anio_dos}, ${p.roa_anio_tres}
    - Deuda/Activos (2021-2023): ${p.deuda_activos_anio_uno}, ${p.deuda_activos_anio_dos}, ${p.deuda_activos_anio_tres}
  `
    )
    .join('\n')}

  Genera insights útiles sobre riesgos, oportunidades de negocio y recomendaciones generales para la gestión de estos proveedores:
  `;

  try {
    const response = await axios.post(
        'https://api.cohere.ai/v1/generate', // URL corregida
        {
          model: 'command-xlarge-nightly',
          prompt,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      

    return response.data.generations[0].text.split('\n').filter((line) => line.trim());
  } catch (error) {
    console.error('Error al generar recomendaciones:', error);
    return [];
  }
}

export default obtenerRecomendacionesCohere;
