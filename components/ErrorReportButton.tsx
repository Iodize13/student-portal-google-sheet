import React from 'react';

interface ErrorReportButtonProps {
  onClick: () => void;
}

const ErrorReportButton: React.FC<ErrorReportButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Report Error
    </button>
  );
};

export default ErrorReportButton;
