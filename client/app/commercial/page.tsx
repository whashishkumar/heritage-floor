import HeroSectionCommercial from "@/components/commercial/HeroSection";
// import HeroSectionCommercial from "@/components/commercial/HeroSection";
import AboutUsCommercial from "@/components/commercial/AboutUs";
import BlogCommercial from "@/components/commercial/Blogs";
import CommercialProjects from "@/components/commercial/CommercialProjects";
import FlooringOptionsCommercial from "@/components/commercial/FlooringOptions";
import GetInTouch from "@/components/commercial/GetInTouch";
import OurMajorProjectsCommercial from "@/components/commercial/MajorProjects";
import OurCustomers from "@/components/commercial/OurCustomers";
import ServicesCommercial from "@/components/commercial/Services";
import TestimonialsCommercial from "@/components/commercial/Testimonials";
import WhyChooseUsCommercial from "@/components/commercial/WhyChooseUs";
import { CommercialPageData } from "@/lib/api/commercialEndPoints";
import { CommonComponentData } from "@/lib/api/commonEndPoints";

export default async function Home({ params }: any) {
  const { slug } = await params;
  
  const costumerData = [
    {
      image: "/images/commercial/customer/York.png",
      alt: "York",
    },
    {
      image: "/images/commercial/customer/Shell.png",
      alt: "Shell",
    },
    {
      image: "/images/commercial/customer/lcbo.png",
      alt: "lcbo",
    },
    {
      image: "/images/commercial/customer/Jasper.png",
      alt: "Jasper",
    },
    {
      image: "/images/commercial/customer/Centuty21.png",
      alt: "Centuty21",
    },
    {
      image: "/images/commercial/customer/Baymont.png",
      alt: "Baymont",
    },
    {
      image: "/images/commercial/customer/Jasper.png",
      alt: "Jasper",
    },
  ];

  const blogs = await CommonComponentData.getOurBlogs(1);
  const ourCustomers = await CommercialPageData.getOurCustomers();
  const { data } = await CommonComponentData?.getTestinomials();

  return (
    <>
      <HeroSectionCommercial />
      <AboutUsCommercial />
      <OurCustomers coustumerData={ourCustomers} />
      <OurMajorProjectsCommercial />
      <WhyChooseUsCommercial />
      <ServicesCommercial />
      <CommercialProjects />
      <FlooringOptionsCommercial />
      <TestimonialsCommercial testinomialsData={data} />
      <BlogCommercial blogs={blogs} pagePath={"commercial"} />
      <GetInTouch />
    </>
  );
}
