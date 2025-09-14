import React from "react";

function LoadingMessage({ message = "Loading products..." }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-gray-600 animate-pulse">
        {message}
      </p>
    </div>
  );
}

export default LoadingMessage;
