import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./globals.css";
import "./styleguide.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { AuthModalProvider } from './services/authContext';
import { CartProvider } from "./services/cartContext";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AuthModalProvider>
    <CartProvider>
    <App/>
    </CartProvider>
    </AuthModalProvider>
  </BrowserRouter>
);

serviceWorker.unregister();

