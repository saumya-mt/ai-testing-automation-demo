import React, { useState } from 'react';

// Mock warranty data for demo
const mockWarrantyData = {
  'HD1234': {
    productName: 'Philips Air Fryer',
    purchaseDate: '2023-01-15',
    warrantyEnd: '2025-01-14',
    status: 'Active'
  },
  'SC5678': {
    productName: 'Philips Sonicare Toothbrush',
    purchaseDate: '2022-06-20',
    warrantyEnd: '2024-06-19',
    status: 'Active'
  },
  'TV9012': {
    productName: 'Philips Smart TV',
    purchaseDate: '2021-03-10',
    warrantyEnd: '2023-03-09',
    status: 'Expired'
  }
};

const WarrantyCheck = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setWarrantyInfo(null);

    if (mockWarrantyData[serialNumber]) {
      setWarrantyInfo(mockWarrantyData[serialNumber]);
    } else {
      setError('Product not found. Please check the serial number and try again.');
    }
  };

  return (
    <div className="warranty-check-container">
      <h1>Check Your Product Warranty</h1>
      <form onSubmit={handleSubmit} className="warranty-form">
        <div className="form-group">
          <label htmlFor="serialNumber">Product Serial Number:</label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
            placeholder="Enter serial number (e.g., HD1234)"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Check Warranty
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {warrantyInfo && (
        <div className="warranty-info">
          <h2>Warranty Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Product Name:</label>
              <span>{warrantyInfo.productName}</span>
            </div>
            <div className="info-item">
              <label>Purchase Date:</label>
              <span>{warrantyInfo.purchaseDate}</span>
            </div>
            <div className="info-item">
              <label>Warranty End Date:</label>
              <span>{warrantyInfo.warrantyEnd}</span>
            </div>
            <div className="info-item">
              <label>Status:</label>
              <span className={`status ${warrantyInfo.status.toLowerCase()}`}>
                {warrantyInfo.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarrantyCheck; 