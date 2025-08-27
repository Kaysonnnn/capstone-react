import React from 'react';

export default function FilterSection() {
  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm phim</h2>
          <p className="text-gray-600">Lọc và tìm kiếm phim theo sở thích của bạn</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <select className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
            <option>Chọn thể loại</option>
            <option>Hành động</option>
            <option>Kinh dị</option>
            <option>Hài hước</option>
            <option>Tình cảm</option>
            <option>Khoa học viễn tưởng</option>
          </select>
          
          <select className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
            <option>Chọn phim</option>
            <option>The Fantastic Four: First Steps</option>
            <option>Mang Mẹ Đi Bỏ</option>
            <option>Detective Conan</option>
            <option>Toàn Trí Độc Giả</option>
          </select>
          
          <select className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
            <option>Chọn năm</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          
          <select className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
            <option>Chọn suất chiếu</option>
            <option>08:00</option>
            <option>10:30</option>
            <option>13:00</option>
            <option>15:30</option>
            <option>18:00</option>
            <option>20:30</option>
            <option>22:00</option>
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
            TÌM KIẾM
          </button>
        </div>
      </div>
    </div>
  );
}