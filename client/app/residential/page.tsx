import BlogCommercial from "@/components/commercial/Blogs";
import GetInTouch from "@/components/commercial/GetInTouch";
import OurCustomers from "@/components/commercial/OurCustomers";
import TestimonialsCommercial from "@/components/commercial/Testimonials";
import WhyChooseUsCommercial from "@/components/commercial/WhyChooseUs";
import CategoriesResidential from "@/components/residential/Categories";
import ExpertFlooringInstallation from "@/components/residential/ExpertFlooringInstallation";
import FeaturedProducts from "@/components/residential/FeaturedProducts";
import HeroSection from "@/components/residential/HeroSection";
import LocationBanner from "@/components/residential/LocationBanner";
import MajorProjectsResidential from "@/components/residential/MajorProjects";
import SignatureFlooring from "@/components/residential/SignatureFlooring";
import { CommonComponentData } from "@/lib/api/commonEndPoints";
import { ResidentailPageData } from "@/lib/api/residentialEndPoints";

export default async function Home() {
  const customerData = await ResidentailPageData.getOurCustomers();
  const categories = await ResidentailPageData.getCategories();
  const flooringSelections = await ResidentailPageData.getFlooringSelections();
  const flooringInstallation = await ResidentailPageData.getFlooringInstallation();
  const blogs = await CommonComponentData.getOurBlogs(1);
  const featureData = await ResidentailPageData.getOurMajorProjects();
  const { data } = await CommonComponentData.getTestinomials();

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
      <TestimonialsCommercial testinomialsData={data} />
      <BlogCommercial blogs={blogs} pagePath={"residential"} />
      <GetInTouch />
    </>
  );
}
