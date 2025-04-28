import React, { useState } from 'react';

const SupportTicket = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productModel: '',
    category: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be sent to a backend
    console.log('Support ticket submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="support-ticket-container">
        <div className="success-message">
          <h2>Thank you for submitting your ticket!</h2>
          <p>We have received your support request and will get back to you within 24 hours.</p>
          <p>Your reference number: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <button onClick={() => setSubmitted(false)} className="new-ticket-button">
            Submit Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="support-ticket-container">
      <h1>Submit a Support Ticket</h1>
      <form onSubmit={handleSubmit} className="support-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productModel">Product Model:</label>
          <input
            type="text"
            id="productModel"
            name="productModel"
            value={formData.productModel}
            onChange={handleChange}
            placeholder="e.g., HD1234"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Issue Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="technical">Technical Issue</option>
            <option value="warranty">Warranty Claim</option>
            <option value="product">Product Information</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Please describe your issue in detail..."
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default SupportTicket; 