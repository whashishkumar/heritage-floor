'use client';
import React from 'react';

export default function ModalBox({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-8 overflow-y-auto scrollbar-hide"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-black ">
          ✕
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
