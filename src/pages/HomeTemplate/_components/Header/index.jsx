import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 shadow-xl border-b border-purple-500/20">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        {/* Logo và Brand */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v1.5h16V5a2 2 0 00-2-2H4z"/>
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Cinema<span className="text-red-500">Max</span>
            </h1>
            <p className="text-xs text-gray-300">Đặt vé xem phim online</p>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-300 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Mở menu</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-4 md:ml-8 p-4 md:p-0 mt-4 md:mt-0 border border-gray-700 rounded-lg bg-gray-800 md:bg-transparent md:border-0">
            
            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-lg shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Trang chủ
              </NavLink>
            </li>

            <li>
              <NavLink
                to="list-movie"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-lg shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
                Phim đang chiếu
              </NavLink>
            </li>

            <li>
              <NavLink
                to="order-movie"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-lg shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                Đặt vé
              </NavLink>
            </li>

            <li>
              <NavLink
                to="theaters"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-lg shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Rạp phim
              </NavLink>
            </li>

            <li>
              <NavLink
                to="promotions"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-lg shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z" clipRule="evenodd"/>
                </svg>
                Khuyến mãi
              </NavLink>
            </li>

            {/* User Actions */}
            <li className="md:ml-8 mt-4 md:mt-0">
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center justify-center px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center justify-center px-6 py-2 text-gray-300 border border-gray-600 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Đăng nhập
              </NavLink>
            </li>

            <li className="mt-2 md:mt-0">
              <NavLink
                to="register"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center justify-center px-6 py-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg transform scale-105 transition-all duration-300"
                    : "flex items-center justify-center px-6 py-2 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-full hover:from-red-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
                }
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                </svg>
                Đăng ký
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}