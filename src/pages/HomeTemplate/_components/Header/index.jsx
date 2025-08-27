import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-25 h-30 flex items-center justify-center">
                <img
                  src="https://media1.thehungryjpeg.com/thumbs2/ori_4333060_bcqh84335in8mfc2703v1mx8puhp8t7y0ky4cb8y_letter-c-planet-vector-template-logo-design.jpg"
                  alt="CinemaMax Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-600 leading-none">
                  Cinema
                </span>
                <span className="text-lg font-semibold text-gray-700 leading-none">
                  Max
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    : "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="list-movie"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    : "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                }
              >
                Phim đang chiếu
              </NavLink>
              <NavLink
                to="order-movie"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    : "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                }
              >
                Đặt vé
              </NavLink>
              <NavLink
                to="theaters"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    : "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                }
              >
                Rạp phim
              </NavLink>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    : "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                }
              >
                Giới thiệu
              </NavLink>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="login"
              className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Đăng nhập
            </NavLink>
            <NavLink
              to="register"
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Đăng ký
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 p-2 rounded-md transition-colors duration-200"
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
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 block px-3 py-2 text-base font-medium"
                  : "text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="list-movie"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 block px-3 py-2 text-base font-medium"
                  : "text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              }
            >
              Phim đang chiếu
            </NavLink>
            <NavLink
              to="order-movie"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 block px-3 py-2 text-base font-medium"
                  : "text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              }
            >
              Đặt vé
            </NavLink>
            <NavLink
              to="theaters"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 block px-3 py-2 text-base font-medium"
                  : "text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              }
            >
              Rạp phim
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 block px-3 py-2 text-base font-medium"
                  : "text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              }
            >
              Giới thiệu
            </NavLink>
            <div className="pt-4 pb-3 border-t border-blue-100">
              <NavLink
                to="login"
                className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="register"
                className="bg-blue-600 text-white block mt-2 px-3 py-2 rounded-full text-base font-medium hover:bg-blue-700"
              >
                Đăng ký
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
