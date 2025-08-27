import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({
    "Quản lý phim": true,
    "Quản lý người dùng": true,
    "Quản lý rạp chiếu": false,
    "Báo cáo & Thống kê": false,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // Nếu không có userInfo, redirect về trang auth
      navigate("/auth");
    }
  }, [navigate]);

  // Menu items được tổ chức theo nhóm
  const menuGroups = [
    {
      title: "Tổng quan",
      items: [
        {
          path: "/admin",
          label: "Dashboard",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Quản lý phim",
      items: [
        {
          path: "/admin/movie-management",
          label: "Danh sách phim",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          path: "/admin/add-movie",
          label: "Thêm phim mới",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Quản lý người dùng",
      items: [
        {
          path: "/admin/user-management",
          label: "Danh sách người dùng",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          ),
        },
        {
          path: "/admin/add-user",
          label: "Thêm người dùng",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Quản lý rạp chiếu",
      items: [
        {
          path: "/admin/theater-management",
          label: "Danh sách rạp",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          path: "/admin/showtime-management",
          label: "Lịch chiếu",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Báo cáo & Thống kê",
      items: [
        {
          path: "/admin/analytics",
          label: "Thống kê tổng quan",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          ),
        },
        {
          path: "/admin/debug-user",
          label: "Debug User Info",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
  ];

  const isActiveLink = (path) => {
    if (path === "/admin") {
      return (
        location.pathname === "/admin" ||
        location.pathname === "/admin/dashboard"
      );
    }
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const toggleMenu = (menuTitle) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuTitle]: !prev[menuTitle],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/auth");
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex items-center p-2 text-gray-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            fixed lg:static lg:translate-x-0 z-40 w-64 h-screen
            bg-white shadow-lg border-r border-gray-200
            flex-shrink-0 flex flex-col
            transition-transform duration-300 ease-in-out
          `}
        >
          {/* Logo Section */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src="/src/assets/galaxy-logo.png"
                alt="Galaxy Cinema"
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Galaxy Cinema
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {group.title}
                  </h3>
                  {group.items.length > 1 && (
                    <button
                      onClick={() => toggleMenu(group.title)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMenus[group.title] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <div
                  className={`space-y-1 transition-all duration-200 ${
                    group.items.length > 1 && !expandedMenus[group.title]
                      ? "hidden"
                      : ""
                  }`}
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                        ${
                          isActiveLink(item.path)
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span
                        className={`
                          mr-3 transition-colors
                          ${
                            isActiveLink(item.path)
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          }
                        `}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActiveLink(item.path) && (
                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userInfo?.hoTen?.charAt(0)?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userInfo?.hoTen || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">
                  {userInfo?.maLoaiNguoiDung === "QuanTri"
                    ? "Quản trị viên"
                    : "Người dùng"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Đăng xuất"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {(() => {
                    const currentPath = location.pathname;
                    if (
                      currentPath === "/admin" ||
                      currentPath === "/admin/dashboard"
                    ) {
                      return "Dashboard";
                    } else if (currentPath.includes("movie-management")) {
                      return "Quản lý phim";
                    } else if (currentPath.includes("user-management")) {
                      return "Quản lý người dùng";
                    } else if (currentPath.includes("theater-management")) {
                      return "Quản lý rạp chiếu";
                    } else if (currentPath.includes("showtime-management")) {
                      return "Quản lý lịch chiếu";
                    } else if (currentPath.includes("create-showtime")) {
                      return "Tạo lịch chiếu";
                    } else if (currentPath.includes("analytics")) {
                      return "Thống kê & Báo cáo";
                    } else if (currentPath.includes("add-user")) {
                      return "Thêm người dùng";
                    } else if (currentPath.includes("add-movie")) {
                      return "Thêm phim mới";
                    } else if (currentPath.includes("create-showtime")) {
                      return "Tạo lịch chiếu";
                    }
                    return "Admin Panel";
                  })()}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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

                {/* Date */}
                <div className="hidden lg:block text-sm text-gray-600">
                  {new Date().toLocaleDateString("vi-VN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="p-4 lg:p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
