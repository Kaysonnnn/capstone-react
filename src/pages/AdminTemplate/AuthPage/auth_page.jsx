import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAdminApi } from "../../../services/admin.api";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError("");

    try {
      const response = await loginAdminApi(values);
      console.log(response);

      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("userInfo", JSON.stringify(response));

      // Chuyển hướng đến trang admin
      navigate("/admin");
    } catch (error) {
      console.log("Login error:", error);

      // Hiển thị thông báo lỗi chi tiết hơn
      if (error.response?.data?.content) {
        setError(error.response.data.content);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Tài khoản hoặc mật khẩu không đúng!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Đăng nhập Admin</h2>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng đăng nhập để truy cập hệ thống quản lý
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="taiKhoan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tài khoản
            </label>
            <input
              type="text"
              id="taiKhoan"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tài khoản"
              {...register("taiKhoan")}
            />
            {errors.taiKhoan && (
              <p className="text-red-500 text-sm mt-1">
                {errors.taiKhoan.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="matKhau"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mật khẩu"
              {...register("matKhau")}
            />
            {errors.matKhau && (
              <p className="text-red-500 text-sm mt-1">
                {errors.matKhau.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xử lý...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Quên mật khẩu?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Liên hệ quản trị viên
            </a>
          </p>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Tài khoản test:</strong>
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>
                Admin: <code>admin</code> / <code>123456</code>
              </div>
              <div>
                User: <code>user</code> / <code>123456</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
