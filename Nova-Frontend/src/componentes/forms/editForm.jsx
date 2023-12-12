import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FormEdit({ editProduct, handleEditProduct }) {
    const navigate = useNavigate(); // Utilizamos useNavigate para la redirección
    const [showForm, setShowForm] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...editProduct });

    const handleOpen = () => {
        setShowForm(true);
    };

    const handleEditProduct = (event) => {
        event.preventDefault();

        // Lógica para editar el producto
        handleEditProduct(editedProduct);

        setShowForm(false);
        navigate('/admin-panel');
    };

    const handleCloseEditForm = () => {
        setShowForm(false);
        navigate('/admin-panel');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    return (
        <>
            <div className="diseñoFormulario" id="container_nuevo">
                <form className="form">
                <h2 className="titulo">Editar curso</h2>
                        <span className="close" onClick={handleClose}>
                            <img className="icon_close" src="./multimedia/close.svg" alt="" />
                        </span>
                    <label htmlFor="editName" className="inputForm">Nombre:</label>
                    <input
                        type="text"
                        id="editName"
                        value={editProduct.name}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />

                    <label htmlFor="editCategory" className="inputForm">Categoría:</label>
                    <input
                        type="text"
                        id="editCategory"
                        value={editProduct.category}
                        onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    />

                    <label htmlFor="editDescription" className="inputForm">Descripción:</label>
                    <input
                        type="text"
                        id="editDescription"
                        value={editProduct.description}
                        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    />

                    <label htmlFor="editPrice" className="inputForm">Precio:</label>
                    <input
                        type="number"
                        id="editPrice"
                        value={editProduct.price}
                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    />

                    <label htmlFor="editImage" className="inputForm">Imagen (URL):</label>
                    <input
                        type="text"
                        id="editImage"
                        value={editProduct.image}
                        onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                    />


                    <button type="button" onClick={handleEditProduct}>
                        Guardar Cambios
                    </button>

                </form>
            </div>
        </>
    );
}



/*
                <div className="diseñoFormulario" id="container_nuevo">
                    <form className="form" onSubmit={handleSubmit}>

                        <h2 className="titulo">Editar curso</h2>
                        <span className="close" onClick={handleClose}>
                            <img className="icon_close" src="./multimedia/close.svg" alt="" />
                        </span>
                        <div className="inputForm">
                            <input type="text" placeholder="Categoría" name="category" />
                        </div>
                        <div className="inputForm">
                            <input type="text" placeholder="Imagen" name="image" />
                        </div>
                        <div className="inputForm">
                            <input type="text" placeholder="Descripción" name="description" />
                        </div>
                        <div className="inputForm">
                            <input type="price" placeholder="Precio" name="price" />
                        </div>
                        <div className="inputForm">
                            <input type="text" placeholder="Titulo" name="title" />
                        </div>
                        <div className="inputForm">
                            <input type="submit" value="Enviar" />
                        </div>

                    </form>
                </div>
        </> */