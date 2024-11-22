import React, { useEffect } from 'react'
import HeroSection from '../../components/home/HeroSection'
import Categories from '../../components/home/categories'
import HomeCards from '../../components/home/HomeCards'
import Trending from '../../components/shop/Trending'
import DealsSection from '../../components/home/DealsSection'
import PromoBanner from '../../components/home/PromoBanner'
import Blogs from '../../components/blogs/blogs'
import Footer from '../../components/Footer'
import Products from '../../components/shop/Products'
import PromotionSlider from '../../components/home/PromotionalBanner'

const Home = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div>
        <HeroSection />
        <PromotionSlider />
        {/* <Categories /> */}
        {/* <Trending /> */}
        <Products />
        <DealsSection />
        <PromoBanner />
        <Footer />
    </div>
  )
}

export default Home