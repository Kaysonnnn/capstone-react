import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Movie Title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {/* Tiêu đề phim sẽ được truyền vào đây */}
              MOVIE TITLE
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl mb-6 text-blue-200">
              {/* Phụ đề tiếng Việt */}
              Phụ đề tiếng Việt
            </h2>
            
            {/* Release info */}
            <p className="text-lg md:text-xl text-red-400 font-semibold mb-8">
              {/* Thông tin khởi chiếu */}
              DỰ KIẾN KHỞI CHIẾU
            </p>
            
            {/* Play button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center mx-auto space-x-2">
              <Play size={24} fill="white" />
              <span>WATCH NOW</span>
            </button>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-orange-500 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-4 justify-center items-center">
          <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none">
            <option>Select a Genre</option>
          </select>
          <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none">
            <option>Select a Movie</option>
          </select>
          <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none">
            <option>Select a Year</option>
          </select>
          <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none">
            <option>Select a Showtime</option>
          </select>
          <button className="bg-white text-orange-500 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">
            BROWSE NOW
          </button>
        </div>
      </div>

      {/* Movies Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl font-bold mb-8 text-left">
            <span className="text-orange-500">Showing</span> MOVIES
          </h2>

          {/* Movies Grid */}
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
                {/* Movie Card Template - repeat this for each movie */}
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="flex-none w-48 group cursor-pointer">
                    {/* Movie Poster */}
                    <div className="relative mb-3 overflow-hidden rounded-lg">
                      <div className="w-full h-72 bg-gray-800 flex items-center justify-center">
                        {/* Poster image sẽ được thêm vào đây */}
                        <span className="text-gray-500">Poster {index + 1}</span>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <Play 
                          size={32} 
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          fill="white"
                        />
                      </div>
                    </div>
                    
                    {/* Movie Info */}
                    <div className="text-center">
                      <h3 className="font-semibold text-white mb-1">
                        {/* Tên phim */}
                        Movie Title {index + 1}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {/* Thông tin phim */}
                        2023
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}