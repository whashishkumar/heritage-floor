// import HeroSectionCommercial from "@/components/commercial/HeroSection";
import AboutUsCommercial from "@/components/commercial/AboutUs";
import BlogCommercial from "@/components/commercial/Blogs";
import CommercialProjects from "@/components/commercial/CommercialProjects";
import FlooringOptionsCommercial from "@/components/commercial/FlooringOptions";
import GetInTouch from "@/components/commercial/GetInTouch";
import HeroSectionCommercial from "@/components/commercial/HeroSection";
import OurMajorProjectsCommercial from "@/components/commercial/MajorProjects";
import OurCustomers from "@/components/commercial/OurCustomers";
import ServicesCommercial from "@/components/commercial/Services";
import TestimonialsCommercial from "@/components/commercial/Testimonials";
import WhyChooseUsCommercial from "@/components/commercial/WhyChooseUs";
import { CommercialPageData } from "@/lib/api/commercialEndPoints";
import { CommonComponentData } from "@/lib/api/commonEndPoints";

export default async function Home() {
  const blogs = await CommonComponentData.getOurBlogs(1);
  const ourCustomers = await CommercialPageData.getOurCustomers();
  const { data } = await CommonComponentData.getTestinomials();

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
