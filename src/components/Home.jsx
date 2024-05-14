// Homepage.jsx
import React from "react";
import Collections from "./Collections";
import MovieCarousel from "./MovieCarousel";
import "./homepage.css";

const Homepage = (props) => {
  return (
    <div className="home-container">
      <MovieCarousel />
      <div className="collections-container">
        <Collections
          setActiveList={props.setActiveList}
          setActiveUrl={props.setActiveUrl}
          setMovieId={props.setMovieId}
        />
      </div>
    </div>
  );
};
export default Homepage;