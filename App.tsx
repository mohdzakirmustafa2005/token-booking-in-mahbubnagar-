
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { ChatBot } from './components/ChatBot';
import { Home } from './pages/Home';
import { Hospitals } from './pages/Hospitals';
import { HospitalDetail } from './pages/HospitalDetail';
import { Booking } from './pages/Booking';
import { Profile } from './pages/Profile';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="/book/:doctorId" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<div className="p-20 text-center">Authentication Page Mock</div>} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </HashRouter>
  );
};

export default App;
