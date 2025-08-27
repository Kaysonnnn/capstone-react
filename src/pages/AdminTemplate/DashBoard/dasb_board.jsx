import React, { useState, useEffect } from "react";
import {
  Film,
  Users,
  MapPin,
  TrendingUp,
  Calendar,
  Star,
  Eye,
  Clock,
} from "lucide-react";
import { getStatisticsApi, getMoviesApi } from "../../../services/admin.api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch statistics
        const statsData = await getStatisticsApi();
        setStatistics(statsData);
        
        // Fetch recent movies
        const moviesData = await getMoviesApi("GP01", 1, 5);
        setRecentMovies(moviesData.items || []);
        
        // Create stats cards
        const statsCards = [
          {
            title: "Tổng số phim",
            value: statsData.totalMovies?.toString() || "0",
            icon: Film,
            gradient: "from-purple-600 to-purple-400",
            change: "+12%",
            trend: "up",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100",
          },
          {
            title: "Phim đang chiếu",
            value: statsData.showingMovies?.toString() || "0",
            icon: Calendar,
            gradient: "from-green-600 to-green-400",
            change: "+5%",
            trend: "up",
            bg: "bg-green-50",
            iconBg: "bg-green-100",
          },
          {
            title: "Phim sắp chiếu",
            value: statsData.comingSoonMovies?.toString() || "0",
            icon: Clock,
            gradient: "from-orange-600 to-orange-400",
            change: "+8%",
            trend: "up",
            bg: "bg-orange-50",
            iconBg: "bg-orange-100",
          },
        ];
        
        setStats(statsCards);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickMetrics = [
    {
      label: "Doanh thu hôm nay",
      value: `₫${statistics.totalRevenue || "2.4M"}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    { 
      label: "Lượt xem", 
      value: statistics.totalViews || "12.5K", 
      icon: Eye, 
      color: "text-blue-600" 
    },
    {
      label: "Thời gian TB",
      value: "2h 15m",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      label: "Đánh giá TB",
      value: statistics.averageRating || "4.8",
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard Cinema
        </h1>
        <p className="text-gray-600">Tổng quan hoạt động hệ thống rạp chiếu</p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-10">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${stat.gradient}`}
                ></div>
              </div>

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                    <IconComponent
                      className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-500">
                      {stat.change}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>

                <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} w-3/4 rounded-full`}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <IconComponent className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500">{metric.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Hoạt động gần đây
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "Thêm phim mới",
              movie: "Spider-Man: No Way Home",
              time: "2 giờ trước",
            },
            {
              action: "Cập nhật lịch chiếu",
              movie: "The Batman",
              time: "4 giờ trước",
            },
            {
              action: "Thêm người dùng",
              movie: "user123",
              time: "6 giờ trước",
            },
            { action: "Xóa phim", movie: "Old Movie", time: "1 ngày trước" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.movie} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Doanh thu theo tuần
            </h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                7 ngày
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                30 ngày
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {[40, 65, 45, 80, 90, 75, 85].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Recent Movies */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Phim gần đây
          </h3>
          <div className="space-y-4">
            {recentMovies.length > 0 ? (
              recentMovies.map((movie, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{movie.tenPhim}</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {movie.danhGia || "N/A"}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {movie.sapChieu ? "Sắp chiếu" : "Đang chiếu"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Không có dữ liệu phim</p>
              </div>
            )}
          </div>
        </div>
       </div>
     </div>
   );
 }
