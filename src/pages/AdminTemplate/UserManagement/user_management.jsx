import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsersApi,
  deleteUserApi,
  getUserTypesApi,
} from "../../../services/admin.api";

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    fetchUsers();
    fetchUserTypes();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsersApi("GP01", currentPage, 10);
      setUsers(response.items || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 10));
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTypes = async () => {
    try {
      const response = await getUserTypesApi();
      setUserTypes(response.content || []);
    } catch (error) {
      console.error("Error fetching user types:", error);
    }
  };

  const handleDeleteUser = async (taiKhoan, hoTen) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${hoTen}"?`)) {
      return;
    }

    try {
      console.log("🗑️ Deleting user:", taiKhoan, hoTen);
      await deleteUserApi(taiKhoan);
      alert("Xóa người dùng thành công!");
      fetchUsers();
    } catch (error) {
      console.error("❌ Error deleting user:", error);

      // Enhanced error handling
      let errorMessage = "Có lỗi xảy ra khi xóa người dùng";

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

      alert(errorMessage);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      alert("Vui lòng chọn ít nhất một người dùng để xóa!");
      return;
    }

    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedUsers.length} người dùng đã chọn?`
      )
    ) {
      return;
    }

    try {
      console.log("🗑️ Bulk deleting users:", selectedUsers);
      for (const taiKhoan of selectedUsers) {
        await deleteUserApi(taiKhoan);
      }
      alert("Xóa người dùng thành công!");
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      console.error("❌ Error bulk deleting users:", error);

      // Enhanced error handling
      let errorMessage = "Có lỗi xảy ra khi xóa người dùng";

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

      alert(errorMessage);
    }
  };

  const handleSelectUser = (taiKhoan, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, taiKhoan]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== taiKhoan));
    }
  };

  const getUserTypeName = (maLoaiNguoiDung) => {
    const type = userTypes.find((t) => t.maLoaiNguoiDung === maLoaiNguoiDung);
    return type ? type.tenLoai : "N/A";
  };

  const getRoleBadge = (maLoaiNguoiDung) => {
    const roleName = getUserTypeName(maLoaiNguoiDung);

    if (maLoaiNguoiDung === "QuanTri") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {roleName}
        </span>
      );
    } else if (maLoaiNguoiDung === "KhachHang") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {roleName}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {roleName}
        </span>
      );
    }
  };

  const getStatusBadge = (status) => {
    if (status === "active" || status === true) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Hoạt động
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Không hoạt động
        </span>
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.taiKhoan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterRole === "all") return matchesSearch;
    if (filterRole === "admin")
      return matchesSearch && user.maLoaiNguoiDung === "QuanTri";
    if (filterRole === "customer")
      return matchesSearch && user.maLoaiNguoiDung === "KhachHang";

    return matchesSearch;
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quản lý người dùng
        </h1>
        <p className="text-gray-600">
          Quản lý tất cả người dùng trong hệ thống ({users.length} người dùng)
        </p>
      </div>
      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/admin/add-user")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thêm người dùng
        </button>
        {selectedUsers.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Xóa ({selectedUsers.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm người dùng
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập tên, tài khoản hoặc email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vai trò
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="admin">Quản trị viên</option>
              <option value="customer">Khách hàng</option>
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
              <option value="role">Theo vai trò</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
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
            onClick={fetchUsers}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không có người dùng nào
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Không tìm thấy người dùng phù hợp với từ khóa tìm kiếm."
              : "Chưa có người dùng nào trong hệ thống."}
          </p>
          <button
            onClick={() => navigate("/admin/add-user")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thêm người dùng đầu tiên
          </button>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">
                  Đã chọn {selectedUsers.length} người dùng
                </span>
                <button
                  onClick={() => setSelectedUsers([])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Bỏ chọn tất cả
                </button>
              </div>
            </div>
          )}

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.taiKhoan}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.taiKhoan)}
                    onChange={(e) =>
                      handleSelectUser(user.taiKhoan, e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />

                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {getInitials(user.hoTen)}
                      </span>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {user.hoTen || "Không có tên"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          @{user.taiKhoan}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>📧 {user.email || "Không có email"}</span>
                          <span>
                            📞 {user.soDT || "Không có số điện thoại"}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getRoleBadge(user.maLoaiNguoiDung)}
                          {getStatusBadge(user.trangThai)}
                        </div>

                        {user.ngaySinh && (
                          <div className="mt-2 text-sm text-gray-500">
                            Ngày sinh:{" "}
                            {new Date(user.ngaySinh).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-user/${user.taiKhoan}`)
                          }
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          Sửa
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                          Xem
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteUser(user.taiKhoan, user.hoTen)
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
                  {Math.min(currentPage * 10, filteredUsers.length)}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-medium">{filteredUsers.length}</span> kết
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
