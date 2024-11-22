import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import shortBanner1 from "../../assets/promotionbanner/Banners_586x270_1.png";
import shortBanner2 from "../../assets/promotionbanner/Banners_586x270_2.png";
import shortBanner3 from "../../assets/promotionbanner/Banners_586x270_3.png";
import shortBanner4 from "../../assets/promotionbanner/Banners_586x270_4.png";
import shortBanner5 from "../../assets/promotionbanner/Banners_586x270_5.png";
// import { ArrowNext, ArrowPrev } from '@/components/icons';

// Breakpoints for Swiper slider
const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

const PromotionSlider = () => {
  const shortbanners = [
    { id: 1, image: shortBanner1 },
    { id: 2, image: shortBanner2 },
    { id: 3, image: shortBanner3 },
    { id: 4, image: shortBanner4 },
    { id: 5, image: shortBanner5 },
  ];

  return (
    <div className="border-t border-border-200 bg-light px-5 py-5 md:p-8 lg:px-6">
      <div className="relative">
        <Swiper
          id="offer"
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          {shortbanners.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                className="h-auto w-full"
                src={slide.image}
                alt={`Promo Banner`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div
          className="prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-left-5 rtl:md:-right-5"
          role="button"
        >
          <span className="sr-only">Previous</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-right-5"
          role="button"
        >
          <span className="sr-only">Next</span>
          <ArrowNext width={18} height={18} />
        </div> */}
      </div>
    </div>
  );
};

export default PromotionSlider;
