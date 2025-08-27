import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesApi, deleteMovieApi } from "../../../services/admin.api";

export default function MovieManagement() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMoviesApi("GP01", currentPage, 10);
      setMovies(response.items || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 10));
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Không thể tải danh sách phim");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (maPhim, tenPhim) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa phim "${tenPhim}"?`)) {
      return;
    }

    try {
      await deleteMovieApi(maPhim);
      alert("Xóa phim thành công!");
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Có lỗi xảy ra khi xóa phim!");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMovies.length === 0) {
      alert("Vui lòng chọn ít nhất một phim để xóa!");
      return;
    }

    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedMovies.length} phim đã chọn?`
      )
    ) {
      return;
    }

    try {
      for (const maPhim of selectedMovies) {
        await deleteMovieApi(maPhim);
      }
      alert("Xóa phim thành công!");
      setSelectedMovies([]);
      fetchMovies();
    } catch (error) {
      console.error("Error bulk deleting movies:", error);
      alert("Có lỗi xảy ra khi xóa phim!");
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMovies(movies.map((movie) => movie.maPhim));
    } else {
      setSelectedMovies([]);
    }
  };

  const handleSelectMovie = (maPhim, checked) => {
    if (checked) {
      setSelectedMovies([...selectedMovies, maPhim]);
    } else {
      setSelectedMovies(selectedMovies.filter((id) => id !== maPhim));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (sapChieu, dangChieu) => {
    if (dangChieu) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Đang chiếu
        </span>
      );
    } else if (sapChieu) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Sắp chiếu
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Không xác định
        </span>
      );
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.tenPhim?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.moTa?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "showing") return matchesSearch && movie.dangChieu;
    if (filterStatus === "coming") return matchesSearch && movie.sapChieu;
    if (filterStatus === "hot") return matchesSearch && movie.hot;

    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý phim</h1>
        <p className="text-gray-600">
          Quản lý tất cả phim trong hệ thống ({movies.length} phim)
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/admin/add-movie")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thêm phim mới
        </button>
        {selectedMovies.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Xóa ({selectedMovies.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm phim
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập tên phim hoặc mô tả..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="showing">Đang chiếu</option>
              <option value="coming">Sắp chiếu</option>
              <option value="hot">Phim hot</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sắp xếp
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="name">Tên A-Z</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movies List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
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
      ) : filteredMovies.length === 0 ? (
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
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không có phim nào
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Không tìm thấy phim phù hợp với từ khóa tìm kiếm."
              : "Chưa có phim nào trong hệ thống."}
          </p>
          <button
            onClick={() => navigate("/admin/add-movie")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thêm phim đầu tiên
          </button>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          {selectedMovies.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">
                  Đã chọn {selectedMovies.length} phim
                </span>
                <button
                  onClick={() => setSelectedMovies([])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Bỏ chọn tất cả
                </button>
              </div>
            </div>
          )}

          {/* Movies List */}
          <div className="space-y-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.maPhim}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie.maPhim)}
                    onChange={(e) =>
                      handleSelectMovie(movie.maPhim, e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />

                  {/* Movie Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={movie.hinhAnh}
                      alt={movie.tenPhim}
                      className="w-20 h-28 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x112?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {movie.tenPhim}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {movie.moTa || "Không có mô tả"}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>Đánh giá: {movie.danhGia}/10</span>
                          <span>
                            Ngày chiếu: {formatDate(movie.ngayKhoiChieu)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusBadge(movie.sapChieu, movie.dangChieu)}
                          {movie.hot && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              HOT
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-movie/${movie.maPhim}`)
                          }
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/create-showtime/${movie.maPhim}`)
                          }
                          className="px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
                          title="Tạo lịch chiếu"
                        >
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/movie-details/${movie.maPhim}`)
                          }
                          className="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteMovie(movie.maPhim, movie.tenPhim)
                          }
                          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Hiển thị{" "}
                <span className="font-medium">
                  {(currentPage - 1) * 10 + 1}
                </span>{" "}
                đến{" "}
                <span className="font-medium">
                  {Math.min(currentPage * 10, filteredMovies.length)}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-medium">{filteredMovies.length}</span> kết
                quả
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
