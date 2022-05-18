import React from 'react';

const ErrorPreview = ({ error }) => {
  return (
    <label className="label">
      <span className="label-text-alt text-red-500">{error}</span>
    </label>
  );
};

export default ErrorPreview;
