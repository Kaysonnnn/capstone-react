import React, { useState, useEffect } from "react";
import { Play } from 'lucide-react';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://cdn.galaxycine.vn/media/2025/6/25/fundiin-4_1750864808890.jpg",
      title: "FUNDIIN",
      subtitle: "Coming Soon",
      description: "Khám phá những điều kỳ diệu của cuộc sống",
    },
    {
      id: 2,
      image: "https://cdn.galaxycine.vn/media/2025/7/21/mang-me-di-bo-2048_1753070307369.jpg",
      title: "2048",
      subtitle: "Now Showing",
      description: "Tương lai đang chờ đợi bạn",
    },
    {
      id: 3,
      image: "https://cdn.galaxycine.vn/media/2025/8/1/chot-don-2048_1754023401037.jpg",
      title: "MALTO",
      subtitle: "Coming Soon",
      description: "Cuộc phiêu lưu mới đang bắt đầu",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center max-w-4xl mx-auto px-4">
                  <div className="mb-4">
                    <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl mb-6 text-blue-200">
                    {slide.description}
                  </h2>
                  <p className="text-lg md:text-xl text-red-400 font-semibold mb-8">
                    DỰ KIẾN KHỞI CHIẾU
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                      <Play size={24} fill="white" />
                      <span>MUA VÉ NGAY</span>
                    </button>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-200">
                      XEM TRAILER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-red-600 scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-30">
          <div
            className="h-full bg-red-600 transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}