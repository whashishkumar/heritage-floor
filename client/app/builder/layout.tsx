import Navbar from "@/components/residential/layout/Navbar";

export default function layout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
