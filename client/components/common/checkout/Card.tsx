export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg  bg-white rounded-2xl  shadow-custom-md p-6">{children}</div>;
}
