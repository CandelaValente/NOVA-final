import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export function FormInicio({ onClose }) {
    const [showFormInicio, setShowFormInicio] = useState(false);

    const handleToggleForm = () => {
        setShowFormInicio(!showFormInicio);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setShowFormInicio(false);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            navigate('/admin-panel'); // Puedes redirigir a la ruta deseada después del inicio de sesión exitoso
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };
    

    return (
        <>

            <div className="diseñoFormulario" id="container_sesion">
                <form className="form" id="form_inicio" onSubmit={handleSubmit}>

                    <h2 className="titulo">Inicio de Sesion</h2>
                    <span className="close" id="btn_cerrar" onClick={onClose} >
                        <Link to={"/"}>
                            <img className="icon_close" src="./multimedia/close.svg" alt="" />
                        </Link>
                    </span>
                    <div className="inputForm">
                        <label htmlFor="username">Usuario:</label>
                        <input type="text"
                            placeholder="Ingrese su usuario"
                            id="username" autoComplete="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="inputForm">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password"
                            placeholder="Ingrese su contraseña"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>


                    <button type="button" className="btn" id="btn_inicio" onClick={handleLogin}>
                        Iniciar Sesión
                    </button>
                    {error && <p>{error}</p>}

                    <p className="text">¿No tenes cuenta?
                        <a href="#" className="registro_inicio_sesion" >
                            <Link to={"/registrar-usuario"}>¡Registrate!</Link>
                        </a> </p>

                </form >
            </div >

        </>
    );
}