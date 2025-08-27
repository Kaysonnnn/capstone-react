import React from 'react';
import Carousel from './Carousel';
import FilterSection from './FilterSection';
import MovieSection from './MovieSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <Carousel />
      
      {/* Filter Section */}
      <FilterSection />
      
      {/* Movies Section */}
      <MovieSection />
    </div>
  );
}