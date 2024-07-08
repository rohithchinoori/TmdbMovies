import "./index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const Api_key = "05817721ecae6167c0894a2eeb0ea58c";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchQuery}&page=${currentPage}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${currentPage}`;

        const response = await axios.get(url);
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching the movies:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="home-bg">
        <div className="movie-list">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading &&
            movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <Link to={`/detail/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-img"
                  />
                </Link>
                <h2 className="title">{movie.title}</h2>
                <p className="rating">{movie.vote_average}</p>
              </div>
            ))}
        </div>
        <div className="pagination">
          {Array.from({ length: 10 }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
              disabled={loading}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
