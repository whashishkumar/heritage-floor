'use client';
import React, { useState } from 'react';
import { VscEdit } from 'react-icons/vsc';

interface Props {
  title: string;
  action?: string;
  amountValue?: string;
  children: React.ReactNode;
}

export default function Section({ title, action, children, amountValue }: Props) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  console.log(openDrawer, 'openDrawer');

  return (
    <div className="space-y-3 ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold poppins-font">{title}</h2>
        {action && (
          <button className="flex justify-center items-center gap-0 " onClick={handleOpenDrawer}>
            <p className="text-md text-red-500 cursor-pointer inter-font ">{action}</p>
            <VscEdit size={14} className="text-red-500 cursor-pointer" />
          </button>
        )}
        {amountValue && <p className="inter-font">{amountValue}</p>}
      </div>
      {children}
    </div>
  );
}
