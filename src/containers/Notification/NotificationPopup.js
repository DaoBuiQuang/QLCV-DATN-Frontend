import React, { useEffect } from "react";

export default function NotificationPopup({ title, body, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-white border-l-4 border-blue-500 shadow-lg p-4 rounded-lg w-80 animate-slide-in">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
          <p className="text-gray-600 mt-1">{body}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}