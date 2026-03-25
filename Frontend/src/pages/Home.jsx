import React from 'react';
import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import TrendingSlider from '../components/home/TrendingSlider';
import PromotionalBanner from '../components/home/PromotionalBanner';
import BrandTrust from '../components/home/BrandTrust';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full overflow-hidden">
      <Hero />
      <CategoryShowcase />
      <TrendingSlider />
      <PromotionalBanner />
      <BrandTrust />
    </div>
  )
}

export default Home;