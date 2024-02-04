import React from 'react';
import ReactDOM from 'react-dom/client';
import './styling/main.css';
import Header from './comps/Header';
import CoinCompass from './CoinCompass';
import Footer from './comps/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <CoinCompass />
    <Footer />
  </React.StrictMode>
);
