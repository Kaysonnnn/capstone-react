import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllUsersApi,
  getUserInfoAlternativeApi,
  updateUserApi,
  getUserTypesApi,
} from "../../../services/admin.api";

const schema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: z.string().email("Vui lòng nhập đúng định dạng email"),
  soDt: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  maNhom: z.string().default("GP01"),
  hoTen: z.string().min(1, "Vui lòng nhập họ tên"),
  maLoaiNguoiDung: z.string().min(1, "Vui lòng chọn loại người dùng"),
});

export default function EditUser() {
  const { taiKhoan } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userTypes, setUserTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching user with taiKhoan:", taiKhoan);

        // Fetch user types
        const typesResponse = await getUserTypesApi();
        setUserTypes(typesResponse || []);

        // Fetch user data using alternative API
        const userResponse = await getUserInfoAlternativeApi(taiKhoan);
        console.log("✅ User data found:", userResponse);
        setUser(userResponse);

        // Set form values
        setValue("taiKhoan", userResponse.taiKhoan);
        setValue("email", userResponse.email);
        setValue("soDt", userResponse.soDt || userResponse.soDT);
        setValue("maNhom", userResponse.maNhom);
        setValue("hoTen", userResponse.hoTen);
        setValue("maLoaiNguoiDung", userResponse.maLoaiNguoiDung);
        setValue("matKhau", ""); // Password field is empty for edit
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        alert(`Không thể tải thông tin người dùng: ${error.message}`);
        navigate("/admin/user-management");
      } finally {
        setLoading(false);
      }
    };

    if (taiKhoan) {
      fetchData();
    }
  }, [taiKhoan, setValue, navigate]);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      console.log("Form values:", values);

      // Kiểm tra quyền truy cập đơn giản
      const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
      console.log("Current user:", currentUser);
      console.log("Target user:", values.taiKhoan);

      // Kiểm tra quyền truy cập - Admin có thể sửa tất cả, user chỉ sửa được chính mình
      const isAdmin = currentUser.maLoaiNguoiDung === "QuanTri";
      const isSameUser = currentUser.taiKhoan === values.taiKhoan;

      console.log("🔐 Permission check:", {
        isAdmin,
        isSameUser,
        currentUserType: currentUser.maLoaiNguoiDung,
        currentUser: currentUser.taiKhoan,
        targetUser: values.taiKhoan,
      });

      if (!isAdmin && !isSameUser) {
        alert("Bạn không có quyền cập nhật thông tin người dùng khác!");
        setSubmitting(false);
        return;
      }

      // Format data for API
      const updateData = { ...values };

      // Remove password if empty (don't update password)
      if (!updateData.matKhau) {
        delete updateData.matKhau;
      }

      // Fix field name
      if (updateData.soDt) {
        updateData.soDT = updateData.soDt;
        delete updateData.soDt;
      }

      // Đảm bảo maNhom không rỗng
      if (!updateData.maNhom) {
        updateData.maNhom = "GP01";
      }

      console.log("Sending update data:", updateData);
      const response = await updateUserApi(updateData);
      console.log("API Response:", response);

      alert("Cập nhật người dùng thành công!");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error updating user:", error);

      // Enhanced error handling
      let errorMessage = "Có lỗi xảy ra khi cập nhật người dùng";

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

      // Xử lý lỗi quyền truy cập cụ thể
      if (errorMessage.includes("quyền thay đổi tài khoản người khác")) {
        errorMessage =
          "Bạn không có quyền cập nhật thông tin người dùng khác. Chỉ admin mới có thể thực hiện thao tác này.";
      }

      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không tìm thấy người dùng</p>
      </div>
    );
  }

  return (
    <div className="p-6">
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
                User Management
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
                Edit User
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Chỉnh sửa người dùng: {user.hoTen}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Username */}
          <div>
            <label
              htmlFor="taiKhoan"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tài khoản
            </label>
            <input
              type="text"
              id="taiKhoan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nhập tài khoản"
              {...register("taiKhoan")}
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">
              Tài khoản không thể thay đổi
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="matKhau"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="matKhau"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Để trống nếu không thay đổi"
              {...register("matKhau")}
            />
            {errors?.matKhau?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.matKhau.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="hoTen"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Họ tên
            </label>
            <input
              type="text"
              id="hoTen"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nhập họ tên"
              {...register("hoTen")}
            />
            {errors?.hoTen?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hoTen.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example@email.com"
              {...register("email")}
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="soDt"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="soDt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0123456789"
              {...register("soDt")}
            />
            {errors?.soDt?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.soDt.message}</p>
            )}
          </div>

          {/* User Type */}
          <div>
            <label
              htmlFor="maLoaiNguoiDung"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Loại người dùng
            </label>
            <select
              id="maLoaiNguoiDung"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("maLoaiNguoiDung")}
            >
              <option value="">Chọn loại người dùng</option>
              {userTypes.map((type) => (
                <option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>
                  {type.tenLoai}
                </option>
              ))}
            </select>
            {errors?.maLoaiNguoiDung?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maLoaiNguoiDung.message}
              </p>
            )}
          </div>

          {/* Group */}
          <div>
            <label
              htmlFor="maNhom"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nhóm
            </label>
            <input
              type="text"
              id="maNhom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="GP01"
              {...register("maNhom")}
            />
            {errors?.maNhom?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maNhom.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
          >
            {submitting ? "Đang xử lý..." : "Cập nhật người dùng"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/user-management")}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
