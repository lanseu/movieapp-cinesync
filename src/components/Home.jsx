import React from "react";
import Collections from "./Collections";
import CurrentList from "./pages/CurrentList";

const Homepage = (props) => {
  return (
    <div className="home-container">
      <div className="collections-container">
        <Collections
          setActiveList={props.setActiveList}
          setActiveUrl={props.setActiveUrl}
          setMovieId={props.setMovieId}
        />
      </div>
      <div className="current-list-container">
        <CurrentList
          currentArr={props.currentArr}
          setMovieId={props.setMovieId}
        />
      </div>
    </div>
  );
};

export default Homepage;
