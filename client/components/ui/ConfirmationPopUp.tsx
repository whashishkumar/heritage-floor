'use client';
import React from 'react';

interface ConfirmationPopupProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationPopup({
  isOpen,
  title = 'Are you sure?',
  message = 'Do you want to continue?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmationPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 border border-gray-200">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mt-2 text-sm">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
