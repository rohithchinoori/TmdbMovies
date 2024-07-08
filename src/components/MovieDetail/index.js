import "./index.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import CastDetails from "../CastDetails";

const MovieDetail = () => {
  const { movie_id } = useParams();

  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const Api_key = "05817721ecae6167c0894a2eeb0ea58c";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
        );
        setDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        setError(
          "Network Error: Failed to fetch data. Please try again later."
        );
      }
    };

    if (movie_id) {
      fetchMovieDetail();
    }
  }, [movie_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="detail-bg">
        <div className="card">
          <div>
            <div className="sumary">
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt="poster"
                className="poster"
              />
              <div>
                <h2 className="detail-title">{detail.title}</h2>
                <p className="detail-rating">Rating: {detail.vote_average}</p>
                <p>
                  {detail.runtime} min{" "}
                  <span className="detail-rating">{detail.genres[0].name}</span>
                </p>
                <p>Released: {detail.release_date}</p>
              </div>
            </div>
            <p className="over-view">{detail.overview}</p>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.backdrop_path}`}
            alt="poster"
            className="poster1"
          />
        </div>
        <h1>Cast</h1>
        <CastDetails movie_id={movie_id} />
      </div>
    </>
  );
};

export default MovieDetail;
