import React from 'react';

import AttendanceFeesCalendar from "./AttendanceFeesCalendar";
import { EditOutlined } from "@ant-design/icons";
import AntModal from "./common/modal";
import AddSkills from "./AddSkills";
import Player from './Player';
import {Divider, Descriptions, Col} from 'antd';

const PlayerDetails = (props) => {

    const { 
        currentPlayer, 
        showDetailsModal,
        detailsVisible,
        setDetailsVisible,
        showSkillsModal,
        skillsVisible,
        setSkillsVisible,
        renderSkills,
        setActivePlayer,
        index,
        colWidth
    } = props;

    return(
        <Col span={colWidth} style={{border: "1px solid rgba(0,0,0,.125)", padding: "10px"}}>
          {currentPlayer ? (
            <div>
              <Divider orientation="left">
                Details       
                <a href="#editDetails" onClick={showDetailsModal}> 
                  <EditOutlined/> 
                </a>
              </Divider>
              <AntModal visible={detailsVisible} setvisible={setDetailsVisible} title={"EDIT PLAYER DETAILS"} >
                <Player match={{params: {id: currentPlayer.id}}}/>
              </AntModal>
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
        
              <Divider orientation="left">
                Skills
                <a href="#editSkills" onClick={showSkillsModal}> 
                  <EditOutlined/> 
                </a>
              </Divider>
              { (currentPlayer && currentPlayer.skills.length === 0) &&
                  <p>No Skills added yet</p>
              }
              <AntModal visible={skillsVisible} setvisible={setSkillsVisible} title={"Add Skills"} >
                <AddSkills
                  currentPlayer={currentPlayer}
                  currentPlayerSkillIds={(currentPlayer && currentPlayer.skills.map(skill => skill.id)) || []}
                  setActivePlayer={setActivePlayer}
                  index={index}
                />
              </AntModal>
              <div style={{lineHeight: 3}}>
                {renderSkills()}
              </div>
              <Divider orientation="left">Attendance & Fees Tracker</Divider>

              <AttendanceFeesCalendar currentPlayer={currentPlayer}/>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Player...</p>
            </div>
          )}
        </Col>
    )

}

export default PlayerDetails;