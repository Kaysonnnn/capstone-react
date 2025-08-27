import { Route } from "react-router-dom";
import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import OrderMovie from "../pages/HomeTemplate/OrderMovie";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";
import TheaterPage from "../pages/HomeTemplate/TheaterPage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";

import AdminTemplate from "../pages/AdminTemplate/admin";
import Dashboard from "../pages/AdminTemplate/DashBoard/dasb_board";
import AddUser from "../pages/AdminTemplate/AddUser/add_user";
import AddMovie from "../pages/AdminTemplate/AddMovie/add_movie";
import EditMovie from "../pages/AdminTemplate/EditMovie/edit_movie";
import MovieManagement from "../pages/AdminTemplate/MoiveManagement/movie_managenment";
import UserManagement from "../pages/AdminTemplate/UserManagement/user_management";
import EditUser from "../pages/AdminTemplate/EditUser/edit_user";
import CreateShowtime from "../pages/AdminTemplate/CreateShowtime/create_showtime";
import TheaterManagement from "../pages/AdminTemplate/TheaterManagement/theater_management";
import ShowtimeManagement from "../pages/AdminTemplate/ShowtimeManagement/showtime_management";
import AddTheater from "../pages/AdminTemplate/TheaterManagement/AddTheater/add_theater";
import AuthPage from "../pages/AdminTemplate/AuthPage/auth_page";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "/about",
        element: AboutPage,
      },
      {
        path: "/list-movie",
        element: ListMoviePage,
      },
      {
        path: "/order-movie",
        element: OrderMovie,
      },
      {
        path: "/theaters",
        element: TheaterPage,
      },
      {
        path: "/login",
        element: LoginPage,
      },
      {
        path: "/register",
        element: RegisterPage,
      },
      {
        path: "movie-details/:movieId",
        element: MovieDetailsPage,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      {
        path: "",
        element: Dashboard,
      },
      {
        path: "dashboard",
        element: Dashboard,
      },
      {
        path: "add-user",
        element: AddUser,
      },
      {
        path: "movie-management",
        element: MovieManagement,
      },
      {
        path: "add-movie",
        element: AddMovie,
      },
      {
        path: "movie-management/edit/:maPhim",
        element: EditMovie,
      },
      {
        path: "edit-movie/:maPhim",
        element: EditMovie,
      },
      {
        path: "user-management",
        element: UserManagement,
      },
      {
        path: "user-management/edit/:taiKhoan",
        element: EditUser,
      },
      {
        path: "edit-user/:taiKhoan",
        element: EditUser,
      },
      {
        path: "create-showtime/:maPhim",
        element: CreateShowtime,
      },
      {
        path: "theater-management",
        element: TheaterManagement,
      },
      {
        path: "theater-management/add-theater/:maCumRap",
        element: AddTheater,
      },
      {
        path: "showtime-management",
        element: ShowtimeManagement,
      },
      {
        path: "analytics",
        element: () => (
          <Placeholder
            title="Thống kê & Báo cáo"
            description="Xem báo cáo doanh thu và thống kê"
          />
        ),
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
];

export const generateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
