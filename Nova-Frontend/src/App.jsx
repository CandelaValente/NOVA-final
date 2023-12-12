import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import { Nav } from './componentes/nav.jsx';
import { Home } from './componentes/home.jsx'
import { AdminPanel } from './componentes/adminPanel.jsx';


import { Footer } from './componentes/footer.jsx';
import { FormInicio } from './componentes/forms/formInicio.jsx';
import { FormRegistro } from './componentes/forms/formRegistro.jsx';


function App() {

  return (
    <>


      <BrowserRouter>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesion" element={<FormInicio />} />
          <Route path="/registrar-usuario" element={<FormRegistro />} />
          <Route path="/admin-panel" element={<AdminPanel />} />

          <Route path="/admin/*" element={null} />
          <Route path="/*" element={<Footer />} />

        </Routes>



        <Footer></Footer>
      </BrowserRouter>

      <a href="index.js"></a>

    </>
  );
}

export default App;