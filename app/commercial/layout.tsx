import React from 'react';
import Navbar from '@/components/commercial/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="pt-[calc(3.125rem+4.563rem)]">{children}</main>
    </div>
  );
}
