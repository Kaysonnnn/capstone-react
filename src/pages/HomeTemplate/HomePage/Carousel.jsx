import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://cdn.galaxycine.vn/media/2025/6/25/fundiin-4_1750864808890.jpg",
      title: "FUNDIIN",
      subtitle: "Coming Soon",
      description: "Khám phá những điều kỳ diệu của cuộc sống",
    },
    {
      id: 2,
      image:
        "https://cdn.galaxycine.vn/media/2025/7/21/mang-me-di-bo-2048_1753070307369.jpg",
      title: "2048",
      subtitle: "Now Showing",
      description: "Tương lai đang chờ đợi bạn",
    },
    {
      id: 3,
      image:
        "https://cdn.galaxycine.vn/media/2025/8/1/chot-don-2048_1754023401037.jpg",
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
    <div className="relative h-[60vh] overflow-hidden bg-white">
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-lg">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base mb-4 text-gray-200">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group">
                      <Play
                        size={16}
                        className="group-hover:scale-110 transition-transform duration-200"
                      />
                      <span>MUA VÉ</span>
                    </button>
                    <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                      TRAILER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 group backdrop-blur-sm"
      >
        <svg
          className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 group backdrop-blur-sm"
      >
        <svg
          className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-blue-600 scale-110"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
