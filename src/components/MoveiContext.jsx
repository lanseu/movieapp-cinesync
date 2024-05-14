// MovieContext.js
import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (movie) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, movie]);
  };

  return (
    <MovieContext.Provider value={{ playlist, addToPlaylist }}>
      {children}
    </MovieContext.Provider>
  );
};
