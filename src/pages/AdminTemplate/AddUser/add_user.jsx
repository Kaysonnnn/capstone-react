import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addUserApi,
  getUserTypesApi,
  checkUserAccountExistsApi,
} from "../../../services/admin.api";

const schema = z.object({
  taiKhoan: z.string().min(3, "Tài khoản phải có ít nhất 3 ký tự"),
  matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  soDT: z.string().min(10, "Số điện thoại không hợp lệ"),
  hoTen: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  maLoaiNguoiDung: z.string().min(1, "Vui lòng chọn loại người dùng"),
  ngaySinh: z.string().optional(),
});

export default function AddUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      hoTen: "",
      maLoaiNguoiDung: "",
      ngaySinh: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchUserTypes();
  }, []);

  const fetchUserTypes = async () => {
    try {
      const response = await getUserTypesApi();
      setUserTypes(response || []);
    } catch (error) {
      console.error("Error fetching user types:", error);
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      console.log("Form values:", values);

      // Check if account already exists
      const accountExists = await checkUserAccountExistsApi(values.taiKhoan);
      if (accountExists) {
        alert(
          "Tài khoản đã tồn tại trong hệ thống. Vui lòng chọn tên đăng nhập khác."
        );
        setIsSubmitting(false);
        return;
      }

      // Format data for API
      const userData = {
        ...values,
        maNhom: "GP01", // Default group
        soDt: values.soDT, // Fix field name
      };

      console.log("Sending user data:", userData);
      const response = await addUserApi(userData);
      console.log("API Response:", response);

      alert("Thêm người dùng thành công!");
      reset();
    } catch (error) {
      console.error("Error adding user:", error);

      // Enhanced error handling
      let errorMessage = "Có lỗi xảy ra khi thêm người dùng";

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

      // Check for specific errors
      if (
        errorMessage.toLowerCase().includes("tồn tại") ||
        errorMessage.toLowerCase().includes("exist") ||
        errorMessage.toLowerCase().includes("duplicate")
      ) {
        errorMessage =
          "Tài khoản đã tồn tại trong hệ thống. Vui lòng chọn tên đăng nhập khác.";
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thêm người dùng mới
        </h1>
        <p className="text-gray-600">
          Tạo tài khoản người dùng mới cho hệ thống Galaxy Cinema
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thông tin tài khoản
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("taiKhoan")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.taiKhoan ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Nhập tên đăng nhập..."
              />
              {errors.taiKhoan && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.taiKhoan.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("matKhau")}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.matKhau ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {errors.matKhau && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.matKhau.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("soDT")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.soDT ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="0123456789"
              />
              {errors.soDT && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.soDT.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thông tin cá nhân
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("hoTen")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.hoTen ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Nhập họ và tên..."
              />
              {errors.hoTen && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.hoTen.message}
                </p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày sinh
              </label>
              <input
                type="date"
                {...register("ngaySinh")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* User Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Loại người dùng <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <label
                    key={type.maLoaiNguoiDung}
                    className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                  >
                    <input
                      type="radio"
                      value={type.maLoaiNguoiDung}
                      {...register("maLoaiNguoiDung")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        {type.tenLoai}
                      </div>
                      <div className="text-sm text-gray-500">
                        {type.maLoaiNguoiDung}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.maLoaiNguoiDung && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.maLoaiNguoiDung.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Làm mới
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Đang xử lý..." : "Thêm người dùng"}
          </button>
        </div>
      </form>
    </div>
  );
}
