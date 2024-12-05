import React, { useEffect } from 'react'
import HeroSection from '../../components/home/HeroSection'
import DealsSection from '../../components/home/DealsSection'
import PromoBanner from '../../components/home/PromoBanner'
import PromotionSlider from '../../components/home/PromotionalBanner'
import Footer from '../../components/Footer'
import Trending from '../../components/shop/Trending'
import Categories from '../../components/home/Categories'
import Products from '../../components/shop/Products'

const Home = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div >
        <HeroSection />
        <Categories />
        <PromotionSlider />
        <Products />
        <DealsSection />
        <PromoBanner />
        <Footer />
    </div>
  )
}

export default Home