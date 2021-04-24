import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePlayers,
  findPlayersByTitle,
  deleteAllPlayers,
} from "../actions/players";
import { Link } from "react-router-dom";

import {Tag, Divider, Descriptions} from 'antd';

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

  return (
    <div className="list row">
      <div className="col-md-8">
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
      </div>
      <div className="col-md-6">
        <Divider orientation="left">Players List</Divider>

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
      </div>
      <div className="col-md-6">
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
            <div>
              {renderSkills()}
            </div>
            <br/>
            <br/>
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
      </div>
    </div>
  );
};

export default PlayersList;