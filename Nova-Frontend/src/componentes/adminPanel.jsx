import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BusquedaProductos } from './BusquedaProductos';

export function AdminPanel()  {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        category: '',
        description: '',
        image: '', // Puedes agregar más campos según tus necesidades
        price: 0,
        name: '',
    });
    const [editProduct, setEditProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3009/api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Error al obtener la lista de productos');
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3009/api/products/${productId}`);
            fetchProducts();
        } catch (error) {
            setError('Error al eliminar el producto');
        }
    };

    const handleAddProduct = async () => {
        try {
            // Convertir price a número
            const numericPrice = parseFloat(newProduct.price);

            console.log('Nuevo Producto:', { ...newProduct, price: numericPrice });

            // Esperar a que la solicitud POST se complete antes de llamar a fetchProducts
            await axios.post(
                'http://localhost:3009/api/products/create',
                { ...newProduct, price: numericPrice },
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Después de que la solicitud POST se complete, actualizar la lista de productos
            await fetchProducts();

            setShowForm(false);
            setNewProduct({
                category: '',
                description: '',
                image: '',
                price: 0,
                name: '',
            });
        } catch (error) {
            setError('Error al agregar el nuevo producto');
        }
    };

    const handleEditButtonClick = (product) => {
        setEditProduct(product);
        setShowEditForm(true);
    };


    const handleEditProduct = async () => {
        try {
            // Convertir price a número
            const numericPrice = parseFloat(editProduct.price);

            console.log('Datos de editProduct antes de la solicitud:', editProduct);
            const url = `http://localhost:3009/api/products/${editProduct._id}`;
            console.log('URL de la solicitud PUT:', url);

            const { data, error } = await axios.put(
                url,
                { ...editProduct, price: numericPrice },
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Respuesta del servidor:', data);

            if (error) {
                console.error('Error en la solicitud PUT:', error);
                setError('Error al enviar la solicitud de edición del producto');
            } else {
                if (data && data.error) {
                    console.error('Error en la respuesta del servidor:', data.error);
                    setError('Error al editar el producto: ' + data.error);
                } else {
                    await fetchProducts();
                    setShowEditForm(false);
                    setEditProduct(null);
                }
            }
        } catch (error) {
            console.error('Error en handleEditProduct:', error);
            setError('Error inesperado al editar el producto');
        }
    };



    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setEditProduct(null);
    };

    return (
        <>
            <BusquedaProductos></BusquedaProductos>
            <div className="admin-panel">
                <h2>Panel de Administración</h2>

                {/* Botón para mostrar/ocultar el formulario */}
                <button className='btn' onClick={() => setShowForm(!showForm)}>Agregar Curso</button>

                {/* Formulario para agregar un nuevo producto */}
                {showForm && (
                    <form className='form'>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />

                        <label htmlFor="category">Categoría:</label>
                        <input
                            type="text"
                            id="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        />

                        <label htmlFor="description">Descripción:</label>
                        <input
                            type="text"
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />

                        <label htmlFor="price">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />

                        <label htmlFor="image">Imagen (URL):</label>
                        <input
                            type="text"
                            id="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />

                        <button className='btn' type="button" onClick={handleAddProduct}>
                            Agregar Producto
                        </button>
                    </form>
                )}


                <section>
                    <h3>Lista de Productos</h3>
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.image}</td>
                                        <td>
                                            <button onClick={() => handleDelete(product._id)}>
                                                Eliminar
                                            </button>
                                            <button onClick={() => handleEditButtonClick(product)}>
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>

                {/* Formulario de edición */}
                {showEditForm && (
                    <form className='form'>
                        <label htmlFor="editName">Nombre:</label>
                        <input
                            type="text"
                            id="editName"
                            value={editProduct.name}
                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                        />

                        <label htmlFor="editCategory">Categoría:</label>
                        <input
                            type="text"
                            id="editCategory"
                            value={editProduct.category}
                            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                        />

                        <label htmlFor="editDescription">Descripción:</label>
                        <input
                            type="text"
                            id="editDescription"
                            value={editProduct.description}
                            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                        />

                        <label htmlFor="editPrice">Precio:</label>
                        <input
                            type="number"
                            id="editPrice"
                            value={editProduct.price}
                            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                        />

                        <label htmlFor="editImage">Imagen (URL):</label>
                        <input
                            type="text"
                            id="editImage"
                            value={editProduct.image}
                            onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                        />


                        <button className='btn' type="button" onClick={handleEditProduct}>
                            Guardar Cambios
                        </button>
                        <button className='btn' type="button" onClick={handleCloseEditForm}>
                            Cerrar
                        </button>
                    </form>
                )}


            </div>
        </>
    );
};

