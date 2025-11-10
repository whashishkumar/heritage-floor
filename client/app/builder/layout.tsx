import Navbar from "@/components/residential/layout/Navbar";
import React from "react";

export default function layout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
