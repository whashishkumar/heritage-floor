export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className=" rounded-lg p-4  bg-white rounded-2xl  p-6 shadow-custom-md">{children}</div>
  );
}
