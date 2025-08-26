import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userRating, setUserRating] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Mock data for showtimes and cinemas
  const cinemas = [
    { id: 1, name: "BHD Star Cineplex", logo: "https://img.icons8.com/color/48/cinema.png", location: "3/2" },
    { id: 2, name: "CGV Cinemas", logo: "https://img.icons8.com/color/48/movie-theater.png", location: "Vincom 3/2" },
    { id: 3, name: "Galaxy Cinema", logo: "https://img.icons8.com/color/48/theatre-mask.png", location: "Nguyen Kiem" },
    { id: 4, name: "Lotte Cinema", logo: "https://img.icons8.com/color/48/popcorn.png", location: "District 1" },
    { id: 5, name: "MegaGS", logo: "https://img.icons8.com/color/48/film-reel.png", location: "Cao Thang" }
  ];

  const showtimes = ["22:30:00", "23:05:00", "10:49:00", "21:59:00", "21:59:00"];
  
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
        setMovie(response.data.content);
        setError(null);
      } catch (error) {
        console.log("⚡️ ~ getMovieDetails ~ error:", error);
        setError("Không thể tải thông tin phim");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  // Parallax effect for scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => interactive && setUserRating(i + 1)}
        className={`text-2xl ${
          i < rating 
            ? 'text-yellow-400' 
            : 'text-gray-600'
        } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : ''}`}
        disabled={!interactive}
      >
        ★
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400 text-xl">{error || "Không tìm thấy thông tin phim"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative">
              <img 
                src={movie?.hinhAnh} 
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl" 
                alt={movie?.biDanh}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/80 rounded-lg p-4 text-center">
                  <h2 className="text-xl font-bold mb-2">{movie?.tenPhim}</h2>
                  <p className="text-sm text-gray-300">
                    {movie?.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "MMMM d") : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{movie?.tenPhim}</h1>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(4)}
                  </div>
                  <span className="text-2xl font-bold">5.7</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <span className="text-sm text-gray-400">0 Reviews</span>
              </div>

              {/* Rate This Movie */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Rate This Movie:</h3>
                <div className="flex items-center space-x-2">
                  {renderStars(userRating, true)}
                  <span className="ml-2 text-gray-400">
                    {userRating > 0 ? `${userRating}/5` : 'Click to rate'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8">
                {['overview', 'reviews', 'showtimes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Nội dung phim</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {movie?.moTa || "Thông tin mô tả phim đang được cập nhật..."}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Ngày khởi chiếu</h4>
                      <p className="text-gray-300">
                        {movie?.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy") : "Chưa xác định"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Thể loại</h4>
                      <p className="text-gray-300">Hành động, Tâm lý</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">Chưa có đánh giá nào</p>
                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                      Viết đánh giá đầu tiên
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'showtimes' && (
                <div className="space-y-6">
                  {/* Date Selector */}
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <div className="grid grid-cols-7 gap-4">
                        {weekDates.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(date)}
                            className={`text-center p-2 rounded-lg transition-colors ${
                              selectedDate.toDateString() === date.toDateString()
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {format(date, "dd/MM")}
                            </div>
                            <div className="text-xs">
                              {format(date, "EEE")}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <button className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Cinema Showtimes */}
                  <div className="space-y-4">
                    {cinemas.map((cinema) => (
                      <div key={cinema.id} className="bg-gray-800/30 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <img src={cinema.logo} alt={cinema.name} className="w-12 h-12 rounded" />
                          <div>
                            <h3 className="font-semibold text-lg">{cinema.name}</h3>
                            <p className="text-gray-400 text-sm">{cinema.location}</p>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4">
                          <p className="text-sm text-gray-400 mb-3">VIEWING TIMES</p>
                          <div className="flex flex-wrap gap-3">
                            {showtimes.map((time, index) => (
                              <button
                                key={index}
                                className="bg-gray-700 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                {time.slice(0, 5)}
                              </button>
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
  );
}