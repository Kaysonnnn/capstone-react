import api from "./api";

export const getListMovieApi = async (
  maNhom,
  soTrang,
  soPhanTrangPhanTuTrenTrang
) => {
  try {
    const response = await api.get(
      `QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTrangPhanTuTrenTrang=${soPhanTrangPhanTuTrenTrang}=$`
    );
    // console.log(response);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetailsApi = async (movieId) => {
  try {
    const response = await api.get(
      `QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
