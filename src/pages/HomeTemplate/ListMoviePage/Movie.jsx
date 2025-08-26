import { useNavigate } from "react-router-dom";

export default function Movie({ movie }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (movie?.maPhim) {
      navigate(`/movie-details/${movie.maPhim}`);
    }
  };

  if (!movie) return null;

  return (
    <div
      className="group relative max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-3 hover:scale-105 border border-gray-100 dark:border-gray-700"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" 
          src={movie.hinhAnh} 
          alt={movie.tenPhim}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-2xl flex items-center gap-2 backdrop-blur-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Xem chi tiết
            </div>
          </div>
        </div>
        
        {/* Rating Badge */}
        {movie.danhGia && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-lg font-bold text-sm shadow-lg flex items-center gap-1">
            ⭐ {movie.danhGia}
          </div>
        )}
        
        {/* Quality Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
          HD
        </div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 leading-tight min-h-[3.5rem]">
          {movie.tenPhim}
        </h5>
        
        {/* Movie Info Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>120p</span>
          </div>
          
          <div className="flex items-center gap-1 text-red-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="font-medium">Yêu thích</span>
          </div>
        </div>
        
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded-full">
            Hành động
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">
            Phiêu lưu
          </span>
        </div>
        
        {/* Action Button - Hidden by default, shown on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
            </svg>
            Đặt vé ngay
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
}