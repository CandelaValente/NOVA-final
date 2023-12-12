// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import AdminPanel from './admin/adminPanel';
import BusquedaProductos from './BusquedaProductos';
    function AdminPanelWithSearch() {
        const [resultados, setResultados] = useState([]);
    
        const handleSearch = async (term) => {
        try {
            // Realiza la solicitud al backend para buscar productos por nombre o categoría
            const response = await fetch(`http://localhost:3009/api/products/search-name-and-category?partialTerm=${term}`);
            
            if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
            }
        
            const data = await response.json();
            setResultados(data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
        };
    
        return (
        <>

            <BusquedaProductos onSearch={handleSearch} />

        {resultados.map((producto) => (
            <div key={producto.id}>
            <p>Nombre: {producto.name}</p>
            <p>Descripción: {producto.description}</p>
            <p>Precio: {producto.price}</p>
            <p>Categoria: {producto.category}</p>
            </div>
        ))}
            <AdminPanel />
        </>
        );
    }
    

    export default AdminPanelWithSearch;