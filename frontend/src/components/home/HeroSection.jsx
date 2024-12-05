import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "./../../assets/banners/banner1.png";
import banner2 from "./../../assets/banners/banner2.png";
import banner3 from "./../../assets/banners/banner3.png";
import banner4 from "./../../assets/banners/banner4.png";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Authentic Indian Spices",
      description: "Experience the true taste of India.",
    },
    {
      id: 2,
      image: banner2,
      title: "Groceries Delivered Fast",
      description: "Quality groceries at your convenience.",
    },
    {
      id: 3,
      image: banner3,
      title: "Snacks You'll Love",
      description: "Delicious treats for every occasion.",
    },
    {
      id: 4,
      image: banner4,
      title: "Fresh Ingredients",
      description: "Straight from the source.",
    },
  ];

  return (
    <section className="relative pt-[105px]">
      <Swiper
        spaceBetween={2000}
        effect={"fade"}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-[94%] rounded-[10px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden">
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                src={slide.image}
                alt={slide.title}
              />
            </div>
          </SwiperSlide>
        ))}
        <div
          style={{
            display: "none",
          }}
          className="swiper-pagination"
        ></div>
      </Swiper>
    </section>
  );
};

export default HeroSection;