import api from "./api";

export const loginApi = async (values) => {
  // values: {taikhoan: "", matkhau: ""}
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};
