import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Narvar from './layouts/Narvar';
import Inicio from './pages/Inicio';
import Footer from './layouts/Footer';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios.js';
import Nosotros from './pages/Nosotros.js';
import Contacto from './pages/Contacto.js';

function App() {
    return (
        <Router>
            <div className="App">
                <Narvar />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
