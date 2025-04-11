import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RealtimeProvider } from './context/RealtimeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import NotificationsPanel from './components/NotificationsPanel';

function App() {
  return (
    <RealtimeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <NotificationsPanel />
        </div>
      </Router>
    </RealtimeProvider>
  );
}

export default App;