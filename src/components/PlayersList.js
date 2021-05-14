import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePlayers,
  findPlayersByTitle,
  deleteAllPlayers,
} from "../actions/players";

import {Tag, Divider, Row, Col} from 'antd';

import PlayerDataService from "../services/player.service";
import PlayerDetails from "./PlayerDetails";

const PlayersList = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const players = useSelector(state => state.players);
  const dispatch = useDispatch();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const [showCoachBoard, setShowCoachBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showPlayerBoard, setShowPlayerBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  const showDetailsModal = () => {
    setDetailsVisible(true);
  }

  const showSkillsModal = () => {
    setSkillsVisible(true);
  }

  useEffect(() => {
    dispatch(retrievePlayers());
    if (currentUser) {
      setShowCoachBoard(currentUser.roles.includes("ROLE_COACH"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowPlayerBoard(currentUser.roles.includes("ROLE_PLAYER"));
    }
  }, [dispatch, currentUser]);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentPlayer(null);
    setCurrentIndex(-1);
  };

  const setActivePlayer = (player, index) => {
    PlayerDataService.get(player.id)
      .then(response => {
        setCurrentPlayer(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
    <>
      <Row>
        {showAdminBoard && (
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
        )}
        <PlayerDetails 
          currentPlayer={currentPlayer}
          showDetailsModal={showDetailsModal}
          detailsVisible={detailsVisible}
          setDetailsVisible={setDetailsVisible}
          showSkillsModal={showSkillsModal}
          skillsVisible={skillsVisible}
          setSkillsVisible={setSkillsVisible}
          renderSkills={renderSkills}
          setActivePlayer={setActivePlayer}
          index={currentIndex}
          colWidth={"12"}
        />
      </Row>
    </>
  );
};

export default PlayersList;