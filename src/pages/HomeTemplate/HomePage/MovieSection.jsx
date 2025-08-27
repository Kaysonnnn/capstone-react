import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { fetchListMovie } from "../ListMoviePage/slice";

export default function MovieSection() {
  const { data, loading, error } = useSelector((state) => state.listMovieSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  const handleMovieClick = (movieId) => {
    if (movieId) {
      navigate(`/movie-details/${movieId}`);
    }
  };

  const handleBuyTicket = (e, movieId) => {
    e.stopPropagation();
    navigate("/order-movie");
  };

  const handleViewAll = () => {
    navigate("/list-movie");
  };

  // Hiển thị loading
  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">Phim</span> Đang Chiếu
            </h2>
            <p className="text-gray-600 text-lg">
              Khám phá những bộ phim mới nhất và hấp dẫn nhất
            </p>
          </div>

          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị error
  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">Phim</span> Đang Chiếu
            </h2>
            <p className="text-gray-600 text-lg">
              Khám phá những bộ phim mới nhất và hấp dẫn nhất
            </p>
          </div>

          <div className="flex justify-center items-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Không thể tải danh sách phim</p>
              <button
                onClick={() => dispatch(fetchListMovie())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị danh sách phim (chỉ hiển thị 8 phim đầu tiên)
  const displayMovies = data ? data.slice(0, 8) : [];

  return (
    <div className="py-16 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-blue-600">Phim</span> Đang Chiếu
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá những bộ phim mới nhất và hấp dẫn nhất
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayMovies.map((movie) => (
            <div
              key={movie.maPhim}
              className="group cursor-pointer"
              onClick={() => handleMovieClick(movie.maPhim)}
            >
              {/* Movie Poster */}
              <div className="relative mb-4 overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x600?text=No+Image";
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <Play
                      size={48}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="white"
                    />
                  </div>

                  {/* Rating and Age */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {movie.danhGia || "N/A"} ★
                    </span>
                    <span className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                      {movie.maPhim ? "T13" : "K"}
                    </span>
                  </div>

                  {/* Format */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                      2D
                    </span>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2 leading-tight">
                  {movie.tenPhim}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {movie.biDanh || movie.tenPhim}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">
                    {movie.ngayKhoiChieu
                      ? new Date(movie.ngayKhoiChieu).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Sắp ra mắt"}
                  </span>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
                    onClick={(e) => handleBuyTicket(e, movie.maPhim)}
                  >
                    Mua vé
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={handleViewAll}
          >
            Xem tất cả phim
          </button>
        </div>
      </div>
    </div>
  );
}
