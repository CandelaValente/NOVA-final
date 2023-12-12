import React from 'react';
import { Link } from "react-router-dom";
import coheteLogo from '../assets/multimedia/cohete_logo.png'


export function Nav() {
    return (
        <header>
            <nav className="container_nav" id="Incio">
                <div className="container_logo">
                    <img width="50px" height="50px" className="img_log" src={coheteLogo} alt="Logo" />
                    <h4 className="text_logo">NOVA</h4>
                </div>

                <ul className="container_list" id="container_list">
                    <li className="item_list  container_submenu">
                        <a className="item_link btn_submenu" href="#Cursos">Cursos</a>
                        <ul className="submenu" id="submenu">
                            <li className="item_list_"><a href="#" className="item_link_">Programación</a></li>
                            <li className="item_list_"><a href="#" className="item_link_">Diseño</a></li>
                            <li className="item_list_"><a href="#" className="item_link_">Marketing</a></li>
                            <li className="item_list_"><a href="#" className="item_link_">Desarrollo personal</a></li>
                            <li className="item_list_"><a href="#" className="item_link_">Música</a></li>
                            <li className="item_list_"><a href="#" className="item_link_">Fotografia</a></li>
                            <li className="item_list_"><a href="#Cursos" className="item_link_">Todos los cursos</a></li>
                        </ul>
                    </li>
                    <li className="item_list"><a className="item_link" href="#Nosotros">Nosotros</a></li>
                    <li className="item_list"><a className="item_link" href="#Contacto">Contacto</a></li>
                    <li className="item_list"><Link className="item_link registro" id="login" to={"/iniciar-sesion"}>Iniciar Sesión</Link></li>
               </ul>
            </nav>
        </header>
    )
}