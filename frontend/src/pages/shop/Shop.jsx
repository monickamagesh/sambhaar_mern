import React from "react";
import Products from "../../components/shop/Products";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <>
      <div className="shop-banner relative flex w-full justify-center bg-slate-200 md:min-h-[250px] lg:min-h-[288px]">
        {/* <div className="relative flex w-full flex-col items-center justify-center">
          <h1 className="text-white text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Shopping
            </span>
          </h1>
          <div className="flex items-center">
            <ul className="flex w-full items-center overflow-hidden">
              <li className="px-2.5 text-sm text-white transition duration-200 ease-in hover:text-accent ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                <Link href={""} className="inline-flex items-center">
                  Home
                </Link>
              </li>
              <li className="mt-[1px] text-base text-white">
                <i className="ri-arrow-right-s-line"></i>
              </li>
              <li className="px-2.5 text-sm text-white transition duration-200 ease-in ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                Shopping
              </li>
            </ul>
          </div>
        </div> */}
      </div>

      <Products />

      <Footer />
    </>
  );
};

export default Shop;
