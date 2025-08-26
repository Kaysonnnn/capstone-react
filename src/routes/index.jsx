import { Route } from "react-router-dom";
import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import OrderMovie from "../pages/HomeTemplate/OrderMovie";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";

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
        path: "movie-details/:movieId",
        element: MovieDetailsPage,
      },


    ]
  }
]

export const generateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route key={item.path} path={item.path} element={<item.element />} />
          ))}
        </Route>
      );
    } else {
      return <Route key={route.path} path={route.path} element={<route.element />} />;
    }
  });
};
