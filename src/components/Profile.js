import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import {Tag} from 'antd';

import PlayerDataService from "../services/player.service";
import PlayerDetails from "./PlayerDetails";

const Profile = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const [showPlayerBoard, setShowPlayerBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  const showDetailsModal = () => {
    setDetailsVisible(true);
  }

  const showSkillsModal = () => {
    setSkillsVisible(true);
  }

  const getPlayer = id => {
    PlayerDataService.get(id)
      .then(response => {
        setCurrentPlayer(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (currentUser) {
      setShowPlayerBoard(currentUser.roles.includes("ROLE_PLAYER"));
      if(currentUser.roles.includes("ROLE_PLAYER")){
        getPlayer(currentUser.player.id);
      }
    }
  }, [currentUser]);

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

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      </header>
      
      {showPlayerBoard && (
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
          colWidth={"24"}
        />
      )}
    </div>
  );
};

export default Profile;