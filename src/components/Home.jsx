import React from "react";
import Collections from "./Collections";
import "./homepage.css";

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
    </div>
  );
};

export default Homepage;
