import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Philips Support Portal</h1>
      <div className="feature-grid">
        <Link to="/faqs" className="feature-card">
          <h3>FAQs</h3>
          <p>Find answers to common questions</p>
        </Link>
        <Link to="/warranty-check" className="feature-card">
          <h3>Warranty Check</h3>
          <p>Check your product warranty status</p>
        </Link>
        <Link to="/support-ticket" className="feature-card">
          <h3>Support Ticket</h3>
          <p>Submit a support request</p>
        </Link>
        <Link to="/dashboard" className="feature-card">
          <h3>AI Dashboard</h3>
          <p>View AI-powered development insights</p>
        </Link>
      </div>
    </div>
  );
};

export default Home; 