import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Toprated from "./components/Toprated";
import Upcoming from "./components/Upcoming";
import MovieDetail from "./components/MovieDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rated" element={<Toprated />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/detail/:movie_id" element={<MovieDetail />} />
    </Routes>
  </Router>
);

export default App;
