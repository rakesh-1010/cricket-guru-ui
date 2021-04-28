import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePlayers,
  findPlayersByTitle,
  deleteAllPlayers,
} from "../actions/players";
import { Link } from "react-router-dom";

import {Tag, Divider, Descriptions, Row, Col} from 'antd';

import AttendanceCalendar from "./AttendanceCalendar";



const PlayersList = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const players = useSelector(state => state.players);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePlayers());
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentPlayer(null);
    setCurrentIndex(-1);
  };

  const setActivePlayer = (player, index) => {
    setCurrentPlayer(player);
    setCurrentIndex(index);
  };

  const removeAllPlayers = () => {
    dispatch(deleteAllPlayers())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findPlayersByTitle(searchTitle));
  };

  const COLORS = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ]
  const renderSkills = () => {
    let skills = [];
    let randomColor;
    currentPlayer.skills.forEach((skill, index) => {
      randomColor = COLORS[Math.floor(Math.random()*COLORS.length)];
      skills.push(
        <Tag color={randomColor} key={index}>{skill.name}</Tag>
      )
    });
    return skills;
  }

  const onPanelChange= (value, mode) =>{
    console.log(value, mode);
  }

  return (
    <>
      <Row>
        <Col span="12" style={{border: "1px solid rgba(0,0,0,.125)", borderRight: "none", padding: "10px"}}>
          <Divider orientation="left">Players List</Divider>
          <Col span="12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </Col>

          <ul className="list-group">
            {players &&
              players.map((player, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActivePlayer(player, index)}
                  key={index}
                >
                  {`${player.name}, ${player.age}, ${player.role}`}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllPlayers}
          >
            Remove All
          </button>
        </Col>
        <Col span="12" style={{border: "1px solid rgba(0,0,0,.125)", padding: "10px"}}>
          {currentPlayer ? (
            <div>
              <Divider orientation="left">Details</Divider>
              <Descriptions>
                <Descriptions.Item label="Name">{currentPlayer.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{currentPlayer.email}</Descriptions.Item>
                <Descriptions.Item label="Mobile">{currentPlayer.mobile}</Descriptions.Item>
                <Descriptions.Item label="Dob">{currentPlayer.dob}</Descriptions.Item>
                <Descriptions.Item label="Age">{currentPlayer.age}</Descriptions.Item>
                <Descriptions.Item label="Gender">{currentPlayer.gender}</Descriptions.Item>
                <Descriptions.Item label="Role">{currentPlayer.role}</Descriptions.Item>
                <Descriptions.Item label="Batting Style">{currentPlayer.batting_style}</Descriptions.Item>
                <Descriptions.Item label="Bowling Style">{currentPlayer.bowling_style}</Descriptions.Item>
              </Descriptions>
        
              <Divider orientation="left">Skills</Divider>
              <div style={{lineHeight: 3}}>
                {renderSkills()}
              </div>
              <Divider orientation="left">Attendance & Fees Tracker</Divider>
              <AttendanceCalendar />

              <Divider orientation="left">Actions</Divider>
              <Link
                to={"/players/" + currentPlayer.id}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Player...</p>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PlayersList;