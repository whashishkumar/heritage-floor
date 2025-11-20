import React from 'react';
import SideBarNav from './SideBarNav';

export default function MyAccount() {
  return (
    <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-16">
        <div className="flex">
          <SideBarNav />
          <div>
            <p>Component</p>
          </div>
        </div>
      </div>
    </div>
  );
}
