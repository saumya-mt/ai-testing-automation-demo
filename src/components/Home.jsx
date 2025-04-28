import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Home component - Main landing page for the Philips Support Portal
 * Displays a grid of feature cards for navigation
 */
const Home = () => {
  const [welcomeMessage] = useState('Welcome to Philips Support Portal');

  return (
    <div className="home-container">
      <h1>{welcomeMessage}</h1>
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

export default Home; // Add a comment for demo
// Testing updated workflow
