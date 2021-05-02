import React, { useState, useEffect } from "react";
import { Select, Button, Alert } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { retrieveSkills, addSkillsToPlayer } from "../actions/players";


const AddSkills = (props) => {
    const { currentPlayer, currentPlayerSkillIds, setActivePlayer, index } = props;

    const [ selectedItems, setSelectedItems ] = useState([]);

    const [ message, setMessage] = useState("");
    
    const handleChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    };

    const skills = useSelector(state => state.skills);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(retrieveSkills());
    }, [dispatch]);

    const OPTIONS = skills;

    const addSkills = () => {
      let data = [];
      selectedItems.forEach(element => {
        data.push(
          {
            skillId: element,
            playerId: currentPlayer.id
          }
        )
      });

      dispatch(addSkillsToPlayer(data))
        .then(response => {
          console.log(response);
          setMessage("The Player Skill are updated successfully!");
          setActivePlayer(currentPlayer, index);
        })
        .catch(e => {
          console.log(e);
        });
        
    };
  
    return(

      <div>
        {message !== "" ? <Alert message={message} type="success" /> : null}
        <h4>Add Skills</h4>
        <Select
          mode="multiple"
          placeholder="Select Skills"
          value={selectedItems.length > 0 ? selectedItems : currentPlayerSkillIds}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {OPTIONS.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <br/>
        <br/>
        <Button type="primary" block onClick={addSkills}>
          Add
        </Button>
      </div>
    );
}

export default AddSkills;