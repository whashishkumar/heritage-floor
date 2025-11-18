import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";


const brandCollection =[
  {
    "id": 1,
    "name": "Brand One",
    "image": "/images/commercial/brands/brand01.webp"
  },
  {
    "id": 2,
    "name": "Brand Two",
    "image": "/images/commercial/brands/brand02.webp"
  },
  {
    "id": 3,
    "name": "Brand Three",
     "image": "/images/commercial/brands/brand03.webp"
  },
  {
    "id": 4,
    "name": "Brand Four",
     "image": "/images/commercial/brands/brand04.webp"
  },
  {
    "id": 5,
    "name": "Brand Five",
     "image": "/images/commercial/brands/brand05.webp"
  },
  {
    "id": 6,
    "name": "Brand Six",
    "image": "/images/commercial/brands/brand06.webp"
  },
  {
    "id": 7,
    "name": "Brand Seven",
     "image": "/images/commercial/brands/brand07.webp"
  },
  {
    "id": 8,
    "name": "Brand Eight",
     "image": "/images/commercial/brands/brand08.webp"
  }
]



export default function BrandCollebration() {
  return (
    <div className="wrapper m-auto w-full">
          <div className="">
                     <SectionHeader
                       subHeading="Iconic Brand Collaborations"
                       headingCss={ `text-darkBlue`}
                       description="When we build, we build to stay, to enrich, and to grow. Explore curated collaborations that reflect luxury within a unified ecosystem, featuring DAMAC’s exclusive partnerships with renowned brands."
                       mainCss={`flex flex-col items-center justify-center text-darkBlue `}
                       descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[100%] text-center align-middle  text-darkBlue `}
                       subHeadingCss={`text-darkBlue uppercase  tracking-[0.6rem]`}
                     />
              </div>
              <div className="flex gap-10 justify-center py-14 flex-wrap">
                {
                  brandCollection?.map(brand => {
                    return(
                      <div key={brand.id}>
                      <Image src={brand?.image} height={180} width={120} alt={"brand"} className="object-contain" />
                      </div>
                    )
                  })
                }
              </div>
              
                  <div className="my-10 w-full">
        <div className="relative w-full h-[38rem] ">
  <div
    className="absolute inset-0 rounded-2xl"
    style={{
      backgroundImage: "url('/images/commercial/brands/brandbg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
  <div className="relative w-full h-full flex items-center justify-center  md:pr-5 lg:pr-15">
    <div className="rounded-xl p-4 sm:p-10 bg-[#508699]/95  border border-white/60 lg:w-[420px] md:w-[250px]  ">
      <h1 className="tracking-[0.8rem] poppins-font text-center whitespace-pre-line text-2xl sm:text-sm lg:text-[1.813rem] font-extrabold uppercase tracking-widest text-white">
       Committed To A Sustainable Future
      </h1>
 
      <p className="text-center mx-auto text-base lg:text-lg text-white roboto-font">
With a holistic approach to sustainability, we lead in responsible construction and luxury property development, systematically adopting the highest environmental, social, and ethical standards. We aspire to be a global leader in creating sustainable developments that drive value for our partners, customers, communities, the environment, and our team members.

      </p>
      <button className="bg-white text-gray-500 py-4 w-full rounded-full uppercase mt-6">Discover More</button>
    </div>
  </div>
  </div>
            </div>
      </div>
   

  )
}
