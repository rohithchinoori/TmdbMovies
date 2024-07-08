import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

const CastDetails = (props) => {
  const [cast, setCast] = useState([]);
  const { movie_id } = props;
  const Api_key = "05817721ecae6167c0894a2eeb0ea58c";

  useEffect(() => {
    const fetchCast = async () => {
      if (movie_id) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
          );
          setCast(response.data.cast);
          console.log(response.data.cast);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    fetchCast();
  }, [movie_id]);

  return (
    <div>
      {cast.length > 0 ? (
        <ul className="cast-details">
          {cast.map((member) => (
            <li key={member.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                className="cast-img"
              />
              <p>
                {member.name} as {member.character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast details available.</p>
      )}
    </div>
  );
};

export default CastDetails;
