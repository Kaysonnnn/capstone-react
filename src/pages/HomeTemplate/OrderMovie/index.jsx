import React, { useState } from "react";

export default function OrderMovie() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const movies = [
    {
      id: 1,
      name: "The Fantastic Four: First Steps",
      image:
        "https://cdn.galaxycine.vn/media/2025/6/25/fundiin-4_1750864808890.jpg",
    },
    {
      id: 2,
      name: "Mang Mẹ Đi Bỏ",
      image:
        "https://cdn.galaxycine.vn/media/2025/7/21/mang-me-di-bo-2048_1753070307369.jpg",
    },
    {
      id: 3,
      name: "Detective Conan",
      image:
        "https://cdn.galaxycine.vn/media/2025/8/1/chot-don-2048_1754023401037.jpg",
    },
  ];

  const theaters = [
    {
      id: 1,
      name: "CinemaMax Quận 1",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    },
    {
      id: 2,
      name: "CinemaMax Quận 7",
      address: "456 Nguyễn Thị Thập, Quận 7, TP.HCM",
    },
    {
      id: 3,
      name: "CinemaMax Thủ Đức",
      address: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
    },
  ];

  const dates = [
    { id: 1, date: "2025-01-20", day: "Hôm nay" },
    { id: 2, date: "2025-01-21", day: "Ngày mai" },
    { id: 3, date: "2025-01-22", day: "Thứ 4" },
  ];

  const times = [
    { id: 1, time: "09:00" },
    { id: 2, time: "11:30" },
    { id: 3, time: "14:00" },
    { id: 4, time: "16:30" },
    { id: 5, time: "19:00" },
    { id: 6, time: "21:30" },
  ];

  const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSeatClick = (row, col) => {
    const seatId = `${row}${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (
      selectedMovie &&
      selectedTheater &&
      selectedDate &&
      selectedTime &&
      selectedSeats.length > 0
    ) {
      alert("Đặt vé thành công!");
    } else {
      alert("Vui lòng chọn đầy đủ thông tin!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-blue-600">Đặt Vé</span> Xem Phim
            </h1>
            <p className="text-gray-600">Chọn phim, rạp và ghế ngồi của bạn</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Chọn Phim
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedMovie === movie.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedMovie(movie.id)}
                  >
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {movie.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theater Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Chọn Rạp
              </h2>
              <div className="space-y-3">
                {theaters.map((theater) => (
                  <div
                    key={theater.id}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedTheater === theater.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedTheater(theater.id)}
                  >
                    <h3 className="font-semibold text-gray-900">
                      {theater.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{theater.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Chọn Ngày & Giờ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Ngày chiếu</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {dates.map((date) => (
                      <button
                        key={date.id}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedDate === date.date
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedDate(date.date)}
                      >
                        <div className="text-sm font-medium">{date.day}</div>
                        <div className="text-xs">{date.date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Giờ chiếu</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((time) => (
                      <button
                        key={time.id}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedTime === time.time
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedTime(time.time)}
                      >
                        <div className="text-sm font-medium">{time.time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Seat Selection & Summary */}
          <div className="space-y-6">
            {/* Seat Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Chọn Ghế
              </h2>
              <div className="text-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded inline-block mr-2"></div>
                <span className="text-sm text-gray-600 mr-4">Có sẵn</span>
                <div className="w-4 h-4 bg-blue-600 rounded inline-block mr-2"></div>
                <span className="text-sm text-gray-600 mr-4">Đã chọn</span>
                <div className="w-4 h-4 bg-red-500 rounded inline-block mr-2"></div>
                <span className="text-sm text-gray-600">Đã đặt</span>
              </div>

              <div className="overflow-x-auto">
                <div className="inline-block">
                  {/* Screen */}
                  <div className="text-center mb-4">
                    <div className="bg-gray-300 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium">
                      MÀN HÌNH
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="space-y-2">
                    {seatRows.map((row) => (
                      <div key={row} className="flex items-center gap-2">
                        <div className="w-6 text-center text-sm font-medium text-gray-600">
                          {row}
                        </div>
                        <div className="flex gap-1">
                          {seatCols.map((col) => {
                            const seatId = `${row}${col}`;
                            const isSelected = selectedSeats.includes(seatId);
                            const isBooked = Math.random() < 0.3; // Random booked seats

                            return (
                              <button
                                key={col}
                                className={`w-8 h-8 rounded text-xs font-medium transition-all duration-200 ${
                                  isBooked
                                    ? "bg-red-500 text-white cursor-not-allowed"
                                    : isSelected
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                onClick={() =>
                                  !isBooked && handleSeatClick(row, col)
                                }
                                disabled={isBooked}
                              >
                                {col}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tóm Tắt Đặt Vé
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số ghế:</span>
                  <span className="font-medium">
                    {selectedSeats.length} ghế
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá vé:</span>
                  <span className="font-medium">75,000 VNĐ/ghế</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">
                    {selectedSeats.length * 75000} VNĐ
                  </span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 mt-4"
              >
                Xác Nhận Đặt Vé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
