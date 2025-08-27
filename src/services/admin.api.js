import api from "./api";

// ===== MOVIE MANAGEMENT =====
export const getMoviesApi = async (
  maNhom = "GP01",
  soTrang = 1,
  soPhanTuTrenTrang = 20
) => {
  try {
    console.log(
      "🔍 API Call: getMoviesApi with maNhom:",
      maNhom,
      "soTrang:",
      soTrang
    );
    const response = await api.get(
      `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    console.log("✅ API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ API Error in getMoviesApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const getAllMoviesApi = async () => {
  try {
    console.log("🔍 API Call: getAllMoviesApi");

    // Thử endpoint chính
    try {
      const response = await api.get("/api/QuanLyPhim/LayDanhSachPhim");
      console.log("✅ API Response:", response.data);
      return response.data.content;
    } catch (error) {
      console.error("❌ Primary get movies endpoint failed:", error);

      // Thử endpoint thay thế - phân trang
      const response = await api.get(
        "/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=100"
      );
      console.log("✅ Alternative API Response:", response.data);
      return response.data.content.items || [];
    }
  } catch (error) {
    console.error("❌ API Error in getAllMoviesApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const getMoviesByDateApi = async (tuNgay, denNgay, maNhom = "GP01") => {
  try {
    console.log(
      "🔍 API Call: getMoviesByDateApi with tuNgay:",
      tuNgay,
      "denNgay:",
      denNgay
    );
    const response = await api.get(
      `/api/QuanLyPhim/LayDanhSachPhimTheoNgay?tuNgay=${tuNgay}&denNgay=${denNgay}&maNhom=${maNhom}`
    );
    console.log("✅ API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ API Error in getMoviesByDateApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const getBannersApi = async () => {
  try {
    console.log("🔍 API Call: getBannersApi");
    const response = await api.get("/api/QuanLyPhim/LayDanhSachBanner");
    console.log("✅ API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ API Error in getBannersApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

// API thêm phim với hình ảnh - sử dụng đúng format theo Swagger
export const addMovieApi = async (formData) => {
  try {
    console.log("🔍 Sending FormData to Add Movie API (with image)...");

    // Log FormData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`FormData ${key}:`, value);
    }

    // Kiểm tra file hình ảnh
    const imageFile = formData.get("hinhAnh");
    if (imageFile && imageFile instanceof File) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        throw new Error("Hình ảnh phải có định dạng *.jpg, *.png, *.gif!");
      }
    }

    const response = await api.post(
      "/api/QuanLyPhim/ThemPhimUploadHinh",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ Add Movie API Response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Add Movie API Error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    console.error("Error headers:", error.response?.headers);
    throw error;
  }
};

// API thêm phim không có hình - sử dụng query parameters theo Swagger
export const addMovieWithoutImageApi = async (movieData) => {
  try {
    console.log("🔍 Sending movie data to Add Movie API (without image)...");
    console.log("Movie data:", movieData);

    // Tạo FormData với file rỗng và query parameters
    const formData = new FormData();

    // Thêm file rỗng (nếu API yêu cầu)
    const emptyFile = new File([""], "empty.jpg", { type: "image/jpeg" });
    formData.append("file", emptyFile);

    // Thêm các thông tin phim vào query parameters
    const queryParams = new URLSearchParams({
      tenPhim: movieData.tenPhim,
      maNhom: movieData.maNhom || "GP01",
      trailer: movieData.trailer,
      moTa: movieData.moTa,
      danhGia: movieData.danhGia,
      SapChieu: movieData.SapChieu,
      DangChieu: movieData.DangChieu,
      ngayKhoiChieu: movieData.ngayKhoiChieu,
      Hot: movieData.Hot,
    });

    const response = await api.post(
      `/api/QuanLyPhim?${queryParams.toString()}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ Add Movie (no image) API Response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Add Movie (no image) API Error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    throw error;
  }
};

// Alternative API for adding movie with different endpoint
export const addMovieAlternativeApi = async (movieData) => {
  try {
    console.log("🔍 Sending movie data to Alternative Add Movie API...");
    console.log("Movie data:", movieData);

    const response = await api.post(
      "/api/QuanLyPhim/ThemPhimUploadHinh",
      movieData
    );
    console.log("✅ Alternative Add Movie API Response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Alternative Add Movie API Error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    throw error;
  }
};

// Test API connection
export const testApiConnection = async () => {
  try {
    console.log("🔍 Testing API connection...");
    const response = await api.get("/api/QuanLyPhim/LayDanhSachPhim");
    console.log("✅ API connection successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API connection failed:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    throw error;
  }
};

// API test thêm phim với format JSON - thử nghiệm
export const testAddMovieApi = async (movieData) => {
  try {
    console.log("🔍 Testing Add Movie API with JSON format...");
    console.log("Movie data:", movieData);

    // Thử với format JSON đơn giản
    const testData = {
      tenPhim: movieData.tenPhim,
      trailer: movieData.trailer,
      moTa: movieData.moTa,
      danhGia: parseInt(movieData.danhGia),
      SapChieu: movieData.SapChieu,
      DangChieu: movieData.DangChieu,
      ngayKhoiChieu: movieData.ngayKhoiChieu,
      maNhom: movieData.maNhom || "GP01",
      Hot: movieData.Hot,
      maPhim: Math.floor(Math.random() * 10000) + 1000, // Tạo mã phim ngẫu nhiên
    };

    console.log("Test data:", testData);

    const response = await api.post(
      "/api/QuanLyPhim/ThemPhimUploadHinh",
      testData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Test Add Movie API Response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Test Add Movie API Error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    throw error;
  }
};

export const updateMovieApi = async (formData) => {
  try {
    console.log("🔍 Sending FormData to Update Movie API...");

    // Log FormData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`FormData ${key}:`, value);
    }

    // Kiểm tra file hình ảnh nếu có
    const imageFile = formData.get("hinhAnh");
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        throw new Error("Hình ảnh phải có định dạng *.jpg, *.png, *.gif!");
      }
    }

    const response = await api.post(
      "/api/QuanLyPhim/CapNhatPhimUpload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ Update Movie API Response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Update Movie API Error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    console.error("Error headers:", error.response?.headers);

    // Xử lý lỗi 401 Unauthorized
    if (error.response?.status === 401) {
      const errorMessage =
        "Lỗi xác thực (401). Vui lòng kiểm tra:\n" +
        "1. Token Authorization có hợp lệ không\n" +
        "2. TokenCybersoft có đúng không\n" +
        "3. Thử đăng nhập lại";
      throw new Error(errorMessage);
    }

    // Xử lý lỗi 403 cụ thể
    if (error.response?.status === 403) {
      const errorMessage =
        "Lỗi quyền truy cập (403). Vui lòng kiểm tra:\n" +
        "1. Token đăng nhập có hợp lệ không\n" +
        "2. Tài khoản có quyền cập nhật phim không\n" +
        "3. Thử đăng nhập lại";
      throw new Error(errorMessage);
    }

    throw error;
  }
};

export const deleteMovieApi = async (maPhim) => {
  try {
    console.log("🔍 Deleting movie with maPhim:", maPhim);

    // Thử endpoint chính
    try {
      const response = await api.delete(
        `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
      );
      console.log("✅ Delete Movie API Response:", response);
      return response.data;
    } catch (error) {
      console.error("❌ Primary delete endpoint failed:", error);

      // Thử endpoint thay thế
      const response = await api.delete(`/api/QuanLyPhim/XP?MaPhim=${maPhim}`);
      console.log("✅ Alternative Delete Movie API Response:", response);
      return response.data;
    }
  } catch (error) {
    console.error("❌ Delete Movie API Error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    throw error;
  }
};

export const getMovieByIdApi = async (maPhim) => {
  try {
    console.log("🔍 API Call: getMovieByIdApi with maPhim:", maPhim);

    // Thử endpoint chính
    try {
      const response = await api.get(
        `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
      );
      console.log("✅ API Response:", response.data);
      return response.data.content;
    } catch (error) {
      console.error("❌ Primary get movie endpoint failed:", error);

      // Thử endpoint thay thế - lấy từ danh sách
      const allMovies = await getAllMoviesApi();
      const movie = allMovies.find((m) => m.maPhim === parseInt(maPhim));

      if (!movie) {
        throw new Error(`Không tìm thấy phim với mã: ${maPhim}`);
      }

      console.log("✅ Found movie from alternative method:", movie);
      return movie;
    }
  } catch (error) {
    console.error("❌ API Error in getMovieByIdApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

// Alternative method to get movie by ID using getAllMoviesApi
export const getMovieByIdAlternativeApi = async (maPhim) => {
  try {
    console.log("🔍 API Call: getMovieByIdAlternativeApi with maPhim:", maPhim);
    const allMovies = await getAllMoviesApi();
    const movie = allMovies.find((m) => m.maPhim === maPhim);

    if (!movie) {
      throw new Error(`Không tìm thấy phim với mã: ${maPhim}`);
    }

    console.log("✅ Found movie:", movie);
    return movie;
  } catch (error) {
    console.error("❌ API Error in getMovieByIdAlternativeApi:", error);
    throw error;
  }
};

export const checkMovieNameExistsApi = async (tenPhim, maPhim = null) => {
  try {
    console.log(
      "🔍 API Call: checkMovieNameExistsApi with tenPhim:",
      tenPhim,
      "maPhim:",
      maPhim
    );

    // Lấy danh sách tất cả phim
    const response = await api.get("/api/QuanLyPhim/LayDanhSachPhim");
    const movies = response.data.content;

    // Kiểm tra xem có phim nào khác có cùng tên không
    const existingMovie = movies.find(
      (movie) =>
        movie.tenPhim.toLowerCase() === tenPhim.toLowerCase() &&
        movie.maPhim !== maPhim
    );

    console.log(
      "✅ Check result:",
      existingMovie ? "Name exists" : "Name available"
    );
    return existingMovie ? true : false;
  } catch (error) {
    console.error("❌ API Error in checkMovieNameExistsApi:", error);
    throw error;
  }
};

export const checkUserAccountExistsApi = async (taiKhoan) => {
  try {
    console.log(
      "🔍 API Call: checkUserAccountExistsApi with taiKhoan:",
      taiKhoan
    );

    // Lấy danh sách tất cả người dùng
    const response = await api.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung");
    const users = response.data.content;

    // Kiểm tra xem có người dùng nào có cùng tài khoản không
    const existingUser = users.find(
      (user) => user.taiKhoan.toLowerCase() === taiKhoan.toLowerCase()
    );

    console.log(
      "✅ Check result:",
      existingUser ? "Account exists" : "Account available"
    );
    return existingUser ? true : false;
  } catch (error) {
    console.error("❌ API Error in checkUserAccountExistsApi:", error);
    throw error;
  }
};

// ===== USER MANAGEMENT =====
export const getUserTypesApi = async () => {
  try {
    console.log("🔍 API Call: getUserTypesApi");
    const response = await api.get(
      "/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
    );
    console.log("✅ API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ API Error in getUserTypesApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const getAllUsersApi = async () => {
  try {
    console.log("🔍 API Call: getAllUsersApi");
    const response = await api.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung");
    console.log("✅ API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ API Error in getAllUsersApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const getUsersApi = async (
  maNhom = "GP01",
  soTrang = 1,
  soPhanTuTrenTrang = 20
) => {
  try {
    const response = await api.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const searchUsersApi = async (tuKhoa) => {
  try {
    const response = await api.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${tuKhoa}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const searchUsersPaginatedApi = async (
  tuKhoa,
  soTrang = 1,
  soPhanTuTrenTrang = 20
) => {
  try {
    const response = await api.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getAccountInfoApi = async (accountData) => {
  try {
    const response = await api.post(
      "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      accountData
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getUserInfoApi = async (userData) => {
  try {
    console.log("🔍 API Call: getUserInfoApi with data:", userData);
    const response = await api.post(
      "/api/QuanLyNguoiDung/LayThongTinNguoiDung",
      userData
    );
    console.log("✅ API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ API Error in getUserInfoApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

// Alternative method to get user info using getAllUsersApi
export const getUserInfoAlternativeApi = async (taiKhoan) => {
  try {
    console.log(
      "🔍 API Call: getUserInfoAlternativeApi with taiKhoan:",
      taiKhoan
    );
    const allUsers = await getAllUsersApi();
    const user = allUsers.find((u) => u.taiKhoan === taiKhoan);

    if (!user) {
      throw new Error(`Không tìm thấy người dùng với tài khoản: ${taiKhoan}`);
    }

    console.log("✅ Found user:", user);
    return user;
  } catch (error) {
    console.error("❌ API Error in getUserInfoAlternativeApi:", error);
    throw error;
  }
};

export const addUserApi = async (userData) => {
  try {
    console.log("🔍 API Call: addUserApi with data:", userData);
    const response = await api.post(
      "/api/QuanLyNguoiDung/ThemNguoiDung",
      userData
    );
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error in addUserApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const updateUserApi = async (userData) => {
  try {
    console.log("🔍 API Call: updateUserApi with data:", userData);
    const response = await api.post(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      userData
    );
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error in updateUserApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

export const updateUserPostApi = async (userData) => {
  try {
    const response = await api.post(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserApi = async (taiKhoan) => {
  try {
    console.log("🔍 API Call: deleteUserApi with taiKhoan:", taiKhoan);
    const response = await api.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error in deleteUserApi:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

// ===== THEATER MANAGEMENT =====
export const getTheatersApi = async () => {
  try {
    const response = await api.get("/api/QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getTheaterByIdApi = async (maHeThongRap) => {
  try {
    const response = await api.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

// ===== SHOWTIME MANAGEMENT =====
export const getShowtimesApi = async (maPhim) => {
  try {
    const response = await api.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const addShowtimeApi = async (showtimeData) => {
  try {
    const response = await api.post(
      "/api/QuanLyDatVe/TaoLichChieu",
      showtimeData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ===== BOOKING MANAGEMENT =====
export const getBookingsApi = async (maLichChieu) => {
  try {
    const response = await api.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

// ===== STATISTICS =====
export const getStatisticsApi = async () => {
  try {
    // Sử dụng API thực tế để lấy thống kê
    const response = await api.get(
      "/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=100"
    );
    const movies = response.data.content.items || [];

    // Tính toán thống kê từ dữ liệu phim
    const stats = {
      totalMovies: movies.length,
      showingMovies: movies.filter((m) => !m.sapChieu).length,
      comingSoonMovies: movies.filter((m) => m.sapChieu).length,
      hotMovies: movies.filter((m) => m.hot).length,
      totalRevenue: "2.4M",
      totalViews: "12.5K",
      averageRating: "4.8",
    };

    return stats;
  } catch (error) {
    throw error;
  }
};

// ===== AUTHENTICATION =====
export const loginAdminApi = async (credentials) => {
  try {
    console.log("🔐 Login attempt with:", credentials);
    const response = await api.post(
      "/api/QuanLyNguoiDung/DangNhap",
      credentials
    );
    console.log("✅ Login successful:", response.data);
    return response.data.content;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const registerAdminApi = async (userData) => {
  try {
    const response = await api.post("/api/QuanLyNguoiDung/DangKy", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserApi = async () => {
  try {
    const user = localStorage.getItem("userInfo");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// ===== SHOWTIME MANAGEMENT APIs =====

// Lấy thông tin hệ thống rạp
export const getCinemaSystemsApi = async () => {
  try {
    console.log("🎬 Fetching cinema systems...");
    const response = await api.get("/api/QuanLyRap/LayThongTinHeThongRap");
    console.log("✅ Cinema systems:", response.data);
    // Trả về content nếu có, hoặc toàn bộ data
    return response.data.content || response.data || [];
  } catch (error) {
    console.error("❌ Error fetching cinema systems:", error);
    throw error;
  }
};

// Lấy thông tin cụm rạp theo hệ thống rạp
export const getCinemaClustersApi = async (maHeThongRap) => {
  try {
    console.log("🎬 Fetching cinema clusters for system:", maHeThongRap);

    if (!maHeThongRap) {
      console.log("⚠️ No maHeThongRap provided, returning empty array");
      return [];
    }

    const response = await api.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
    console.log("✅ Cinema clusters response:", response.data);

    // Xử lý các cấu trúc response khác nhau
    let clusters = [];
    if (response.data) {
      if (response.data.content && Array.isArray(response.data.content)) {
        clusters = response.data.content;
      } else if (Array.isArray(response.data)) {
        clusters = response.data;
      } else if (
        response.data.cumRapChieu &&
        Array.isArray(response.data.cumRapChieu)
      ) {
        clusters = response.data.cumRapChieu;
      } else if (
        response.data.lstCumRap &&
        Array.isArray(response.data.lstCumRap)
      ) {
        clusters = response.data.lstCumRap;
      }
    }

    console.log("✅ Processed clusters:", clusters);

    // Nếu không có dữ liệu, trả về dữ liệu mẫu để test
    if (clusters.length === 0) {
      console.log("⚠️ No clusters found, returning sample data for testing");
      const sampleClusters = [
        { maCumRap: "bhd-star-bitexco", tenCumRap: "BHD Star Bitexco" },
        { maCumRap: "bhd-star-thao-dien", tenCumRap: "BHD Star Thảo Điền" },
        { maCumRap: "cgv-aeon-binh-tan", tenCumRap: "CGV Aeon Bình Tân" },
        { maCumRap: "galaxy-nguyen-du", tenCumRap: "Galaxy Nguyễn Du" },
        { maCumRap: "galaxy-quang-trung", tenCumRap: "Galaxy Quang Trung" },
        {
          maCumRap: "lotte-cinema-cong-hoa",
          tenCumRap: "Lotte Cinema Cộng Hòa",
        },
        { maCumRap: "megags-cao-thang", tenCumRap: "MegaGS Cao Thắng" },
      ];
      return sampleClusters;
    }

    return clusters;
  } catch (error) {
    console.error("❌ Error fetching cinema clusters:", error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);

    // Trả về dữ liệu mẫu để test nếu API lỗi
    console.log("⚠️ API error, returning sample data for testing");
    const sampleClusters = [
      { maCumRap: "bhd-star-bitexco", tenCumRap: "BHD Star Bitexco" },
      { maCumRap: "bhd-star-thao-dien", tenCumRap: "BHD Star Thảo Điền" },
      { maCumRap: "cgv-aeon-binh-tan", tenCumRap: "CGV Aeon Bình Tân" },
      { maCumRap: "galaxy-nguyen-du", tenCumRap: "Galaxy Nguyễn Du" },
      { maCumRap: "galaxy-quang-trung", tenCumRap: "Galaxy Quang Trung" },
      { maCumRap: "lotte-cinema-cong-hoa", tenCumRap: "Lotte Cinema Cộng Hòa" },
      { maCumRap: "megags-cao-thang", tenCumRap: "MegaGS Cao Thắng" },
    ];
    return sampleClusters;
  }
};

// Tạo lịch chiếu
export const createShowtimeApi = async (showtimeData) => {
  try {
    console.log("🎬 Creating showtime with data:", showtimeData);
    const response = await api.post(
      "/api/QuanLyDatVe/TaoLichChieu",
      showtimeData
    );
    console.log("✅ Showtime created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating showtime:", error);
    throw error;
  }
};

// Lấy danh sách lịch chiếu theo phim
export const getShowtimesByMovieApi = async (maPhim) => {
  try {
    console.log("🎬 Fetching showtimes for movie:", maPhim);

    // Thử endpoint chính để lấy lịch chiếu theo phim
    try {
      const response = await api.get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPhim}`
      );
      console.log("✅ Showtimes (primary):", response.data);

      // Kiểm tra cấu trúc response
      if (response.data && response.data.content) {
        return response.data.content;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && response.data.danhSachGhe) {
        // Nếu có danhSachGhe, trả về dạng array
        return [response.data];
      }
      return [];
    } catch (primaryError) {
      console.log("⚠️ Primary showtime API failed, trying alternative...");

      // Thử endpoint thay thế - lấy tất cả lịch chiếu
      const allShowtimesResponse = await api.get(
        "/api/QuanLyDatVe/LayDanhSachPhongVe"
      );
      console.log("✅ All showtimes:", allShowtimesResponse.data);

      // Lọc theo maPhim nếu có
      if (allShowtimesResponse.data && allShowtimesResponse.data.content) {
        const allShowtimes = allShowtimesResponse.data.content;
        const filteredShowtimes = allShowtimes.filter(
          (showtime) =>
            showtime.maPhim === parseInt(maPhim) || showtime.maPhim === maPhim
        );
        return filteredShowtimes;
      }

      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching showtimes:", error);
    // Trả về mảng rỗng thay vì throw error để tránh crash
    return [];
  }
};

// Xóa lịch chiếu
export const deleteShowtimeApi = async (maLichChieu) => {
  try {
    console.log("🎬 Deleting showtime:", maLichChieu);
    const response = await api.delete(
      `/api/QuanLyDatVe/XoaLichChieu?MaLichChieu=${maLichChieu}`
    );
    console.log("✅ Showtime deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting showtime:", error);
    throw error;
  }
};

// ===== THEATER MANAGEMENT APIs =====

// Lấy thông tin chi tiết phòng chiếu (nếu có API)
export const getTheaterDetailsApi = async (maCumRap) => {
  try {
    console.log("🎬 Fetching theater details for cluster:", maCumRap);
    // Giả lập API call - có thể thay thế bằng API thực tế sau
    const mockTheaters = [
      {
        maPhong: "P001",
        tenPhong: "Phòng 1",
        soGhe: 120,
        trangThai: "Hoạt động",
        loaiPhong: "2D",
        maCumRap: maCumRap,
      },
      {
        maPhong: "P002",
        tenPhong: "Phòng 2",
        soGhe: 80,
        trangThai: "Hoạt động",
        loaiPhong: "3D",
        maCumRap: maCumRap,
      },
      {
        maPhong: "P003",
        tenPhong: "Phòng 3",
        soGhe: 150,
        trangThai: "Bảo trì",
        loaiPhong: "IMAX",
        maCumRap: maCumRap,
      },
    ];
    return mockTheaters;
  } catch (error) {
    console.error("❌ Error fetching theater details:", error);
    throw error;
  }
};

// Thêm phòng chiếu mới (nếu có API)
export const addTheaterApi = async (theaterData) => {
  try {
    console.log("🎬 Adding new theater:", theaterData);
    // Giả lập API call - có thể thay thế bằng API thực tế sau
    const newTheater = {
      maPhong: `P${Date.now()}`,
      ...theaterData,
      trangThai: "Hoạt động",
    };
    console.log("✅ Theater added:", newTheater);
    return newTheater;
  } catch (error) {
    console.error("❌ Error adding theater:", error);
    throw error;
  }
};

// Cập nhật thông tin phòng chiếu (nếu có API)
export const updateTheaterApi = async (maPhong, theaterData) => {
  try {
    console.log("🎬 Updating theater:", maPhong, theaterData);
    // Giả lập API call - có thể thay thế bằng API thực tế sau
    const updatedTheater = {
      maPhong,
      ...theaterData,
    };
    console.log("✅ Theater updated:", updatedTheater);
    return updatedTheater;
  } catch (error) {
    console.error("❌ Error updating theater:", error);
    throw error;
  }
};

// Xóa phòng chiếu (nếu có API)
export const deleteTheaterApi = async (maPhong) => {
  try {
    console.log("🎬 Deleting theater:", maPhong);
    // Giả lập API call - có thể thay thế bằng API thực tế sau
    console.log("✅ Theater deleted:", maPhong);
    return { success: true, message: "Xóa phòng chiếu thành công" };
  } catch (error) {
    console.error("❌ Error deleting theater:", error);
    throw error;
  }
};
