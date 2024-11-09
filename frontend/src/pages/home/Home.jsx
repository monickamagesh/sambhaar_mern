import React, { useEffect } from 'react'
import HeroSection from '../../components/home/HeroSection'
import Categories from '../../components/home/categories'
import HomeCards from '../../components/home/HomeCards'
import Trending from '../../components/shop/Trending'
import DealsSection from '../../components/home/DealsSection'
import PromoBanner from '../../components/home/PromoBanner'
import Blogs from '../../components/blogs/blogs'

const Home = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div>
        <HeroSection />
        <Categories />
        <HomeCards />
        <Trending />
        <DealsSection />
        <PromoBanner />
        <Blogs />
    </div>
  )
}

export default Home