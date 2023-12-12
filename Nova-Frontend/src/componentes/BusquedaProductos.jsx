import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function BusquedaProductos({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="inputBuscador">
            <label >
                Buscar por Nombre o Categoría:
                <input type="text" value={searchTerm} onChange={handleInputChange} />
            </label>
            <button className='pagination-button' onClick={handleSearchClick}>Buscar</button>
        </div>
    );
}

BusquedaProductos.propTypes = {
    onSearch: PropTypes.func.isRequired,
};


