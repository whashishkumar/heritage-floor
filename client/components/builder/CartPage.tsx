"use client";
import Image from "next/image";
import { useState } from "react";
import {
  FaArrowRight as ArrowRight,
  FaMinus as Minus,
  FaPlus as Plus,
  FaShieldAlt as Shield,
  FaShoppingBag as ShoppingBag,
  FaTag as Tag,
  FaTrashAlt as Trash2,
  FaTimes as X,
} from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

interface Promo {
  code: string;
  discount: number;
}

const CartPageComponent = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Oak Hardwood Flooring",
      image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=400&fit=crop",
      price: 8.99,
      quantity: 2,
      unit: "sq ft",
      color: "Natural Oak",
      finish: "Matte",
      thickness: "12mm",
    },
    {
      id: 2,
      name: "Luxury Vinyl Plank - Waterproof",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop",
      price: 4.5,
      quantity: 3,
      unit: "sq ft",
      color: "Grey Stone",
      finish: "Textured",
      thickness: "6mm",
    },
    {
      id: 3,
      name: "Classic Ceramic Tile Collection",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=400&fit=crop",
      price: 6.75,
      quantity: 1,
      unit: "sq ft",
      color: "Marble White",
      finish: "Glossy",
      thickness: "8mm",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);

  const updateQuantity = (id: any, change: any) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item,
      ),
    );
  };

  const removeItem = (id: any) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "FLOOR25") {
      setAppliedPromo({ code: "FLOOR25", discount: 0.25 });
    } else if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo({ code: "SAVE10", discount: 0.1 });
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const tax = (subtotal - discount) * 0.13;
  const total = subtotal - discount + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-yellow-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Start adding beautiful flooring to your cart!</p>
            <button className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white my-[4rem]">
      <div className=" wrapper mx-auto ">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl  p-6 shadow-custom-md">
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#e8e8e8]">
                <h2 className="text-2xl md:text-3xl font-bold text-darkBlue">Shopping Cart</h2>
                <span className="bg-gradient-to-r from-primaryOne to-primaryTwo text-white px-4 py-2 rounded-full text-sm font-bold">
                  {cartItems.length} Items
                </span>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br border border-[#e8e8e8]  from-gray-50 to-white rounded-xl p-4 md:p-6 transition-all duration-300  hover:shadow-lg shadow-primaryOne/10 border-l-4 border-l-primaryOne"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={20}
                          width={20}
                          className="w-full sm:w-32 h-32 object-cover rounded-xl shadow-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 pr-4">
                            {item.name}
                          </h3>
                          <div className=" flex items-center justify-center">
                            <button
                              //   onClick={() => removeItem(item.id)}
                              className="text-darkBlue hover:text-primaryTwo transition-colors p-2 hover:bg-primaryOne/10 rounded-full"
                            >
                              <IoHeartOutline className="w-6 h-6" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          {/* <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button> */}
                        </div>

                        {/* Specifications */}
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-gray-200">
                            {item.color}
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-gray-200">
                            {item.finish}
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-gray-200">
                            {item.thickness}
                          </span>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                          <div className="text-2xl font-bold text-primaryTwo">
                            ${(item.price * item.quantity).toFixed(2)}
                            <span className="text-sm text-gray-500 ml-2">
                              (${item.price.toFixed(2)}/{item.unit})
                            </span>
                          </div>

                          {/* Quantity Control */}
                          <div className="flex items-center gap-3 bg-white border rounded-[0.5rem] shadow-custom-sm border-[#e8e8e8] px-2 py-1 w-fit">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-10 h-10 rounded-full text-primaryGray  hover:bg-primaryOne hover:text-white transition-all duration-300 flex items-center justify-center font-bold"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-bold px-4">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 rounded-full text-primaryGray  hover:bg-primaryOne hover:text-white transition-all duration-300 flex items-center justify-center font-bold"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <TbTruckDelivery className="w-8 h-8 text-primaryOne mx-auto mb-2" />
                <p className="font-semibold text-gray-800">On Time Delivery</p>
                <p className="text-sm text-gray-600">On orders over $500</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <Shield className="w-8 h-8 text-primaryOne mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Secure Payment</p>
                <p className="text-sm text-gray-600">100% Protected</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <Tag className="w-8 h-8 text-primaryOne mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Best Prices</p>
                <p className="text-sm text-gray-600">Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-custom-md p-6 lg:sticky lg:top-24 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>

              {/* Promo Code */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primaryOne/70 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-gradient-to-r from-primaryOne/90 hover:scale-105 to-primaryTwo/90 text-white px-6 py-3 rounded-xl font-semibold hover:from-primaryOne hover:to-primaryTwo transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-green-700 font-semibold text-sm">
                      Code "{appliedPromo.code}" applied!
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-green-700 hover:text-green-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.discount * 100}%)</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Tax (13%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-bold text-primaryTwo">${total.toFixed(2)}</span>
                </div>

                <button className=" group w-full bg-gradient-to-r from-primaryOne/90 to-primaryOne text-white py-4 rounded-xl font-bold text-lg hover:from-primaryTwo/90 hover:to-primaryTwo shadow-lg hover:shadow-xl    flex items-center justify-center gap-2">
                  <span className=" group-hover:scale-110 transform  transition-all duration-300 flex items-center gap-2">
                    {" "}
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>

                <button className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                  Continue Shopping
                </button>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-gradient-to-br from-primaryOne/10 to-primaryTwo/10 rounded-xl p-4">
                <div className="flex items-center  gap-3">
                  <TbTruckDelivery className="w-[5rem] h-[4rem] text-primaryTwo flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageComponent;
