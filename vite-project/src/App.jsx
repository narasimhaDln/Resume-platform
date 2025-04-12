import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RealtimeProvider } from './context/RealtimeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import Demo from './pages/Demo';
import NotificationsPanel from './components/NotificationsPanel';
import FindJob from './pages/findJob';
import PostJob from './pages/postJob';

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
              <Route path="/findjobs" element={<FindJob />} />
              <Route path="/postjob" element={<PostJob />} />
              <Route path="/companies/register" element={<Companies />} />
              <Route path="/companies/:action" element={<Companies />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/create" element={<Profile />} />
              <Route path="/profile/:action" element={<Profile />} />
              <Route path="/demo" element={<Demo />} />
            </Routes>
          </main>
          <NotificationsPanel />
        </div>
      </Router>
    </RealtimeProvider>
  );
}

export default App;