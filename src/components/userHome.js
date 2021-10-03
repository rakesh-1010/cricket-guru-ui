import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

import {Tag} from 'antd';

import PlayerDataService from "../services/player.service";
import PlayerDetails from "./PlayerDetails";

const UserHome = () => {
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

export default UserHome;