import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import HomePage from './pages/homePage/HomePage';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import { LanguageProvider } from './context/LanguageContext';
import LoginPage from './pages/loginPage/LoginPage';



import Test from './pages/test/Test';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>

      <LanguageProvider>

        <Routes>

          <Route element={<DashboardLayout />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/:lang" element={<HomePage />} />

            <Route path="/test" element={<Test />} />
            <Route path="/:lang/test" element={<Test />} />
            

          </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/:lang/login" element={<LoginPage />} />
            
        </Routes>

      </LanguageProvider>

    </BrowserRouter>
  // </React.StrictMode>
);

