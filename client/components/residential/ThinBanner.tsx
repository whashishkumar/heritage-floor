export default async function ThinBanner() {
  return (
    <div
      className="w-full  relative overflow-hidden  bg-cover bg-center bg-no-repeat py-[1.15rem]"
      style={{
        backgroundImage: "url('/images/residential/minimal.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#222626CC]/80"></div>
      <div className=" w-full wrapper mx-auto  flex items-center justify-center relative h-full">
        <p className="text-white text-xl font-light leading-[1.2800] text-center poppins-font">
          Heritage Floor & Homes a unit of GTA Flooring Canada
        </p>
      </div>
    </div>
  );
}
