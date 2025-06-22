import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import HomePage from './pages/homePage/HomePage';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import { LanguageProvider } from './context/LanguageContext';
import LoginPage from './pages/loginPage/LoginPage';



import NewsPage from './pages/newsPages/newsPage/NewsPage';
import PhotoGalleryPage from './pages/newsPages/photoGalleryPage/PhotoGalleryPage';


import ContactsPage from './pages/contactsPage/ContactsPage';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>

      <LanguageProvider>

        <Routes>

          <Route element={<DashboardLayout />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/:lang" element={<HomePage />} />

            
            <Route path="/:lang/news" element={<NewsPage />} />

            <Route path="/:lang/ads" element={<NewsPage />} />

            <Route path="/:lang/events" element={<NewsPage />} />

            <Route path="/:lang/wednesday-readings" element={<NewsPage />} />

            <Route path="/:lang/articles" element={<NewsPage />} />

            <Route path="/:lang/photo-gallery" element={<PhotoGalleryPage />} />

            <Route path="/:lang/contacts" element={<ContactsPage />} />

          </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/:lang/login" element={<LoginPage />} />
            
        </Routes>

      </LanguageProvider>

    </BrowserRouter>
  // </React.StrictMode>
);

