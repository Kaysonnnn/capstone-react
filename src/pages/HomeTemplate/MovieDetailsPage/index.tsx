import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userRating, setUserRating] = useState(0);

  // Mock data for showtimes and cinemas
  const cinemas = [
    { id: 1, name: "CinemaMax Quận 1", logo: "https://img.icons8.com/color/48/cinema.png", location: "123 Nguyễn Huệ, Q1" },
    { id: 2, name: "CinemaMax Quận 7", logo: "https://img.icons8.com/color/48/movie-theater.png", location: "456 Nguyễn Thị Thập, Q7" },
    { id: 3, name: "CinemaMax Thủ Đức", logo: "https://img.icons8.com/color/48/theatre-mask.png", location: "789 Võ Văn Ngân, Thủ Đức" },
  ];

  const showtimes = ["09:00", "11:30", "14:00", "16:30", "19:00", "21:30"];
  
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!movieId) {
        setError("Không có ID phim");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching movie details for ID:", movieId);
        const response = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
        
        console.log("API Response:", response);
        
        if (response.data && response.data.content) {
          setMovie(response.data.content);
        } else {
          setError("Dữ liệu phim không hợp lệ");
        }
      } catch (error: any) {
        console.error("Error fetching movie details:", error);
        
        if (error.response) {
          // Server responded with error status
          if (error.response.status === 404) {
            setError("Không tìm thấy thông tin phim");
          } else if (error.response.status === 500) {
            setError("Lỗi server, vui lòng thử lại sau");
          } else {
            setError(`Lỗi ${error.response.status}: ${error.response.data?.message || 'Không thể tải thông tin phim'}`);
          }
        } else if (error.request) {
          // Network error
          setError("Lỗi kết nối mạng, vui lòng kiểm tra internet");
        } else {
          // Other error
          setError("Không thể tải thông tin phim");
        }
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => interactive && setUserRating(i + 1)}
        className={`text-xl ${
          i < rating 
            ? 'text-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : ''}`}
        disabled={!interactive}
      >
        ★
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin phim...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy phim</h2>
          <p className="text-gray-600 mb-4">{error || "Thông tin phim không tồn tại"}</p>
          <div className="space-y-3">
            <Link to="/list-movie" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block">
              Quay lại danh sách phim
            </Link>
            <br />
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie?.tenPhim}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                {renderStars(4)}
                <span className="text-xl font-semibold">4.0</span>
                <span className="text-blue-200">/5</span>
              </div>
              <span className="text-blue-200">•</span>
              <span className="text-blue-200">
                {movie?.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy") : "Chưa xác định"}
              </span>
            </div>
            <p className="text-blue-100 max-w-2xl">
              {movie?.moTa || "Thông tin mô tả phim đang được cập nhật..."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={movie?.hinhAnh} 
                className="w-full h-auto object-cover" 
                alt={movie?.tenPhim}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
                }}
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    HD
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Đang chiếu
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời lượng:</span>
                    <span className="font-medium">120 phút</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thể loại:</span>
                    <span className="font-medium">Hành động, Tâm lý</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngôn ngữ:</span>
                    <span className="font-medium">Tiếng Việt</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Đánh giá của bạn:</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(userRating, true)}
                    <span className="text-gray-600">
                      {userRating > 0 ? `${userRating}/5` : 'Chưa đánh giá'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Tổng quan' },
                    { id: 'showtimes', label: 'Lịch chiếu' },
                    { id: 'reviews', label: 'Đánh giá' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Nội dung phim</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {movie?.moTa || "Thông tin mô tả phim đang được cập nhật..."}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Ngày khởi chiếu</h4>
                        <p className="text-gray-600">
                          {movie?.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy") : "Chưa xác định"}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Thể loại</h4>
                        <p className="text-gray-600">Hành động, Tâm lý, Phiêu lưu</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Thông tin bổ sung</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700">Đạo diễn:</span>
                          <span className="text-blue-600 ml-2">Nguyễn Văn A</span>
                        </div>
                        <div>
                          <span className="text-blue-700">Diễn viên:</span>
                          <span className="text-blue-600 ml-2">Nguyễn Văn B, Trần Thị C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có đánh giá nào</h3>
                      <p className="text-gray-600 mb-4">Hãy là người đầu tiên đánh giá bộ phim này</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                        Viết đánh giá
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'showtimes' && (
                  <div className="space-y-6">
                    {/* Date Selector */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Chọn ngày xem phim</h3>
                      <div className="grid grid-cols-7 gap-2">
                        {weekDates.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(date)}
                            className={`text-center p-3 rounded-lg transition-colors ${
                              selectedDate.toDateString() === date.toDateString()
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {format(date, "dd")}
                            </div>
                            <div className="text-xs">
                              {format(date, "EEE")}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cinema Showtimes */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Rạp chiếu phim</h3>
                      {cinemas.map((cinema) => (
                        <div key={cinema.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v1.5h16V5a2 2 0 00-2-2H4z"/>
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm4 0V9a1 1 0 112 0v6H8z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{cinema.name}</h4>
                              <p className="text-gray-600 text-sm">{cinema.location}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-600 mb-3 font-medium">SUẤT CHIẾU</p>
                            <div className="flex flex-wrap gap-3">
                              {showtimes.map((time, index) => (
                                <Link
                                  key={index}
                                  to="/order-movie"
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                >
                                  {time}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}