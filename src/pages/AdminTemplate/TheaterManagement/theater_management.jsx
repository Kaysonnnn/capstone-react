import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCinemaSystemsApi,
  getCinemaClustersApi,
  getTheaterDetailsApi,
} from "../../../services/admin.api";

export default function TheaterManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [cinemaClusters, setCinemaClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [activeTab, setActiveTab] = useState("systems"); // systems, clusters, theaters

  useEffect(() => {
    fetchCinemaSystems();
  }, []);

  const fetchCinemaSystems = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🎬 Fetching cinema systems...");
      const response = await getCinemaSystemsApi();
      console.log("✅ Cinema systems:", response);
      setCinemaSystems(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("❌ Error fetching cinema systems:", error);
      setError("Không thể tải danh sách hệ thống rạp");
    } finally {
      setLoading(false);
    }
  };

  const fetchCinemaClusters = async (maHeThongRap) => {
    try {
      setLoading(true);
      setError(null);
      console.log("🎬 Fetching cinema clusters for system:", maHeThongRap);
      const response = await getCinemaClustersApi(maHeThongRap);
      console.log("✅ Cinema clusters:", response);
      setCinemaClusters(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("❌ Error fetching cinema clusters:", error);
      setError("Không thể tải danh sách cụm rạp");
      setCinemaClusters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
    setSelectedCluster(null);
    setTheaters([]);
    fetchCinemaClusters(system.maHeThongRap);
    setActiveTab("clusters");
  };

  const handleClusterSelect = async (cluster) => {
    setSelectedCluster(cluster);
    try {
      setLoading(true);
      const theatersData = await getTheaterDetailsApi(cluster.maCumRap);
      setTheaters(Array.isArray(theatersData) ? theatersData : []);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      setTheaters([]);
    } finally {
      setLoading(false);
    }
    setActiveTab("theaters");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoạt động":
        return "bg-green-100 text-green-800";
      case "Bảo trì":
        return "bg-yellow-100 text-yellow-800";
      case "Tạm ngưng":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomTypeColor = (type) => {
    switch (type) {
      case "2D":
        return "bg-blue-100 text-blue-800";
      case "3D":
        return "bg-purple-100 text-purple-800";
      case "IMAX":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && cinemaSystems.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý rạp chiếu
          </h1>
          <p className="text-gray-600">
            Quản lý hệ thống rạp chiếu, cụm rạp và phòng chiếu
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
                <span className="ms-1 text-sm font-medium text-gray-700">
                  Quản lý rạp chiếu
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border">
          <nav className="flex flex-wrap px-6 py-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("systems")}
              className={`py-2 px-4 mr-4 mb-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === "systems"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="hidden sm:inline">Hệ thống rạp</span>
              <span className="sm:hidden">Hệ thống</span>
              <span className="ml-2 bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                {cinemaSystems.length}
              </span>
            </button>
            {selectedSystem && (
              <button
                onClick={() => setActiveTab("clusters")}
                className={`py-2 px-4 mr-4 mb-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "clusters"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="hidden sm:inline">Cụm rạp</span>
                <span className="sm:hidden">Cụm</span>
                <span className="ml-2 bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  {cinemaClusters.length}
                </span>
              </button>
            )}
            {selectedCluster && (
              <button
                onClick={() => setActiveTab("theaters")}
                className={`py-2 px-4 mr-4 mb-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "theaters"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="hidden sm:inline">Phòng chiếu</span>
                <span className="sm:hidden">Phòng</span>
                <span className="ml-2 bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">
                  {theaters.length}
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Cinema Systems */}
          {activeTab === "systems" && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Hệ thống rạp chiếu
                </h2>
                <button
                  onClick={fetchCinemaSystems}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Làm mới
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : cinemaSystems.length === 0 ? (
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có hệ thống rạp nào
                  </h3>
                  <p className="text-gray-600">
                    Hiện tại chưa có hệ thống rạp nào được cấu hình.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cinemaSystems.map((system) => (
                    <div
                      key={system.maHeThongRap}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
                      onClick={() => handleSystemSelect(system)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
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
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {system.tenHeThongRap}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Mã: {system.maHeThongRap}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {system.logo}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cinema Clusters */}
          {activeTab === "clusters" && selectedSystem && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    Cụm rạp - {selectedSystem.tenHeThongRap}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Mã hệ thống: {selectedSystem.maHeThongRap}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setActiveTab("systems")}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() =>
                      fetchCinemaClusters(selectedSystem.maHeThongRap)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Làm mới
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : cinemaClusters.length === 0 ? (
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có cụm rạp nào
                  </h3>
                  <p className="text-gray-600">
                    Hệ thống này chưa có cụm rạp nào được cấu hình.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cinemaClusters.map((cluster) => (
                    <div
                      key={cluster.maCumRap}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
                      onClick={() => handleClusterSelect(cluster)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
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
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {cluster.tenCumRap}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Mã: {cluster.maCumRap}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {cluster.diaChi || "Chưa cập nhật"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Theaters */}
          {activeTab === "theaters" && selectedCluster && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    Phòng chiếu - {selectedCluster.tenCumRap}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Cụm rạp: {selectedCluster.maCumRap}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setActiveTab("clusters")}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => {
                      navigate(
                        `/admin/theater-management/add-theater/${selectedCluster.maCumRap}`
                      );
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Thêm phòng
                  </button>
                </div>
              </div>

              {theaters.length === 0 ? (
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có phòng chiếu nào
                  </h3>
                  <p className="text-gray-600">
                    Cụm rạp này chưa có phòng chiếu nào được cấu hình.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mã phòng
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên phòng
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại phòng
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số ghế
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {theaters.map((theater) => (
                        <tr key={theater.maPhong} className="hover:bg-gray-50">
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {theater.maPhong}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {theater.tenPhong}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoomTypeColor(
                                theater.loaiPhong
                              )}`}
                            >
                              {theater.loaiPhong}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {theater.soGhe} ghế
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                theater.trangThai
                              )}`}
                            >
                              {theater.trangThai}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  alert(
                                    `Chỉnh sửa phòng ${theater.tenPhong} - Chức năng sẽ được phát triển sau`
                                  );
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    confirm(
                                      `Bạn có chắc muốn xóa phòng ${theater.tenPhong}?`
                                    )
                                  ) {
                                    alert(
                                      `Xóa phòng ${theater.tenPhong} - Chức năng sẽ được phát triển sau`
                                    );
                                  }
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
