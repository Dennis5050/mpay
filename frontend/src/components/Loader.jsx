import React from "react";

const Loader = ({ text = "Processing..." }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Loader;