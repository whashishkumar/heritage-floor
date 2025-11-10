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
  // const heroSection = await ResidentailPageData.getHeroSection();
  const customerData = await ResidentailPageData.getOurCustomers();
  // console.log("Residential page OurCustomers Data:", customerData);
  const categories = await ResidentailPageData.getCategories();
  const flooringSelections = await ResidentailPageData.getFlooringSelections();
  const flooringInstallation =
    await ResidentailPageData.getFlooringInstallation();

  const whyChooseUs = await CommonComponentData.getWhyChooseUs();
  const blogs = await CommonComponentData?.getOurBlogs(1);
  // console.log("Why Choose Us:", whyChooseUs);

  const costumerData = [
    {
      image: "/images/residential/OurCustomers/1867.png",
      alt: "1867",
    },
    {
      image: "/images/residential/OurCustomers/Expert.png",
      alt: "Expert",
    },
    {
      image: "/images/residential/OurCustomers/Fuzion.png",
      alt: "Fuzion",
    },
    {
      image: "/images/residential/OurCustomers/Goodfellow.png",
      alt: "Goodfellow",
    },
    {
      image: "/images/residential/OurCustomers/Grandeur.png",
      alt: "Grandeur",
    },
    {
      image: "/images/residential/OurCustomers/italbec.png",
      alt: "italbec",
    },
    {
      image: "/images/residential/OurCustomers/Johnsonite.png",
      alt: "Johnsonite",
    },
    {
      image: "/images/residential/OurCustomers/Mapei.png",
      alt: "Mapei",
    },
    {
      image: "/images/residential/OurCustomers/Monoserra.png",
      alt: "Monoserra",
    },
    {
      image: "/images/residential/OurCustomers/Perfect Surfaces.png",
      alt: "Perfect Surfaces",
    },
    {
      image: "/images/residential/OurCustomers/Quickstyle.png",
      alt: "Quickstyle",
    },
    {
      image: "/images/residential/OurCustomers/Richmond.png",
      alt: "Richmond",
    },
  ];

  return (
    <>
      <HeroSection />
      <CategoriesResidential data={categories.data} />
      <SignatureFlooring data={flooringSelections.data} />
      <FeaturedProducts />
      <LocationBanner />
      <OurCustomers coustumerData={customerData} />
      <MajorProjectsResidential />
      <WhyChooseUsCommercial />
      <ExpertFlooringInstallation data={flooringInstallation} />
      <TestimonialsCommercial />
      <BlogCommercial blogs={blogs} pagePath={"residential"} />
      <GetInTouch />
    </>
  );
}
