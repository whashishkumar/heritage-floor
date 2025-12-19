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
                className="bg-gradient-to-r from-primaryOne to-primaryTwo text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold cursor-pointer"
                // className="flex justify-center items-center gap-0 "
                onClick={handleEditAddress || handleOpenDrawer}
              >
                <p>{action}</p>
                {/* <VscEdit size={14} className="text-red-500 cursor-pointer" /> */}
              </button>
            )}
            {addAddress && (
              <button
                className="  bg-gradient-to-r from-primaryOne to-primaryTwo text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold cursor-pointer"
                onClick={handleAddAddress}
              >
                {/* <VscEdit size={14} className="text-red-500 cursor-pointer" /> */}
                <p>{addAddress}</p>
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
