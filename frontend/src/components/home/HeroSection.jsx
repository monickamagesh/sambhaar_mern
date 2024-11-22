import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "./../../assets/banners/Banner_1.png";
import banner2 from "./../../assets/banners/Banner_2.png";
import banner3 from "./../../assets/banners/Banner_3.png";
import banner4 from "./../../assets/banners/Banner_4.png";

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
    <section className="relative -mt-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full h-[calc(100vh+4rem)]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <img
                style={{ objectFit: "fill" }}
                src={slide.image}
                alt={slide.title}
                className="h-full min-h-140 w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
