import React from "react";
import ReactDOM from "react-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./components/FavoritesContext";
import { BrowserRouter as Router } from "react-router-dom";



ReactDOM.render(
  <FavoritesProvider>
    <Router>
      <App />
    </Router>
  </FavoritesProvider>,
  document.getElementById("root")
);