import React from "react";

const Modal = ({ isOpen, onClose,children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#111c2d] text-white p-4 rounded-md w-[800px] shadow-xl text-sm">
        <div className="flex justify-between">
          <div className="">New quote</div>
          <div className="text-base cursor-pointer" onClick={onClose}>
            x
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
