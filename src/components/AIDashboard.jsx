import React, { useState, useEffect } from 'react';
import './AIDashboard.css';

const AIDashboard = () => {
  const [insights, setInsights] = useState({
    codeReview: [],
    testCoverage: 0,
    aiSuggestions: [],
    recentActivity: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading AI insights
    setTimeout(() => {
      setInsights({
        codeReview: [
          { component: 'WarrantyCheck', suggestions: ['Add error boundaries', 'Implement loading state'] },
          { component: 'SupportTicket', suggestions: ['Add form validation', 'Improve accessibility'] }
        ],
        testCoverage: 85,
        aiSuggestions: [
          'Consider implementing React.memo for performance',
          'Add PropTypes for better type checking',
          'Implement error boundaries for better error handling'
        ],
        recentActivity: [
          { time: '2 hours ago', action: 'Generated tests for Dashboard component' },
          { time: '4 hours ago', action: 'Code review completed for PR #42' },
          { time: '1 day ago', action: 'Suggested optimizations for FAQs component' }
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="ai-dashboard loading">
        <div className="loader">
          <div className="loader-text">Loading AI Insights...</div>
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-dashboard">
      <h1>AI Development Insights</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>🔍 Code Review Insights</h2>
          <div className="code-review-list">
            {insights.codeReview.map((review, index) => (
              <div key={index} className="review-item">
                <h3>{review.component}</h3>
                <ul>
                  {review.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2>🧪 Test Coverage</h2>
          <div className="test-coverage">
            <div className="coverage-circle">
              <span className="coverage-number">{insights.testCoverage}%</span>
            </div>
            <div className="coverage-label">Test Coverage</div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>💡 AI Suggestions</h2>
          <ul className="suggestions-list">
            {insights.aiSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card">
          <h2>📊 Recent Activity</h2>
          <div className="activity-timeline">
            {insights.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-time">{activity.time}</span>
                <span className="activity-description">{activity.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboard; 