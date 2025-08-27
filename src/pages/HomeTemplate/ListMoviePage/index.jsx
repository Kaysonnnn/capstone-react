import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {
  const { data, loading, error } = useSelector((state) => state.listMovieSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListMovie());
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="relative">
          {/* Animated circles */}
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute top-4 left-4 w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin animation-delay-300"></div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đang tải phim...
          </h2>
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4 text-center border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-6">
            Không thể tải danh sách phim. Vui lòng thử lại sau.
          </p>
          <button
            onClick={() => dispatch(fetchListMovie())}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const renderMovies = () => {
    if (data) {
      return data.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Danh Sách</span> Phim
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những bộ phim hay nhất hiện đang chiếu tại rạp
            </p>
            <div className="mt-6">
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {data ? `${data.length} phim đang chiếu` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderMovies()}
        </div>

        {/* Empty state */}
        {data && data.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Không có phim nào
            </h3>
            <p className="text-gray-600">
              Hiện tại chưa có phim nào được hiển thị
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
