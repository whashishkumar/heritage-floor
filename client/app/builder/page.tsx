import ToolsGrid from "@/components/builder/ToolsGrid";
import BestsellerProducts from "@/components/builder/BestsellerProducts";
import CategoryProducts from "@/components/builder/CategoryProducts";
import OurCustomersCommercial from "@/components/commercial/OurCustomers";
import Solutions from "@/components/builder/Solutions";
import HeroSection from "@/components/residential/HeroSection";
import WhyChooseUsCommercial from "@/components/commercial/WhyChooseUs";
import TestimonialsCommercial from "@/components/commercial/Testimonials";
import GetInTouch from "@/components/commercial/GetInTouch";
import BlogCommercial from "@/components/commercial/Blogs";
import { BuilderPageData } from "@/lib/api/builderEndPoints";
import { CommonComponentData } from "@/lib/api/commonEndPoints";
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

const headerDataCategory = {
  heading: "Featured",
  subHeading: "Products",
};

const headerProductBestSeller = {
  heading: "Bestseller",
  subHeading: "Products",
};

export default async function Home() {
  const blogs = await CommonComponentData?.getOurBlogs(1);
  const builderBanner = await BuilderPageData.getBannerData();
  const customers = await BuilderPageData.getOurCustomers();
  const categoryBaseProducts = await BuilderPageData.getCategoryProducts();
  const bestSellerProducts = await BuilderPageData.bestSellerProducts();
  const { data } = await CommonComponentData?.getTestinomials();
  return (
    <>
      <HeroSection bannerData={builderBanner?.data} />
      <ToolsGrid />
      <BestsellerProducts
        bestSellerProducts={bestSellerProducts}
        productHeader={headerProductBestSeller}
      />
      <CategoryProducts catgoryProductsList={categoryBaseProducts} />
      <WhyChooseUsCommercial bgColor={"#018C99"} />
      <OurCustomersCommercial coustumerData={customers} />
      <BestsellerProducts
        productHeader={headerDataCategory}
        bestSellerProducts={bestSellerProducts}
      />
      <Solutions />
      <TestimonialsCommercial testinomialsData={data} />
      <BlogCommercial blogs={blogs} pagePath={"builder"} />
      <GetInTouch />
    </>
  );
}
