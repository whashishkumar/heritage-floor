'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { IoHeart } from 'react-icons/io5';
import Accordion from '../ui/Accordian';
import SwipeSlider from '../ui/SwipeSlider';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { FaExclamationCircle } from 'react-icons/fa';
import { ResidentailPageData } from '@/lib/api/residentialEndPoints';
import { useParams, useRouter } from 'next/navigation';
import Loader from '../ui/Loader';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { useToast } from '../ui/Tooltip';
import ModalBox from '../ui/ModalBox';
import QueryForm from '../common/QuearyForm';
import { useDebounce } from '@/hook/debounce';
import { usePathSegments } from '@/utils/segmentPath';
import { useAuth } from '@/context/userAuthContext';

const socialLinks = [
  {
    id: 1,
    icon: '/images/residential/fb.svg',
    link: 'https://www.facebook.com/',
    alt: 'Facebook',
  },
  {
    id: 2,
    icon: '/images/residential/insta.svg',
    link: 'https://www.instagram.com/',
    alt: 'Instagram',
  },
  {
    id: 3,
    icon: '/images/residential/whatsApp.svg',
    link: 'https://web.whatsapp.com/',
    alt: 'whatsApp',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Description',
    answer:
      'Crafted with precision, this flooring features intricate mosaic patterns that bring texture, depth, and personality to any environment. Made from high-quality materials, it is engineered for long-lasting performance, easy maintenance, and resistance to daily wear. Whether you’re refreshing your home or designing a commercial space, the Abstract Mosaic Floor delivers both beauty and practicality.',
  },
  {
    id: 2,
    question: 'Specifications',
    answer:
      '- Dimensions: 11.93" x 11.93"\n- PEI Rating: 4 (Suitable for heavy traffic areas)\n- Finish: Matte\n- Material: Durable ceramic/porcelain\n- Installation: Suitable for both residential and commercial applications\n- Maintenance: Easy to clean with regular sweeping and mopping\n- Warranty: 10-year limited warranty against manufacturing defects',
  },
  {
    id: 3,
    question: 'FAQs',
    answer: 'Q: Is this flooring suitable for outdoor use?',
  },
  {
    id: 4,
    question: 'Additional Details',
    answer:
      'For more information about installation guidelines, care instructions, or to explore complementary products, please contact our customer service team or visit our website.',
  },
];

const breakpoints = {
  340: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  440: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 6,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  2000: {
    slidesPerView: 8,
    spaceBetween: 25,
  },
};

const ProductDetailPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const params = useParams();
  const { sectionPath } = usePathSegments();
  const [productDetail, setProductDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug, childSlug } = params;
  const {
    images,
    sku,
    name,
    price,
    tile_details,
    shipping_details,
    related_products,
    is_wishlist,
    id,
    warehouse_pickup,
    scheduled_delivery,
  }: any = productDetail || {};
  const {
    box_price,
    price_per_sqft,
    sqft_per_box,
    sqft_per_tile,
    tile_length,
    tile_width,
    tiles_per_box,
  } = tile_details || {};
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [tileInsqFeet, setTileInswFeet] = useState('');
  const debouncedQuery = useDebounce(tileInsqFeet, 500);
  const [tileCalculations, setTileCalculations] = useState<any | null>(null);
  const { display_pricing } = tileCalculations?.data || {};
  const { boxes, product_price, required, total_price, discount_price } = display_pricing || {};
  const [reqMessage, setReqMessage] = useState<any | null>(null);
  const baseUrlImage = process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE;
  const RollCalculatorUI = () => {
    return (
      <div className="rounded-xl p-4 bg-white shadow-sm space-y-4 w-full my-4 poppins-font">
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">{boxes?.title}</span>
          <span>{boxes?.value}</span>
        </div>

        <div className="border-t" />
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">{product_price?.title}</span>
          <span>{product_price?.value}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span className="font-medium">{discount_price?.title}</span>
          <span>{discount_price?.value}</span>
        </div>

        <div className="text-gray-700 flex justify-between ">
          <span className="font-medium">{required?.title}</span>
          <span>{required?.value}</span>
        </div>

        <div className="flex justify-between font-semibold text-black">
          <span className="font-medium">{total_price?.title}</span>
          <span>{total_price?.value}</span>
        </div>
      </div>
    );
  };

  const handleChange = (e: any) => {
    setTileInswFeet(e.target.value);
  };
  const handleSelectProductImage = (image: { id: number; src: string; alt: string }) => {
    setSelectedImage(image);
  };

  const handleSelectRelatedProduct = (product: any) => {
    const { id } = product || {};
    router.push(`${sectionPath}/${slug}/${id}`);
  };

  const getProductDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await ResidentailPageData.getProductDetail(childSlug);
      const { images } = data;
      setProductDetail(data);
      setSelectedImage(images?.[0]);
    } catch (error: any) {
      showToast(error?.message || 'Failed to fetch product details', 'error');
      console.error('Error fetching product details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhshlistAdd = async (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault();
    setIsInWishlist(!isInWishlist);
    const wishLitItem = await CartEndPoint.addRemoveListItems(productId);
    const { message } = wishLitItem;
    showToast(message);

    const { data } = await ResidentailPageData.getProductDetail(childSlug);
    setProductDetail(data);
    // 🔥 notify all components
    window.dispatchEvent(new Event('wishList-update'));
  };

  const handleAddToCartProduct = async (id: number) => {
    const calculation = {
      product_id: id,
      required_sqft: tileInsqFeet,
    };
    if (isAuthenticated) {
      const resp = await CartEndPoint.addItemToCart(id, calculation);
      showToast(resp?.message);
      // 🔥 notify all components
      window.dispatchEvent(new Event('cart-updated'));
    } else {
      showToast('Please sign up or log in to continue.');
    }
  };

  const handleOpenQueryModal = () => {
    setIsQueryModalOpen(true);
  };

  const handleCloseQueryModal = () => {
    setIsQueryModalOpen(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setTileCalculations(null);
      return;
    }

    const fetchCalculation = async () => {
      try {
        const payload = {
          product_id: childSlug,
          required_sqft: debouncedQuery,
        };
        const resp = await CartEndPoint.getTilesCalculations(payload);
        setTileCalculations(resp);
        setReqMessage(null);
      } catch (error) {
        setReqMessage(error);
        // console.log(error);
      }
    };

    fetchCalculation();
  }, [debouncedQuery]);

  if (isLoading) {
    return (
      <div className="wrapper m-auto py-12 flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  console.log(shipping_details, 'shipping_details');

  return (
    <div className="wrapper m-auto py-12">
      <div className="p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-15">
        <div className="mb-4 lrft-col">
          <div className="overflow-hidden rounded-2xl ">
            <InnerImageZoom
              src={selectedImage?.src}
              zoomSrc={selectedImage?.src}
              width={750}
              height={500}
              hasSpacer={true}
              imgAttributes={{
                className: 'rounded-2xl object-cover w-full h-[400px] lg:h-[500px]',
                alt: selectedImage?.alt,
              }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 py-10">
            {images?.map((image: any) => (
              <div
                key={image.id}
                className={`cursor-pointer rounded-lg overflow-hidden border w-[120px] h-[80px] p-2 ${
                  selectedImage?.id === image.id ? 'border-[#018C99] p-0.5' : 'border-transparent'
                }`}
                onClick={() => handleSelectProductImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={80}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="border  border-[#DDDDDD] p-6 rounded-2xl bg-[#F6F6F6]">
            {shipping_details?.map((benefit: any) => (
              <div key={benefit.id} className="flex gap-4 mb-6 poppins-font">
                <div className="flex items-start justify-center h-10 w-10 ">
                  {benefit.icon && (
                    <Image
                      // baseUrlImage
                      // src={benefit.icon}
                      src={`${baseUrlImage}${baseUrlImage}`}
                      alt={benefit.title}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-xl  mb-2 text-black font-semibold">{benefit.title}</h3>
                  <Link href="#">
                    <p className="text-black text-sm font-normal underline">
                      {benefit.description}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] my-5"></p>
          <div className="flex gap-4 items-center">
            {socialLinks?.map((social) => (
              <Link key={social.id} href={social.link} target="_blank">
                <Image
                  src={social.icon}
                  alt={social.alt}
                  height={20}
                  width={20}
                  className="object-contain w-5 h-5 cursor-pointer"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="right-col ">
          {/* Product Information */}
          <div className="mb-4 poppins-font">
            {sku && (
              <p className="text-base mb-2 font-medium">
                SKU: {sku}
                <span className="ml-2 text-[#018C99] font-medium">By Hertiage</span>
              </p>
            )}
            {name && (
              <h2 className="font-medium mb-2 text-[1.688rem] text-black">
                {` ${name} - ${sqft_per_tile}`}
              </h2>
            )}
            {tile_width && tile_length && (
              <p className="text-base mb-2 text-black">
                {tile_width}" x {tile_length}" | PEI of {tiles_per_box} - Heavy Traffic | Matte
              </p>
            )}
            {price_per_sqft && (
              <p className="text-[1.688rem] font-bold">$ {price_per_sqft} / sq. ft</p>
            )}
            {box_price && sqft_per_box && (
              <p className="text-sm mt-2 text-black">
                ${box_price} / box ({sqft_per_box} sq. ft. / box)
              </p>
            )}
            <p className="bg-[#FFC107] p-3 px-4  poppins-font mt-4 w-fit flex items-center ">
              <span className="text-sm text-black font-medium">Want a better Price?</span>{' '}
              <span className="font-bold flex justify-center items-center gap-2 ">
                Ask for a quote!
                <FaExclamationCircle size={14} />
              </span>
            </p>
            <p className="mt-4">
              <Image
                src="/images/residential/Unread.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <span className="text-black font-medium text-[1rem]">In stock and ready to ship</span>
            </p>
            <div className="mt-4">
              <Image
                src="/images/residential/delivery01.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <span className="text-black font-semibold text-[1rem]">
                Scheduled Delivery: $180.00
              </span>
              <div className="mt-2 text-sm">
                Get it in 2 - 4 business days or on your preferred date
                <p className=" ">
                  Delivery to : 
                  <span className="underline cursor-pointer text-[#018C99] font-medium">
                    Toronto - Mos18BW
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Image
                src="/images/residential/calculation.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <span className="text-black font-semibold text-[1rem]">How many do you need ?</span>
              <p className="underline ml-2 text-sm  font-medium">
                <span className="mt-2 text-sm">Use our flooring area calculator</span>
              </p>
            </div>
          </div>
          {/* Quantity and Add to Cart */}
          <div className="mb-4 flex items-start flex-col">
            <div>
              <form>
                <div className="relative w-[312px] h-[56px]">
                  <input
                    value={tileInsqFeet}
                    onChange={handleChange}
                    type="number"
                    id="quantity"
                    className="w-full h-full border rounded text-sm border-[#018C99] outline-none p-4 pr-12 "
                    placeholder="Enter the quantity"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                    sq.ft
                  </span>
                </div>
              </form>
            </div>
            {reqMessage === null ? (
              <>{display_pricing && <RollCalculatorUI />}</>
            ) : (
              <p className="mt-2 text-sm">{reqMessage?.message}</p>
            )}
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] my-5"></p>
          {/* Buttons */}
          <div className="flex flex-col mb-4 space-y-4 ">
            <button
              onClick={() => handleAddToCartProduct(id)}
              className="bg-[#018C99] hover:cursor-pointer text-white font-semibold py-4 px-2 rounded-2xl text-sm flex gap-2 justify-center items-center"
            >
              Add To Cart
              <BsCart4 size={18} />
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleOpenQueryModal}
                className="bg-[#F5F5F5] hover:cursor-pointer   py-2 px-2 rounded-2xl text-lg mb-4 border border-[#018C99] font-semibold w-[540px] md:w-full"
              >
                Ask For Quote
                <p className="mt-1 text-xs">Get custom pricing for your project</p>
              </button>
              <button
                onClick={(e) => handleWhshlistAdd(e, productDetail?.id)}
                className={` hover:cursor-pointer py-2 px-2 rounded-2xl text-lg mb-4 border border-[#018C99] font-semibold transition-colors duration-200`}
              >
                {!is_wishlist ? (
                  <>
                    {!isInWishlist ? (
                      <CiHeart size={26} />
                    ) : (
                      <IoHeart size={26} className="text-[#018C99]" />
                    )}
                  </>
                ) : (
                  <IoHeart size={26} className="text-[#018C99]" />
                )}
              </button>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="mb-4 poppins-font">
            <div className="flex justify-start items-center ">
              <Image
                src="/images/residential/delivery01.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <h2 className="font-medium  text-xl text-black">Shipping Options</h2>
            </div>
            <div className="py-2">
              <div className=" text-xs">
                Delivery to : 
                <p>
                  <span className="underline cursor-pointer  font-medium">Toronto - Mos18BW</span>
                </p>
              </div>
            </div>

            <div className="flex gap-10 py-4">
              <div className="bg-white p-6 rounded-lg border border-[#DDDDDD]">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/images/residential/warehouse1.svg"
                    alt="In Stock"
                    height={37}
                    width={37}
                    className=" object-contain"
                  />
                </div>
                <h2 className="text-base font-semibold text-black mb-2 text-center">
                  Warehouse Pickup
                </h2>
                <p className="break-all text-center font-normal text-sm">{warehouse_pickup}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#DDDDDD]">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/images/residential/delivery-truck1.svg"
                    alt="In Stock"
                    height={37}
                    width={37}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-base font-semibold text-black mb-2 text-center">
                  Scheduled Delivery
                </h2>
                <p className="text-center font-normal text-sm">{scheduled_delivery}</p>
              </div>
            </div>
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] my-5"></p>
          {/* More Abstractions */}
          <div className="poppins-font">
            <div className="flex justify-start items-center gap-2 pb-4 ">
              <Image
                src="/images/residential/calander.png"
                alt="In Stock"
                height={18}
                width={18}
                className="object-contain"
              />
              <h2 className="font-medium  text-xl text-black ">
                Visit more Abstract Mosaic {related_products?.length} products
              </h2>
            </div>
            {related_products?.length > 0 && (
              <div className="flex gap-4 py-10 ">
                <SwipeSlider
                  slidesPerView={6}
                  bottomSwipeBtn={false}
                  swipebtn={true}
                  spaceBetween={10}
                  autoPlay={false}
                  breakpoints={breakpoints}
                >
                  {related_products?.map((product: any) => (
                    <div
                      key={product.id}
                      className="cursor-pointer w-[78px] h-[78px] overflow-hidden rounded-lg"
                      onClick={() => handleSelectRelatedProduct(product)}
                    >
                      {product?.image && (
                        <Image
                          src={product?.image?.src}
                          alt={product.id}
                          width={78}
                          height={78}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </SwipeSlider>
              </div>
            )}
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] "></p>
          {/* Description */}
          <div className="accordian-section">
            <Accordion faqs={faqs} />
          </div>
        </div>
      </div>

      {/* Query Modal */}
      <ModalBox isOpen={isQueryModalOpen} onClose={handleCloseQueryModal}>
        <QueryForm onClose={handleCloseQueryModal} />
      </ModalBox>
    </div>
  );
};

export default ProductDetailPage;
