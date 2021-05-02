import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'antd/dist/antd.css';

import AddPlayer from "./components/AddPlayer";
import Player from "./components/Player";
import PlayersList from "./components/PlayersList";
import AntModal from './components/common/modal';

function App() {
  const [visible, setvisible] = React.useState(false);
  const showModal = () => {
    setvisible(true);
  }
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
            <a onClick={showModal} href="#addPlayer" className="btn btn-link">
              Add
            </a>
          </li>
        </div>
      </nav>

      <div style={{padding: "10px"}}>
        <Switch>
          <Route exact path={["/", "/players"]} component={PlayersList} />
          <Route path="/players/:id" component={Player} />
        </Switch>
        <AntModal visible={visible} setvisible={setvisible} title="Add Players">
          <AddPlayer/>
        </AntModal>
      </div>
    </Router>
  );
}

export default App;