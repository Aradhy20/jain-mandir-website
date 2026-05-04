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

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
