import { useNavigate } from "react-router-dom";

export default function Movie({ movie }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (movie?.maPhim) {
      navigate(`/movie-details/${movie.maPhim}`);
    }
  };

  if (!movie) return null;

  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={handleViewDetails}
    >
      <img 
        className="rounded-t-lg w-full h-64 object-cover" 
        src={movie.hinhAnh} 
        alt={movie.tenPhim}
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg'; // Fallback image
        }}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.tenPhim}
        </h5>
      </div>
    </div>
  );
}