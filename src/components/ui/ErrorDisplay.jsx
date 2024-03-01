import React from 'react';

const ErrorDisplay = ({ error }) => {
  return (
    <div className="error-container">
      <strong>Error:</strong> {error.message}
    </div>
  );
};

export default ErrorDisplay;
