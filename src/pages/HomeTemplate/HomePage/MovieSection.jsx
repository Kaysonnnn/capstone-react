import React from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovieSection() {
  const movies = [
    {
      id: 1,
      title: "The Fantastic Four: First Steps",
      vietnameseTitle: "Bộ Tứ Siêu Đẳng: Bước Đi Đầu Tiên",
      rating: "9.6",
      ageRating: "T13",
      format: "2D, IMAX",
      releaseDate: "25.07.2025",
      year: "2025",
      image: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Mang Mẹ Đi Bỏ",
      vietnameseTitle: "Take Mom to Throw Away",
      rating: "8.5",
      ageRating: "K",
      format: "2D",
      releaseDate: "01.08.2025",
      year: "2025",
      image: "bg-gradient-to-br from-pink-500 to-red-500",
    },
    {
      id: 3,
      title: "Detective Conan: One-eyed Flashback",
      vietnameseTitle: "Thám Tử Lừng Danh Conan: Dư Ảnh Của Độc Nhãn",
      rating: "9.6",
      ageRating: "K",
      format: "2D",
      releaseDate: "25.07.2025",
      year: "2025",
      image: "bg-gradient-to-br from-green-500 to-blue-500",
    },
    {
      id: 4,
      title: "Toàn Trí Độc Giả",
      vietnameseTitle: "Omniscient Reader",
      rating: "7.0",
      ageRating: "T16",
      format: "2D",
      releaseDate: "31.07.2025",
      year: "2025",
      image: "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      id: 5,
      title: "Avatar 3",
      vietnameseTitle: "Thế Thần 3",
      rating: "9.8",
      ageRating: "T13",
      format: "3D, IMAX",
      releaseDate: "15.12.2025",
      year: "2025",
      image: "bg-gradient-to-br from-cyan-500 to-blue-600",
    },
    {
      id: 6,
      title: "Fast X Part 2",
      vietnameseTitle: "Quá Nhanh Quá Nguy Hiểm X: Phần 2",
      rating: "8.2",
      ageRating: "T16",
      format: "2D, 3D",
      releaseDate: "20.08.2025",
      year: "2025",
      image: "bg-gradient-to-br from-red-600 to-orange-500",
    },
    {
      id: 7,
      title: "Spider-Man 4",
      vietnameseTitle: "Người Nhện 4",
      rating: "9.3",
      ageRating: "T13",
      format: "2D, IMAX",
      releaseDate: "05.09.2025",
      year: "2025",
      image: "bg-gradient-to-br from-red-500 to-blue-600",
    },
    {
      id: 8,
      title: "John Wick 5",
      vietnameseTitle: "Sát Thủ John Wick 5",
      rating: "9.1",
      ageRating: "T18",
      format: "2D",
      releaseDate: "12.10.2025",
      year: "2025",
      image: "bg-gradient-to-br from-gray-700 to-black",
    },
  ];

  return (
    <div className="py-12 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-8 text-left">
          <span className="text-orange-500">Showing</span> MOVIES
        </h2>

        {/* Movies Grid with Carousel Style */}
        <div className="relative">
          {/* Navigation arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors">
            <ChevronRight size={24} />
          </button>
          
          <div className="overflow-hidden">
            <div className="flex space-x-4 transition-transform duration-300">
              {movies.map((movie) => (
                <div key={movie.id} className="flex-none w-48 group cursor-pointer">
                  {/* Movie Poster */}
                  <div className="relative mb-3 overflow-hidden rounded-lg">
                    <div className={`w-full h-72 ${movie.image} flex items-end relative`}>
                      {/* Movie info overlay on poster */}
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {movie.rating} ★
                        </span>
                        <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold">
                          {movie.ageRating}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium">
                          {movie.format}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover overlay with play button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-lg">
                      <Play 
                        size={32} 
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        fill="white"
                      />
                    </div>
                  </div>
                  
                  {/* Movie Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-white mb-1 text-sm line-clamp-2">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2">
                      {movie.vietnameseTitle}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">
                        {movie.releaseDate}
                      </span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200">
                        Mua vé
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}