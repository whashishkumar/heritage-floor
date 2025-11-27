import React from 'react';
import SidebarNav from './SideBarNav';
import MyProfileForm from './MyProfileForm';

export default function Profile() {
  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <div className="wrapper m-auto py-10 md:py-16">
        <div className="flex gap-5 md:gap-10 flex-col md:flex-row lg:flex-row">
          <div className="md:sticky  top-20 h-fit z-10">
            <SidebarNav />
          </div>
          <MyProfileForm />
        </div>
      </div>
    </div>
  );
}
