import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchInput.toLocaleLowerCase());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="nav-cont">
      <div className="logo-cont">
        <Link to="/">
          <h1 className="nav-head">MovieDb</h1>
        </Link>
      </div>
      <ul className="nav-ul">
        <Link to="/rated" className="link">
          <li>TopRated</li>
        </Link>
        <Link to="/upcoming" className="link">
          <li>Upcoming</li>
        </Link>
        <li>
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie..."
          />
        </li>
        <li>
          <button onClick={handleSearch}>Search</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
