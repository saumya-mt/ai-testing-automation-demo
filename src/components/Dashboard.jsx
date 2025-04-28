import React, { useState, useEffect } from 'react';

// Mock data for demonstration
const mockData = {
  buildStatus: {
    status: 'Success',
    timestamp: new Date().toISOString(),
    commit: '8f4e21a',
    branch: 'main'
  },
  codeReview: [
    {
      file: 'src/components/Home.jsx',
      suggestions: [
        'Consider adding error boundaries for better error handling',
        'Optimize component re-renders using React.memo'
      ]
    },
    {
      file: 'src/components/FAQs.jsx',
      suggestions: [
        'Extract FAQ items to a separate data file',
        'Add keyboard navigation for accessibility'
      ]
    }
  ],
  generatedTests: [
    'Home.test.jsx - Testing navigation links',
    'FAQs.test.jsx - Testing accordion functionality',
    'WarrantyCheck.test.jsx - Testing form validation',
    'SupportTicket.test.jsx - Testing form submission'
  ]
};

const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>AI Development Dashboard</h1>
      
      {/* Build Status */}
      <section className="dashboard-section">
        <h2>Build Status</h2>
        <div className={`build-status ${data.buildStatus.status.toLowerCase()}`}>
          <div className="status-header">
            <span className="status-badge">{data.buildStatus.status}</span>
            <span className="status-timestamp">
              {new Date(data.buildStatus.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="status-details">
            <p>Branch: {data.buildStatus.branch}</p>
            <p>Commit: {data.buildStatus.commit}</p>
          </div>
        </div>
      </section>

      {/* Code Review */}
      <section className="dashboard-section">
        <h2>AI Code Review Comments</h2>
        <div className="code-review">
          {data.codeReview.map((review, index) => (
            <div key={index} className="review-item">
              <h3>{review.file}</h3>
              <ul>
                {review.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Generated Tests */}
      <section className="dashboard-section">
        <h2>AI-Generated Test Cases</h2>
        <div className="test-cases">
          {data.generatedTests.map((test, index) => (
            <div key={index} className="test-item">
              <span className="test-icon">✓</span>
              {test}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 