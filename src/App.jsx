import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import FAQs from './components/FAQs';
import WarrantyCheck from './components/WarrantyCheck';
import SupportTicket from './components/SupportTicket';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">
              <img src="/philips-logo.svg" alt="Philips Logo" className="logo" />
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/warranty-check">Warranty Check</Link>
            <Link to="/support-ticket">Support Ticket</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/warranty-check" element={<WarrantyCheck />} />
            <Route path="/support-ticket" element={<SupportTicket />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Philips. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
