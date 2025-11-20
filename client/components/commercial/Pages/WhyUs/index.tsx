export default function WhyUs() {
  return (
    <>
      <div className="relative w-full h-screen -mt-[8rem]">
        <div
          className="absolute inset-0 bg-cover bg-cente"
          style={{
            backgroundImage: "url('/images/commercial/aboutUs/aboutUsbg.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Content on top of background */}
        <div className="relative z-10 flex justify-center items-end h-full pb-15">
          <h2 className="text-white text-4xl font-bold">THE DAMAC LEGACY</h2>
        </div>
      </div>
    </>
  );
}
