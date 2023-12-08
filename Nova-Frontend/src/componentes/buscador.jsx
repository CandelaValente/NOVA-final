import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Buscador() {
    const [filtroCategoria, setFiltroCategoria] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/products', {
                    params: {
                        partialCategory: filtroCategoria,
                    },
                });
                setResultadosFiltrados(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchData();
    }, [filtroCategoria]);

    const handleCategoriaChange = (event) => {
        setFiltroCategoria(event.target.value);
    };

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    const handleBuscarClick = async () => {
        try {
            const response = await axios.get('/api/products', {
                params: {
                    partialCategory: filtroCategoria,
                    partialName: busqueda, // Agregar el parámetro de búsqueda por nombre
                },
            });
            setResultadosFiltrados(response.data);
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };

    return (
        <div id="inputBuscador">
            <select value={filtroCategoria} onChange={handleCategoriaChange}>
                <option value="Todos">Todos</option>
                <option value="Fotografía">Fotografía</option>
                <option value="desarrollopersonal">Desarrollo Personal</option>
                <option value="musica">Música</option>
                <option value="diseño">Diseño</option>
            </select>

            <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={handleBusquedaChange}
            />

            <button onClick={handleBuscarClick}>Buscar</button>

            <ul>
                {resultadosFiltrados.map((item) => (
                    <li key={item._id}>{item.name} - {item.category}</li>
                ))}
            </ul>
        </div>
    );
};