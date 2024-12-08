import { Incendio } from './incendio';

const datosIncendios = [
    {id: 'Diario', date: 'Lunes', count: 2 },
    { id: 'Diario', date: 'Martes', count: 1 },
    { id: 'Diario', date: 'Miercoles', count: 0 },
    { id: 'Diario', date: 'Jueves', count: 3 },
    { id: 'Diario', date: 'Viernes', count: 0 },
    { id: 'Diario', date: 'Sabado', count: 2 },
    { id: 'Diario', date: 'Domingo', count: 0 },
    { id: 'Semanal', date: 'Semana1', count: 4 },
    { id: 'Semanal', date: 'Semana2', count: 7 },
    { id: 'Semanal', date: 'Semana3', count: 8 },
    { id: 'Semanal', date: 'Semana4', count: 0 },
    { id: 'Mensual', date: 'Abril', count: 13 },
    { id: 'Mensual', date: 'Mayo', count: 12 },
    { id: 'Mensual', date: 'Junio', count: 15 },
    { id: 'Mensual', date: 'Julio', count: 20 },
    { id: 'Mensual', date: 'Agosto', count: 19 },
];

const obtenerDatosIncendios = () => {
    return datosIncendios;
};

module.exports = { obtenerDatosIncendios }; 