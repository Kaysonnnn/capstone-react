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
      className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
          <div className="text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Xem chi tiết
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        {movie.danhGia && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-lg font-bold text-sm shadow-lg flex items-center gap-1">
            ⭐ {movie.danhGia}
          </div>
        )}

        {/* Quality Badge */}
        <div className="absolute top-3 left-3 bg-white/90 text-gray-900 px-2 py-1 rounded-md text-xs font-medium">
          HD
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h5 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-blue-600 transition-colors duration-300">
          {movie.tenPhim}
        </h5>

        {/* Movie Info Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>120p</span>
          </div>

          <div className="flex items-center gap-1 text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="font-medium">Yêu thích</span>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
            Hành động
          </span>
          <span className="bg-gray-50 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            Phiêu lưu
          </span>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
              clipRule="evenodd"
            />
          </svg>
          Đặt vé ngay
        </button>
      </div>
    </div>
  );
}
