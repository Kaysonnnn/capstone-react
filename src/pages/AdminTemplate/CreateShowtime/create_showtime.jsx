import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieByIdApi,
  getMovieByIdAlternativeApi,
  getCinemaSystemsApi,
  getCinemaClustersApi,
  createShowtimeApi,
} from "../../../services/admin.api";

const schema = z.object({
  maHeThongRap: z.string().min(1, "Vui lòng chọn hệ thống rạp"),
  maCumRap: z.string().min(1, "Vui lòng chọn cụm rạp"),
  ngayChieuGioChieu: z
    .string()
    .min(1, "Vui lòng chọn ngày và giờ chiếu")
    .refine(
      (val) => {
        if (!val) return false;
        const selectedDate = new Date(val);
        const now = new Date();
        return selectedDate > now;
      },
      {
        message: "Ngày và giờ chiếu phải trong tương lai",
      }
    ),
  giaVe: z
    .string()
    .min(1, "Vui lòng nhập giá vé")
    .refine(
      (val) => {
        const numVal = Number(val);
        return !isNaN(numVal) && numVal >= 50000;
      },
      {
        message: "Giá vé phải từ 50,000 VNĐ trở lên",
      }
    ),
});

export default function CreateShowtime() {
  const { maPhim } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [movie, setMovie] = useState(null);
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [cinemaClusters, setCinemaClusters] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      maHeThongRap: "",
      maCumRap: "",
      ngayChieuGioChieu: "",
      giaVe: "",
    },
  });

  const watchedSystem = watch("maHeThongRap");

  // Helper function to format datetime to dd/MM/yyyy hh:mm:ss
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching data for showtime creation...");

        // Fetch movie data
        let movieData;
        try {
          movieData = await getMovieByIdApi(maPhim);
        } catch (error) {
          console.log("⚠️ Primary API failed, trying alternative...");
          movieData = await getMovieByIdAlternativeApi(maPhim);
        }
        setMovie(movieData);

        // Fetch cinema systems
        const systemsData = await getCinemaSystemsApi();
        console.log("🎬 Cinema systems data:", systemsData);
        setCinemaSystems(Array.isArray(systemsData) ? systemsData : []);

        console.log("✅ Data loaded successfully");
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        alert(`Không thể tải dữ liệu: ${error.message}`);
        navigate("/admin/movie-management");
      } finally {
        setLoading(false);
      }
    };

    if (maPhim) {
      fetchData();
    }
  }, [maPhim, navigate]);

  // Load cinema clusters when system changes
  useEffect(() => {
    const loadClusters = async () => {
      console.log("🔄 Loading clusters for system:", watchedSystem);

      if (watchedSystem) {
        try {
          setSelectedSystem(watchedSystem);
          console.log("🎬 Calling getCinemaClustersApi with:", watchedSystem);

          const clustersData = await getCinemaClustersApi(watchedSystem);
          console.log("📊 Raw clusters data:", clustersData);
          console.log("📊 Is array:", Array.isArray(clustersData));
          console.log("📊 Length:", clustersData?.length);

          const processedClusters = Array.isArray(clustersData)
            ? clustersData
            : [];
          console.log("✅ Processed clusters:", processedClusters);

          setCinemaClusters(processedClusters);
          // Reset cluster selection
          setValue("maCumRap", "");
        } catch (error) {
          console.error("❌ Error loading clusters:", error);
          console.error("❌ Error details:", error.response?.data);
          console.error("❌ Error status:", error.response?.status);
          setCinemaClusters([]);
        }
      } else {
        console.log("🔄 No system selected, clearing clusters");
        setCinemaClusters([]);
        setSelectedSystem("");
      }
    };

    loadClusters();
  }, [watchedSystem, setValue]);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      console.log("Form values:", values);

      // Check authentication
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        alert("Vui lòng đăng nhập để tạo lịch chiếu!");
        return;
      }

      // Validate datetime is in the future
      const selectedDateTime = new Date(values.ngayChieuGioChieu);
      const now = new Date();
      if (selectedDateTime <= now) {
        alert("Ngày và giờ chiếu phải trong tương lai!");
        return;
      }

      // Format data for API
      // API Specification: https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu
      // Model: { maPhim: number, ngayChieuGioChieu: string, maRap: string, giaVe: number }

      // Format datetime to dd/MM/yyyy hh:mm:ss format
      const formattedDateTime = formatDateTime(values.ngayChieuGioChieu);

      const showtimeData = {
        maPhim: parseInt(maPhim),
        ngayChieuGioChieu: formattedDateTime, // Format: dd/MM/yyyy hh:mm:ss
        maRap: values.maCumRap, // Keep as string as per API specification
        giaVe: parseInt(values.giaVe),
      };

      console.log("Original datetime input:", values.ngayChieuGioChieu);
      console.log("Formatted datetime:", formattedDateTime);
      console.log("Formatted showtime data:", showtimeData);
      console.log("Data types:", {
        maPhim: typeof showtimeData.maPhim,
        ngayChieuGioChieu: typeof showtimeData.ngayChieuGioChieu,
        maRap: typeof showtimeData.maRap,
        giaVe: typeof showtimeData.giaVe,
      });

      console.log("Sending showtime data:", showtimeData);
      const response = await createShowtimeApi(showtimeData);
      console.log("API Response:", response);

      // Show success message with better UI
      const successMessage = document.createElement("div");
      successMessage.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50";
      successMessage.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Tạo lịch chiếu thành công!</span>
        </div>
      `;
      document.body.appendChild(successMessage);

      setTimeout(() => {
        document.body.removeChild(successMessage);
        navigate("/admin/showtime-management");
      }, 2000);
    } catch (error) {
      console.error("Error creating showtime:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      let errorMessage = "Có lỗi xảy ra khi tạo lịch chiếu";

      if (error.response?.data?.content) {
        const errorContent = error.response.data.content;
        if (typeof errorContent === "string") {
          errorMessage = errorContent;
        } else if (errorContent.message) {
          errorMessage = errorContent.message;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.";
      } else if (error.response?.status === 401) {
        errorMessage = "Không có quyền truy cập. Vui lòng đăng nhập lại.";
      } else if (error.response?.status === 403) {
        errorMessage = "Không có quyền tạo lịch chiếu.";
      } else if (error.response?.status === 404) {
        errorMessage = "Không tìm thấy phim hoặc rạp chiếu.";
      } else if (error.response?.status === 500) {
        errorMessage = "Lỗi server. Vui lòng thử lại sau.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error message with better UI
      const errorElement = document.createElement("div");
      errorElement.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50";
      errorElement.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>${errorMessage}</span>
        </div>
      `;
      document.body.appendChild(errorElement);

      setTimeout(() => {
        if (document.body.contains(errorElement)) {
          document.body.removeChild(errorElement);
        }
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!movie) {
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
          Không tìm thấy phim
        </h3>
        <p className="text-gray-600 mb-4">
          Phim bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <button
          onClick={() => navigate("/admin/movie-management")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Quay lại danh sách phim
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Admin
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
              >
                Movie Management
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-700">
                Create Showtime
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tạo lịch chiếu - {movie.tenPhim}
        </h1>
        <p className="text-gray-600">
          Thiết lập lịch chiếu cho phim: {movie.tenPhim}
        </p>
      </div>

      {/* Movie Info */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-20 h-28 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {movie.tenPhim}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Mã phim: {movie.maPhim}
            </p>
            <p className="text-sm text-gray-600">
              Ngày khởi chiếu: {movie.ngayKhoiChieu}
            </p>
          </div>
        </div>
      </div>

      {/* Showtime Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thông tin lịch chiếu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cinema System */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hệ thống rạp <span className="text-red-500">*</span>
              </label>
              <select
                {...register("maHeThongRap")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.maHeThongRap ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Chọn hệ thống rạp</option>
                {Array.isArray(cinemaSystems) && cinemaSystems.length > 0 ? (
                  cinemaSystems.map((system) => (
                    <option
                      key={system.maHeThongRap}
                      value={system.maHeThongRap}
                    >
                      {system.tenHeThongRap}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Đang tải hệ thống rạp...
                  </option>
                )}
              </select>
              {errors.maHeThongRap && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.maHeThongRap.message}
                </p>
              )}
            </div>

            {/* Cinema Cluster */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cụm rạp <span className="text-red-500">*</span>
                {selectedSystem && (
                  <span className="ml-2 text-xs text-gray-500">
                    (Đã chọn: {selectedSystem})
                  </span>
                )}
              </label>
              <select
                {...register("maCumRap")}
                disabled={!selectedSystem}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.maCumRap ? "border-red-300" : "border-gray-300"
                } ${!selectedSystem ? "bg-gray-100 cursor-not-allowed" : ""}`}
              >
                <option value="">
                  {selectedSystem
                    ? `Chọn cụm rạp (${cinemaClusters.length} cụm rạp)`
                    : "Vui lòng chọn hệ thống rạp trước"}
                </option>
                {Array.isArray(cinemaClusters) && cinemaClusters.length > 0 ? (
                  cinemaClusters.map((cluster) => (
                    <option key={cluster.maCumRap} value={cluster.maCumRap}>
                      {cluster.tenCumRap} ({cluster.maCumRap})
                    </option>
                  ))
                ) : selectedSystem ? (
                  <option value="" disabled>
                    Không có cụm rạp nào cho hệ thống này
                  </option>
                ) : null}
              </select>
              {errors.maCumRap && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.maCumRap.message}
                </p>
              )}
              {selectedSystem && cinemaClusters.length === 0 && (
                <p className="mt-1 text-xs text-orange-600">
                  ⚠️ Không tìm thấy cụm rạp cho hệ thống {selectedSystem}
                </p>
              )}
            </div>

            {/* Showtime Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>
                    Ngày và giờ chiếu <span className="text-red-500">*</span>
                  </span>
                </div>
              </label>
              <input
                type="datetime-local"
                {...register("ngayChieuGioChieu")}
                min={new Date().toISOString().slice(0, 16)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.ngayChieuGioChieu
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.ngayChieuGioChieu && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ngayChieuGioChieu.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Chọn ngày và giờ chiếu trong tương lai
              </p>
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    ></path>
                  </svg>
                  <span>
                    Giá vé <span className="text-red-500">*</span>
                  </span>
                </div>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  {...register("giaVe")}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.giaVe ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Nhập giá vé"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 text-sm">VNĐ</span>
                </div>
              </div>
              {errors.giaVe && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.giaVe.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Giá vé tối thiểu: 50,000 VNĐ
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/movie-management")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Đang xử lý..." : "Tạo lịch chiếu"}
          </button>
        </div>
      </form>
    </div>
  );
}
