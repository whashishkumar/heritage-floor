import BestsellerProducts from '@/components/builder/BestsellerProducts';
import CategoryProducts from '@/components/builder/CategoryProducts';
import CartPageComponent from '@/components/productCart/CartPage';
const headerProductBestSeller = {
  heading: 'Bestseller',
  subHeading: 'Products',
};
export default async function CartPage() {
  return (
    <>
      <CartPageComponent />
      {/* <BestsellerProducts data={headerProductBestSeller} /> */}
      {/* <CategoryProducts /> */}
    </>
  );
}
