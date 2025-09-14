
import React from "react";

function ErrorMessage({ message = "Error fetching products" }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-red-500">{message}</p>
    </div>
  );
}

export default ErrorMessage;
