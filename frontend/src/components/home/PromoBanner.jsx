import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import brandbanner1 from "../../assets/brandsbanner/Aachi_logo-e1683180461895.png";
import brandbanner2 from "../../assets/brandsbanner/Ajmi_logo-e1683180758599.png";
import brandbanner3 from "../../assets/brandsbanner/Aroma_logo-e1683180967195.png";
import brandbanner4 from "../../assets/brandsbanner/Brahmins_logo.png";
import brandbanner5 from "../../assets/brandsbanner/Elite_logo-e1683181130287.png";
import brandbanner6 from "../../assets/brandsbanner/Gbappa_logo-e1683180815457.png";
import brandbanner7 from "../../assets/brandsbanner/Idhayam_logo-e1683184686488.png";
import brandbanner8 from "../../assets/brandsbanner/Iyers_logo-e1683190056482.png";
import brandbanner9 from "../../assets/brandsbanner/Kerala-Pickle_logo-e1683181092912.png";
import brandbanner10 from "../../assets/brandsbanner/Meelas_logo.png";
import brandbanner11 from "../../assets/brandsbanner/Nambisans_logo-e1683180253644.png";
import brandbanner12 from "../../assets/brandsbanner/Periya_logo-e1683180926918.png";
import brandbanner13 from "../../assets/brandsbanner/Udhaiyam_logo-e1683180136639.png";
import brandbanner14 from "../../assets/brandsbanner/Veettamma_logo.png";
import contbanner1 from "../../assets/contentbanner/Cleaning.png";
import contbanner2 from "../../assets/contentbanner/Detergent.png";
import contbanner3 from "../../assets/contentbanner/Dish-wash.png";
import contbanner4 from "../../assets/contentbanner/Haircare.png";
import contbanner5 from "../../assets/contentbanner/Bath_Handwash.png";
import contbanner6 from "../../assets/contentbanner/Oral-care.png";
import contbanner7 from "../../assets/contentbanner/Subscription.png";

const PromoBanner = () => {
  const features = [
    {
      icon: "fas fa-shipping-fast",
      title: "Free Shipping",
      description: "When order over $75",
    },
    {
      icon: "fas fa-phone-volume",
      title: "24/7 Support",
      description: "Get support all day",
    },
    {
      icon: "fas fa-sync",
      title: "Refund",
      description: "Get refund within 3 days!",
    },
  ];

  const brandImages = [
    { src: brandbanner1, alt: "brandbanner1" },
    { src: brandbanner2, alt: "brandbanner2" },
    { src: brandbanner3, alt: "brandbanner3" },
    { src: brandbanner4, alt: "brandbanner4" },
    { src: brandbanner5, alt: "brandbanner5" },
    { src: brandbanner6, alt: "brandbanner6" },
    { src: brandbanner7, alt: "brandbanner7" },
    { src: brandbanner8, alt: "brandbanner8" },
    { src: brandbanner9, alt: "brandbanner9" },
    { src: brandbanner10, alt: "brandbanner10" },
    { src: brandbanner11, alt: "brandbanner11" },
    { src: brandbanner12, alt: "brandbanner12" },
    { src: brandbanner13, alt: "brandbanner13" },
    { src: brandbanner14, alt: "brandbanner14" },
  ];

  const contentImages = [
    { src: contbanner1, alt: "contbanner1" },
    { src: contbanner2, alt: "contbanner2" },
    { src: contbanner3, alt: "contbanner3" },
    { src: contbanner4, alt: "contbanner4" },
    { src: contbanner5, alt: "contbanner5" },
    { src: contbanner6, alt: "contbanner6" },
    { src: contbanner7, alt: "contbanner7" },
  ];

  return (
    // <section className="section__container banner__container">
    <>
      <div className="list-section">
        <div className="container">
          <div className="features-row">
            {features.map((feature, index) => (
              <div key={index} className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className={feature.icon}></i>
                </div>
                <div className="content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="content-banners">
        <Swiper
          spaceBetween={20}
          slidesPerView={5} // Default slides per view
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2, // 1 slide for mobile screens
            },
            768: {
              slidesPerView: 4, // 2 slides for tablets
            },
            1024: {
              slidesPerView: 5, // 5 slides for larger screens
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {contentImages.map((image, index) => (
            <SwiperSlide key={index} className="banner-slide">
              <img src={image.src} alt={image.alt} className="banner-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="bg-white pt-32 text-center">
        <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
          South Special, <span className="text-primary">Favourite</span> Brands
        </h2>
        <p className="text-text-light mt-4 text-sm lg:text-lg">
          Trusted by millions, these brands bring quality and tradition to your
          home.
        </p>

        <div className="relative overflow-hidden mt-10">
          <div className="flex space-x-14 animate-loop-scroll group-hover:paused">
            {brandImages.map((image, index) => (
              <img
                key={`brand-main-${index}`}
                src={image.src}
                alt={image.alt}
                className="max-w-none h-20"
              />
            ))}
            {brandImages.map((image, index) => (
              <img
                key={`brand-duplicate-${index}`}
                src={image.src}
                alt={image.alt}
                className="max-w-none h-20"
              />
            ))}
          </div>
          <br/><br/>
          {/* <div className="brands-banners"></div> */}
        </div>
      </div>

      
      <div className="architect"></div>
    </>
    // </section>
  );
};

export default PromoBanner;
