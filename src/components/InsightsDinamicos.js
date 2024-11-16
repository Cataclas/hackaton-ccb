import React from 'react';

const AnalisisProveedores = ({ proveedores, proveedorSeleccionado }) => {
    const indicadores = ['prueba_acida', 'razon_corriente', 'roe', 'roa', 'deuda_activos', 'deuda_capital', 'margen_bruto'];

    // 1. Calcular promedios y tendencias
    const calcularPromedios = () => {
        const promedios = {};
        if (Array.isArray(proveedores) && proveedores.length > 0) {
            indicadores.forEach(indicador => {
                const total = proveedores.reduce((sum, proveedor) => sum + proveedor[`${indicador}_anio_tres`] || 0, 0);
                promedios[indicador] = (total / proveedores.length).toFixed(2);
            });
        }
        return promedios;
    };
    

    const promedios = calcularPromedios();

    // 2. Generar observaciones generales
    const generarObservaciones = () => {
        const observaciones = [];
        if (promedios.margen_bruto > 0.3) {
            observaciones.push("La mayoría de los proveedores tiene un margen bruto mayor al 30%, lo que indica buena rentabilidad.");
        }
        if (promedios.deuda_activos < 0.5) {
            observaciones.push("La deuda sobre activos promedio es menor al 50%, lo que refleja un riesgo financiero moderado.");
        }
        if (promedios.roe > 0.1) {
            observaciones.push("Los proveedores presentan un retorno sobre el patrimonio (ROE) saludable, superior al 10% en promedio.");
        }
        return observaciones;
    };

    const observacionesGenerales = generarObservaciones();

    // 3. Evaluar al proveedor seleccionado
    const evaluarProveedor = (proveedor) => {
        const evaluaciones = [];
        if (proveedor.margen_bruto_anio_tres > 0.35) {
            evaluaciones.push("Tiene un margen bruto destacado, lo que sugiere buena rentabilidad.");
        } else {
            evaluaciones.push("Su margen bruto es bajo, lo que puede indicar problemas de rentabilidad.");
        }
        if (proveedor.deuda_activos_anio_tres < 0.5) {
            evaluaciones.push("Su deuda sobre activos es moderada, lo que reduce el riesgo financiero.");
        } else {
            evaluaciones.push("Su deuda sobre activos es alta, lo que puede representar un riesgo financiero.");
        }
        if (proveedor.roe_anio_tres > 0.1) {
            evaluaciones.push("Presenta un ROE saludable, superior al 10%, lo que indica eficiencia en el uso del capital.");
        } else {
            evaluaciones.push("El ROE es bajo, lo que podría indicar problemas en el uso del capital.");
        }
        return evaluaciones;
    };

    const evaluacionSeleccionado = evaluarProveedor(proveedorSeleccionado);

    return (
        <div className="analisis-proveedores">
            <h4>Observaciones Generales</h4>
            <ul>
                {observacionesGenerales.map((obs, index) => (
                    <li key={index}>{obs}</li>
                ))}
            </ul>

            <h4>Evaluación del Proveedor Seleccionado: {proveedorSeleccionado.razon_social}</h4>
            <ul>
                {evaluacionSeleccionado.map((evaluacion, index) => (
                    <li key={index}>{evaluacion}</li>
                ))}
            </ul>
        </div>
    );
};

export default AnalisisProveedores;
