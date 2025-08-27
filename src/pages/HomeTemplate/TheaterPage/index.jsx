import React from 'react';

export default function TheaterPage() {
  const theaters = [
    {
      id: 1,
      name: 'CinemaMax Quận 1',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      phone: '1900-1234',
      email: 'quan1@cinemamax.com',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['IMAX', '4DX', 'Dolby Atmos', 'VIP Lounge'],
      description: 'Rạp chiếu phim hiện đại với công nghệ IMAX và 4DX tiên tiến nhất.',
      showtimes: ['09:00', '11:30', '14:00', '16:30', '19:00', '21:30']
    },
    {
      id: 2,
      name: 'CinemaMax Quận 7',
      address: '456 Nguyễn Thị Thập, Quận 7, TP.HCM',
      phone: '1900-1235',
      email: 'quan7@cinemamax.com',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Dolby Atmos', 'Premium Seats', 'Food Service'],
      description: 'Rạp chiếu phim cao cấp với ghế ngồi thoải mái và dịch vụ ăn uống.',
      showtimes: ['09:30', '12:00', '14:30', '17:00', '19:30', '22:00']
    },
    {
      id: 3,
      name: 'CinemaMax Thủ Đức',
      address: '789 Võ Văn Ngân, Thủ Đức, TP.HCM',
      phone: '1900-1236',
      email: 'thuduc@cinemamax.com',
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      features: ['3D', 'Dolby Digital', 'Student Discount'],
      description: 'Rạp chiếu phim thân thiện với sinh viên, giá cả hợp lý.',
      showtimes: ['08:30', '11:00', '13:30', '16:00', '18:30', '21:00']
    },
    {
      id: 4,
      name: 'CinemaMax Bình Thạnh',
      address: '321 Điện Biên Phủ, Bình Thạnh, TP.HCM',
      phone: '1900-1237',
      email: 'binhthanh@cinemamax.com',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['IMAX', 'VIP Lounge', 'Premium Food', 'Valet Parking'],
      description: 'Rạp chiếu phim cao cấp với dịch vụ VIP và đỗ xe valet.',
      showtimes: ['10:00', '12:30', '15:00', '17:30', '20:00', '22:30']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Hệ Thống</span> Rạp Phim
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các rạp chiếu phim hiện đại với công nghệ tiên tiến và dịch vụ chất lượng cao
            </p>
          </div>
        </div>
      </div>

      {/* Theaters Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {theaters.map((theater) => (
            <div key={theater.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Theater Image */}
              <div className="relative h-48">
                <img
                  src={theater.image}
                  alt={theater.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white mb-1">{theater.name}</h2>
                  <p className="text-white/90 text-sm">{theater.address}</p>
                </div>
              </div>

              {/* Theater Info */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{theater.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Tính năng:</h3>
                  <div className="flex flex-wrap gap-2">
                    {theater.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Liên hệ:</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      <span>{theater.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span>{theater.email}</span>
                    </div>
                  </div>
                </div>

                {/* Showtimes */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Suất chiếu hôm nay:</h3>
                  <div className="flex flex-wrap gap-2">
                    {theater.showtimes.map((time, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                    Xem lịch chiếu
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                    Đặt vé
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              <span className="text-blue-600">Bản Đồ</span> Rạp Phim
            </h2>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-600">Bản đồ tương tác sẽ được hiển thị tại đây</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
