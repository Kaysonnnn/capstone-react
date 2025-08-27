import React from 'react';

export default function FilterSection() {
  return (
    <div className="bg-orange-500 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-4 justify-center items-center">
        <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none focus:ring-2 focus:ring-orange-400">
          <option>Chọn thể loại</option>
          <option>Hành động</option>
          <option>Kinh dị</option>
          <option>Hài hước</option>
          <option>Tình cảm</option>
          <option>Khoa học viễn tưởng</option>
        </select>
        
        <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none focus:ring-2 focus:ring-orange-400">
          <option>Chọn phim</option>
          <option>The Fantastic Four: First Steps</option>
          <option>Mang Mẹ Đi Bỏ</option>
          <option>Detective Conan</option>
          <option>Toàn Trí Độc Giả</option>
        </select>
        
        <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none focus:ring-2 focus:ring-orange-400">
          <option>Chọn năm</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        
        <select className="bg-orange-600 text-white px-4 py-2 rounded border-none outline-none focus:ring-2 focus:ring-orange-400">
          <option>Chọn suất chiếu</option>
          <option>08:00</option>
          <option>10:30</option>
          <option>13:00</option>
          <option>15:30</option>
          <option>18:00</option>
          <option>20:30</option>
          <option>22:00</option>
        </select>
        
        <button className="bg-white text-orange-500 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform">
          TÌM KIẾM NGAY
        </button>
      </div>
    </div>
  );
}