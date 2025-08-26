import { useState } from 'react';

export default function OrderMovie() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats] = useState(['12', '13', '25', '26', '45', '67', '89', '90', '123', '124']);
  
  // Generate seats (12 rows x 14 seats = 168 seats)
  const generateSeats = () => {
    const seats = [];
    let seatNumber = 1;
    
    for (let row = 1; row <= 12; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= 14; seat++) {
        rowSeats.push({
          id: seatNumber.toString(),
          row: row,
          seat: seat,
          isOccupied: occupiedSeats.includes(seatNumber.toString()),
          isSelected: selectedSeats.includes(seatNumber.toString())
        });
        seatNumber++;
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (seat) => {
    if (seat.isOccupied) {
      return "bg-gray-400 cursor-not-allowed text-gray-600";
    }
    if (seat.isSelected) {
      return "bg-green-500 hover:bg-green-600 text-white shadow-lg transform scale-105";
    }
    return "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:transform hover:scale-105";
  };

  const ticketPrice = 75000; // 75,000 VND per ticket
  const totalAmount = selectedSeats.length * ticketPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Section - Seat Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 12V9a1 1 0 112 0v6H7zm4 0V9a1 1 0 112 0v6h-2z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Chọn ghế của bạn</h2>
                <p className="text-purple-200">Chọn ghế ngồi thoải mái nhất cho trải nghiệm tuyệt vời</p>
              </div>

              {/* Screen */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 h-3 rounded-full mb-2 shadow-lg"></div>
                <p className="text-center text-white font-medium">MÀN HÌNH</p>
              </div>

              {/* Seat Map */}
              <div className="space-y-3 mb-8">
                {seats.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-2">
                    {row.map((seat, seatIndex) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id)}
                        className={`
                          w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-300
                          ${getSeatClass(seat)}
                          ${seatIndex === 6 ? 'mr-4' : ''}
                        `}
                        disabled={seat.isOccupied}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-white">Có thể chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-white">Đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-white">Đã bán</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Details */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Thông tin đặt vé</h3>
              </div>

              {/* Movie Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-purple-200">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-sm">PHIM</span>
                </div>
                <h4 className="text-white font-semibold text-lg">Cua lại vợ bầu</h4>

                <div className="flex items-center gap-2 text-blue-200">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-sm">LỊCH CHIẾU</span>
                </div>
                <p className="text-white">02/01/2019 - 10:01</p>

                <div className="flex items-center gap-2 text-green-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-sm">RẠP CHIẾU</span>
                </div>
                <div>
                  <p className="text-white font-medium">BHD Star Cineplex - Bitexco</p>
                  <p className="text-gray-300 text-sm">Rạp 7</p>
                </div>

                <div className="flex items-center gap-2 text-yellow-200">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span className="text-sm">KHÁCH HÀNG</span>
                </div>
                <p className="text-white">Vĩnh Nghiêm User</p>
              </div>

              {/* Booking Summary */}
              <div className="border-t border-white/20 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Số vé:</span>
                  <span className="text-2xl font-bold text-green-400">{selectedSeats.length}</span>
                </div>

                {selectedSeats.length > 0 && (
                  <div>
                    <span className="text-white block mb-2">Ghế đã chọn:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seatId => (
                        <span 
                          key={seatId}
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {seatId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl text-white">Tổng tiền:</span>
                    <span className="text-3xl font-bold text-yellow-400">
                      {totalAmount.toLocaleString('vi-VN')} VND
                    </span>
                  </div>

                  <button 
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                      selectedSeats.length > 0 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105' 
                        : 'bg-gray-500 cursor-not-allowed'
                    }`}
                    disabled={selectedSeats.length === 0}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                      Đặt vé ngay
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}