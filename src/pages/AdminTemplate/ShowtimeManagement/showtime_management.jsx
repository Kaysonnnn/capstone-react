import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllMoviesApi,
  getShowtimesByMovieApi,
  deleteShowtimeApi,
} from "../../../services/admin.api";

export default function ShowtimeManagement() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [deletingShowtime, setDeletingShowtime] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllMoviesApi();
      setMovies(response || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Không thể tải danh sách phim");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = async (movie) => {
    setSelectedMovie(movie);
    try {
      const response = await getShowtimesByMovieApi(movie.maPhim);
      console.log("Showtimes response:", response);
      // Kiểm tra xem response có phải là array không
      if (Array.isArray(response)) {
        setShowtimes(response);
      } else if (response && Array.isArray(response.danhSachGhe)) {
        // Nếu response có cấu trúc khác, thử lấy danhSachGhe
        setShowtimes([response]);
      } else {
        setShowtimes([]);
      }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      setShowtimes([]);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleDeleteShowtime = async (showtime) => {
    if (!showtime.maLichChieu) {
      alert("Không thể xóa lịch chiếu này vì thiếu mã lịch chiếu");
      return;
    }

    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa lịch chiếu này không?\n\nRạp: ${
          showtime.tenRap || showtime.tenCumRap
        }\nThời gian: ${formatDateTime(showtime.ngayChieuGioChieu)}`
      )
    ) {
      return;
    }

    try {
      setDeletingShowtime(showtime.maLichChieu);
      await deleteShowtimeApi(showtime.maLichChieu);

      // Refresh showtimes list
      if (selectedMovie) {
        handleMovieSelect(selectedMovie);
      }

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50";
      successMessage.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Xóa lịch chiếu thành công!</span>
        </div>
      `;
      document.body.appendChild(successMessage);

      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);
    } catch (error) {
      console.error("Error deleting showtime:", error);

      let errorMessage = "Có lỗi xảy ra khi xóa lịch chiếu";
      if (error.response?.data?.content) {
        errorMessage = error.response.data.content;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setDeletingShowtime(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không thể tải dữ liệu
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchMovies}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quản lý lịch chiếu
            </h1>
            <p className="text-gray-600">
              Xem và quản lý lịch chiếu cho tất cả phim
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
              <span className="text-sm font-medium">
                Tổng số phim: {movies.length}
              </span>
            </div>
            {selectedMovie && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <span className="text-sm font-medium">
                  Lịch chiếu: {showtimes.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Movies List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Danh sách phim
            </h2>

            {filteredMovies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm
                    ? "Không tìm thấy phim phù hợp"
                    : "Chưa có phim nào"}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie.maPhim}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedMovie?.maPhim === movie.maPhim
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        className="w-12 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/48x64?text=No+Image";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {movie.tenPhim}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {formatDate(movie.ngayKhoiChieu)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Showtimes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Lịch chiếu
              </h2>
              {selectedMovie && (
                <button
                  onClick={() =>
                    navigate(`/admin/create-showtime/${selectedMovie.maPhim}`)
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tạo lịch chiếu mới
                </button>
              )}
            </div>

            {!selectedMovie ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chọn phim để xem lịch chiếu
                </h3>
                <p className="text-gray-600">
                  Vui lòng chọn một phim từ danh sách bên trái để xem lịch chiếu
                </p>
              </div>
            ) : (
              <div>
                {/* Selected Movie Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedMovie.hinhAnh}
                      alt={selectedMovie.tenPhim}
                      className="w-16 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64x80?text=No+Image";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedMovie.tenPhim}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Ngày khởi chiếu:{" "}
                        {formatDate(selectedMovie.ngayKhoiChieu)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Showtimes List */}
                {showtimes.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Chưa có lịch chiếu
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Phim này chưa có lịch chiếu nào được thiết lập
                    </p>
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/create-showtime/${selectedMovie.maPhim}`
                        )
                      }
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Tạo lịch chiếu đầu tiên
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {showtimes.map((showtime, index) => (
                      <div
                        key={index}
                        className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-50 to-indigo-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Thông tin rạp */}
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {showtime.tenRap ||
                                  showtime.tenCumRap ||
                                  "Rạp chiếu"}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {showtime.tenHeThongRap || "Hệ thống rạp"}
                              </p>
                            </div>
                          </div>

                          {/* Thông tin thời gian */}
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {formatDateTime(showtime.ngayChieuGioChieu)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {showtime.maLichChieu
                                  ? `Mã: ${showtime.maLichChieu}`
                                  : "Chưa có mã"}
                              </p>
                            </div>
                          </div>

                          {/* Thông tin giá vé */}
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-lg">
                                {formatPrice(showtime.giaVe)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {showtime.trangThai || "Đang chiếu"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Thông tin ghế nếu có */}
                        {showtime.danhSachGhe &&
                          showtime.danhSachGhe.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                  <span className="text-sm text-gray-600">
                                    Tổng số ghế: {showtime.danhSachGhe.length}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>Còn trống</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span>Đã đặt</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                        {/* Action buttons */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-end space-x-2">
                            {showtime.maLichChieu && (
                              <button
                                onClick={() => handleDeleteShowtime(showtime)}
                                disabled={
                                  deletingShowtime === showtime.maLichChieu
                                }
                                className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Xóa lịch chiếu"
                              >
                                {deletingShowtime === showtime.maLichChieu ? (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Đang xóa...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      ></path>
                                    </svg>
                                    <span>Xóa</span>
                                  </div>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
