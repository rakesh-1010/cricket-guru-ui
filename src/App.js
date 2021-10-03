import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'antd/dist/antd.css';

import AddPlayer from "./components/AddPlayer";
import Player from "./components/Player";
import PlayersList from "./components/PlayersList";
import AntModal from './components/common/modal';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserHome from "./components/userHome.js";
import BoardUser from "./components/BoardUser";
import BoardCoach from "./components/BoardCoach";
import BoardAdmin from "./components/BoardAdmin";
import Profile  from "./components/user/profile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

function App() {
  const [visible, setvisible] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showCoachBoard, setShowCoachBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showPlayerBoard, setShowPlayerBoard] = useState(false);
  
  const showModal = () => {
    setvisible(true);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowCoachBoard(currentUser.roles.includes("ROLE_COACH"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowPlayerBoard(currentUser.roles.includes("ROLE_PLAYER"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/home"} className="navbar-brand">
            Home
        </Link>
        <div className="navbar-nav mr-auto">
          {showAdminBoard && (
            <>
              <li className="nav-item">
                <Link to={"/players"} className="nav-link">
                  Players List
                </Link>
              </li>
              <li className="nav-item">
                <a onClick={showModal} href className="nav-link">
                  Add Player
                </a>
              </li>
            </>
          )}
        </div>
        
        {currentUser ? (
            <div className="navbar-nav ml-auto">
               
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

      </nav>

      <div style={{padding: "10px"}}>
        <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/UserHome" component={UserHome} />
          <Route path="/user" component={BoardUser} />
          <Route path="/coach" component={BoardCoach} />
          <Route path="/admin" component={BoardAdmin} />
          <Route exact path={["/", "/players"]} component={PlayersList} />
          <Route path="/players/:id" component={Player} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <AntModal visible={visible} setvisible={setvisible} title="Add Players">
          <AddPlayer/>
        </AntModal>
      </div>
    </Router>
  );
}

export default App;