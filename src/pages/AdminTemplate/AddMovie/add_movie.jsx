import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMovieApi } from "../../../services/admin.api";

const schema = z.object({
  tenPhim: z.string().min(1, "Vui lòng nhập tên phim"),
  trailer: z.string().min(1, "Vui lòng nhập thông tin trailer"),
  moTa: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  ngayKhoiChieu: z.string().min(1, "Vui lòng chọn ngày khởi chiếu"),
  trangThai: z.string().optional(),
  Hot: z.boolean().optional(),
  maNhom: z.string().default("GP01"),
  danhGia: z.string().regex(/^([0-9]|10)$/, "Vui lòng nhập số từ 0-10"),
  hinhAnh: z.any().optional(),
});

export default function AddMovie() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      trangThai: "false",
      Hot: true,
      danhGia: "10", // Cập nhật từ "0" thành "10" theo FormData structure
      hinhAnh: null,
    },
    resolver: zodResolver(schema),
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("hinhAnh", file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("hinhAnh", null);
    setImagePreview(null);
  };

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      console.log("Form values:", values);

      const { trangThai, Hot, ...rest } = values;

      const newValues = {
        ...rest,
        SapChieu: trangThai === "false",
        DangChieu: trangThai === "true",
        Hot: Hot === true,
      };

      // Tạo FormData cho API
      const formData = new FormData();

      // Thêm các trường dữ liệu theo đúng FormData structure
      formData.append("maPhim", "0"); // int maPhim = 0
      formData.append("tenPhim", newValues.tenPhim); // string tenPhim
      formData.append("trailer", newValues.trailer); // string trailer
      formData.append("moTa", newValues.moTa); // string moTa
      formData.append("maNhom", "GP01"); // string maNhom = "GP01"
      formData.append(
        "ngayKhoiChieu",
        format(new Date(newValues.ngayKhoiChieu), "dd/MM/yyyy")
      ); // string ngayKhoiChieu = "10/10/2020"
      formData.append("SapChieu", newValues.SapChieu); // bool? SapChieu = true
      formData.append("DangChieu", newValues.DangChieu); // bool? DangChieu = true
      formData.append("Hot", newValues.Hot); // bool? Hot = true
      formData.append("danhGia", newValues.danhGia); // int? danhGia = 10

      // Thêm hình ảnh nếu có
      if (newValues.hinhAnh) {
        formData.append("hinhAnh", newValues.hinhAnh); // IFormFile hinhAnh
      }

      // Log FormData để debug
      console.log("🔍 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Gọi API thêm phim
      const response = await addMovieApi(formData);
      console.log("✅ Add Movie API Response:", response);

      alert("Thêm phim thành công!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("❌ Error adding movie:", error);

      let errorMessage = "Có lỗi xảy ra khi thêm phim";

      if (error.response?.data?.content) {
        errorMessage += `: ${error.response.data.content}`;
      } else if (error.response?.data?.message) {
        errorMessage += `: ${error.response.data.message}`;
      } else if (error.message) {
        errorMessage += `: ${error.message}`;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm phim mới</h1>
        <p className="text-gray-600">Tạo phim mới cho hệ thống Galaxy Cinema</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thông tin cơ bản
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Movie Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên phim <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("tenPhim")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.tenPhim ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Nhập tên phim..."
              />
              {errors.tenPhim && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tenPhim.message}
                </p>
              )}
            </div>

            {/* Trailer URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trailer URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                {...register("trailer")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.trailer ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {errors.trailer && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.trailer.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="10"
                {...register("danhGia")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.danhGia ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="0-10"
              />
              {errors.danhGia && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.danhGia.message}
                </p>
              )}
            </div>

            {/* Release Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày khởi chiếu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("ngayKhoiChieu")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.ngayKhoiChieu ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.ngayKhoiChieu && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ngayKhoiChieu.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả phim <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("moTa")}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.moTa ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Nhập mô tả chi tiết về phim..."
            />
            {errors.moTa && (
              <p className="mt-1 text-sm text-red-600">{errors.moTa.message}</p>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Cài đặt phim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Trạng thái phim
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="true"
                    {...register("trangThai")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">Đang chiếu</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="false"
                    {...register("trangThai")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">Sắp chiếu</span>
                </label>
              </div>
            </div>

            {/* Hot Movie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tùy chọn
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("Hot")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Phim hot</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Hình ảnh phim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tải lên poster phim
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Chọn file
                    </span>{" "}
                    hoặc kéo thả vào đây
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, JPEG tối đa 10MB
                  </p>
                </label>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Xem trước
              </label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[200px] flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-48 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm">Chưa có hình ảnh</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              reset();
              setImagePreview(null);
            }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Làm mới
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Đang xử lý..." : "Thêm phim"}
          </button>
        </div>
      </form>
    </div>
  );
}
