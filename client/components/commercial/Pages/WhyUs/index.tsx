export default function WhyUs({banner}:any) {
  const {image, heading } = banner||{};
  const bannerImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${image}`;

  return (
    <>
      <div className="relative w-full h-screen -mt-[8rem]">
        <div
          className="absolute inset-0 bg-cover bg-cente"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 flex justify-center items-end h-full pb-15">
          <h2 className="text-white text-4xl font-bold">{heading}</h2>
        </div>
      </div>
    </>
  );
}
