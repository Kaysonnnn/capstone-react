import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { addTheaterApi } from "../../../../services/admin.api";

const schema = z.object({
  tenPhong: z.string().min(1, "Vui lòng nhập tên phòng"),
  soGhe: z
    .string()
    .min(1, "Vui lòng nhập số ghế")
    .refine(
      (val) => {
        const numVal = Number(val);
        return !isNaN(numVal) && numVal >= 20 && numVal <= 500;
      },
      {
        message: "Số ghế phải từ 20 đến 500",
      }
    ),
  loaiPhong: z.string().min(1, "Vui lòng chọn loại phòng"),
  trangThai: z.string().min(1, "Vui lòng chọn trạng thái"),
});

export default function AddTheater() {
  const { maCumRap } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tenPhong: "",
      soGhe: "",
      loaiPhong: "",
      trangThai: "Hoạt động",
    },
  });

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      console.log("Form values:", values);

      const theaterData = {
        tenPhong: values.tenPhong,
        soGhe: parseInt(values.soGhe),
        loaiPhong: values.loaiPhong,
        trangThai: values.trangThai,
        maCumRap: maCumRap,
      };

      console.log("Theater data:", theaterData);
      const response = await addTheaterApi(theaterData);
      console.log("API Response:", response);

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50";
      successMessage.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Thêm phòng chiếu thành công!</span>
        </div>
      `;
      document.body.appendChild(successMessage);

      setTimeout(() => {
        document.body.removeChild(successMessage);
        navigate(`/admin/theater-management`);
      }, 2000);
    } catch (error) {
      console.error("Error adding theater:", error);

      let errorMessage = "Có lỗi xảy ra khi thêm phòng chiếu";

      if (error.response?.data?.content) {
        const errorContent = error.response.data.content;
        if (typeof errorContent === "string") {
          errorMessage = errorContent;
        } else if (errorContent.message) {
          errorMessage = errorContent.message;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error message
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thêm phòng chiếu mới
        </h1>
        <p className="text-gray-600">
          Thêm phòng chiếu mới vào cụm rạp
        </p>
      </div>

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
                Quản lý rạp chiếu
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
                Thêm phòng chiếu
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thông tin phòng chiếu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên phòng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("tenPhong")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.tenPhong ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Nhập tên phòng"
              />
              {errors.tenPhong && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tenPhong.message}
                </p>
              )}
            </div>

            {/* Number of Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số ghế <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="20"
                max="500"
                {...register("soGhe")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.soGhe ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Nhập số ghế"
              />
              {errors.soGhe && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.soGhe.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Số ghế từ 20 đến 500
              </p>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại phòng <span className="text-red-500">*</span>
              </label>
              <select
                {...register("loaiPhong")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.loaiPhong ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Chọn loại phòng</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="IMAX">IMAX</option>
                <option value="4DX">4DX</option>
                <option value="Dolby">Dolby</option>
              </select>
              {errors.loaiPhong && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.loaiPhong.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái <span className="text-red-500">*</span>
              </label>
              <select
                {...register("trangThai")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.trangThai ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="Hoạt động">Hoạt động</option>
                <option value="Bảo trì">Bảo trì</option>
                <option value="Tạm ngưng">Tạm ngưng</option>
              </select>
              {errors.trangThai && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.trangThai.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/theater-management")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Đang xử lý..." : "Thêm phòng chiếu"}
          </button>
        </div>
      </form>
    </div>
  );
}
