import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegisterForm from './screens/LoginRegisterForm.tsx';
import AdministratorSalesPanel from './screens/AdministratorSalesPanel.tsx';
import AdministratorProductsPanel from './screens/AdministratorProductsPanel.tsx';
import AddProduct from './screens/AddProduct.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegisterForm />} />
        <Route path="/login-register-form" element={<LoginRegisterForm />} />
        <Route path="/sales" element={<AdministratorSalesPanel />} />
        <Route path="/products" element={<AdministratorProductsPanel />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
