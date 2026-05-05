import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Jambudweep from './pages/Jambudweep';
import GalleryPage from './pages/GalleryPage';
import Donations from './pages/Donations';
import Leaders from './pages/Leaders';

import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import ManageBlogs from './admin/pages/ManageBlogs';
import ManageGallery from './admin/pages/ManageGallery';
import ManageEvents from './admin/pages/ManageEvents';
import ManageNews from './admin/pages/ManageNews';
import ProtectedRoute from './admin/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="leaders" element={<Leaders />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="events" element={<Events />} />
          <Route path="jambudweep" element={<Jambudweep />} />
          <Route path="donations" element={<Donations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="news" element={<ManageNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
