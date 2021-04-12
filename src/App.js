import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPlayer from "./components/AddPlayer";
import Player from "./components/Player";
import PlayersList from "./components/PlayersList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/players" className="navbar-brand">
          cricGurus
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/players"} className="nav-link">
              Players
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/players"]} component={PlayersList} />
          <Route exact path="/add" component={AddPlayer} />
          <Route path="/players/:id" component={Player} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;