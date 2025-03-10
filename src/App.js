import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Narvar from './layouts/Narvar';
import Footer from './layouts/Footer';
import Inicio from './pages/public/Inicioo';
import Productos from './pages/public/Productos';
import Servicios from './pages/public/Servicios';
import Nosotros from './pages/public/Nosotros';
import Contacto from './pages/public/Contacto';

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
