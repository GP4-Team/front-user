// pages/user/TestComponent.jsx
import React from "react";

// Extremely simple component with zero dependencies
const TestComponent = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Test Component Works!</h1>
      <p className="mt-2">
        If you can see this message, the component is rendering correctly.
      </p>
    </div>
  );
};

export default TestComponent;
