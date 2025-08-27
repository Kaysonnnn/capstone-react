import React from 'react';
import Carousel from './Carousel';
import FilterSection from './FilterSection';
import MovieSection from './MovieSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <section className="relative">
        <Carousel />
      </section>
      
      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterSection />
        </div>
      </section>
      
      {/* Movies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovieSection />
        </div>
      </section>
    </div>
  );
}