import dynamic from "next/dynamic";
import BlogCommercial from "@/components/commercial/Blogs";
import HeroSection from "@/components/residential/HeroSection";
import CategoriesResidential from "@/components/residential/Categories";
import SignatureFlooring from "@/components/residential/SignatureFlooring";
import FeaturedProducts from "@/components/residential/FeaturedProducts";
import LocationBanner from "@/components/residential/LocationBanner";
import GetInTouch from "@/components/commercial/GetInTouch";
import TestimonialsCommercial from "@/components/commercial/Testimonials";
import WhyChooseUsCommercial from "@/components/commercial/WhyChooseUs";
import MajorProjectsResidential from "@/components/residential/MajorProjects";
import OurCustomers from "@/components/commercial/OurCustomers";
import ExpertFlooringInstallation from "@/components/residential/ExpertFlooringInstallation";
import { ResidentailPageData } from "@/lib/api/endpoints";
import { CommonComponentData } from "@/lib/api/endpoints";

export default async function Home() {
  const customerData = await ResidentailPageData.getOurCustomers();
  const categories = await ResidentailPageData.getCategories();
  const flooringSelections = await ResidentailPageData.getFlooringSelections();
  const flooringInstallation =
    await ResidentailPageData.getFlooringInstallation();
  const blogs = await CommonComponentData?.getOurBlogs(1);
  const featureData = await ResidentailPageData?.getOurMajorProjects();

  return (
    <>
      <HeroSection />
      <CategoriesResidential data={categories.data} />
      <SignatureFlooring data={flooringSelections.data} />
      <FeaturedProducts />
      <LocationBanner />
      <OurCustomers coustumerData={customerData} />
      <MajorProjectsResidential majorProjects={featureData} />
      <WhyChooseUsCommercial />
      <ExpertFlooringInstallation data={flooringInstallation} />
      <TestimonialsCommercial />
      <BlogCommercial blogs={blogs} pagePath={"residential"} />
      <GetInTouch />
    </>
  );
}
