import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <BrowserRouter>
      <div className={`${isDark ? 'dark' : ''}`}>
        <Toaster position="top-center" />
        <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        <Routes>
          <Route path="/login" element={<Login isDark={isDark} />} />
          <Route path="/signup" element={<Signup isDark={isDark} />} />
          <Route path="/dashboard" element={<Dashboard isDark={isDark} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;