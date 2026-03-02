import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const typeStyles = {
    success: {
      bg: "bg-green-500",
      icon: "check_circle",
      text: "text-white",
    },
    error: {
      bg: "bg-red-500",
      icon: "error",
      text: "text-white",
    },
    warning: {
      bg: "bg-orange-500",
      icon: "warning",
      text: "text-white",
    },
    info: {
      bg: "bg-blue-500",
      icon: "info",
      text: "text-white",
    },
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`${style.bg} ${style.text} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[400px] transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <span className="material-symbols-outlined text-2xl">{style.icon}</span>
      <p className="flex-1 font-medium text-sm">{message}</p>
      <button
        onClick={handleClose}
        className="hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
};

export default Toast;
