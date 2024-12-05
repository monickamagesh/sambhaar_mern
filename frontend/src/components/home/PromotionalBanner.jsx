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
    <div className="px-5 py-5 md:p-8 lg:px-6">
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
                className="h-auto w-full rounded-[20px]" // Added border radius here
                src={slide.image}
                alt={`Promo Banner`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PromotionSlider;