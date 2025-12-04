'use client';
import React, { useState } from 'react';
import { VscEdit } from 'react-icons/vsc';

interface Props {
  title: string;
  action?: string;
  amountValue?: string;
  addAddress?: string;
  children: React.ReactNode;
  handleOpenDrawer?: () => void;
  handleAddAddress?: () => void;
  handleEditAddress?: () => void;
}

export default function Section({
  title,
  action,
  children,
  amountValue,
  handleOpenDrawer,
  handleEditAddress,
  handleAddAddress,
  addAddress,
}: Props) {
  return (
    <>
      <div className="space-y-3 ">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold poppins-font">{title}</h2>
          <div className="flex gap-4 justify-center items-center">
            {action && (
              <button
                className="flex justify-center items-center gap-0 "
                onClick={handleEditAddress || handleOpenDrawer}
              >
                <p className="text-md text-red-500 cursor-pointer inter-font ">{action}</p>
                <VscEdit size={14} className="text-red-500 cursor-pointer" />
              </button>
            )}
            {addAddress && (
              <button
                className="flex justify-center items-center gap-0 "
                onClick={handleAddAddress}
              >
                <p className="text-md text-red-500 cursor-pointer inter-font capitalize">
                  {addAddress}
                </p>
                <VscEdit size={14} className="text-red-500 cursor-pointer" />
              </button>
            )}
          </div>
          {amountValue && <p className="inter-font">{amountValue}</p>}
        </div>
        {children}
      </div>
    </>
  );
}
