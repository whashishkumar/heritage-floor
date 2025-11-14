import BestsellerProducts from "@/components/builder/BestsellerProducts";
import CartPageComponent from "@/components/builder/CartPage";
import CategoryProducts from "@/components/builder/CategoryProducts";

const headerProductBestSeller = {
  heading: "Bestseller",
  subHeading: "Products",
};
export default async function CartPage() {
  return (
    <>
      <CartPageComponent />
      <BestsellerProducts data={headerProductBestSeller} />
      <CategoryProducts />
    </>
  );
}
