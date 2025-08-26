import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {
  const { data, loading, error } = useSelector((state) => state.listMovieSlice);
  const dispatch = useDispatch();

   // Debug logs
  console.log("=== ListMoviePage Debug ===");
  console.log("loading:", loading);
  console.log("error:", error);
  console.log("data:", data);
  console.log("data type:", typeof data);
  console.log("is array:", Array.isArray(data));
  if (data) console.log("data length:", data.length);

  useEffect(() => {
    // call api
    dispatch(fetchListMovie());
  }, []);

  if (loading) return <p>Loading...</p>;

  const renderMovies = () => {
    if (data) {
      return data.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-10">{renderMovies()}</div>
    </div>
  );
}

