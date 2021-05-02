import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlayer } from "../actions/players";
import { Row, Col} from 'antd';

const AddPlayer = () => {
  const initialPlayerState = {
    id: null,
    name: "",
    email: "",
    mobile: "",
    dob: "",
    age: "",
    gender: "",
    role: "",
    batting_style: "",
    bowling_style: ""
  };
  const [player, setPlayer] = useState(initialPlayerState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const savePlayer = () => {
    const { name, email, mobile, dob, age, gender, role, batting_style, bowling_style } = player;

    dispatch(createPlayer(name, email, mobile, dob, age, gender, role, batting_style, bowling_style))
      .then(data => {
        setPlayer({
          id: data.id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          dob: data.dob,
          age: data.age,
          gender: data.gender,
          role: data.role,
          batting_style: data.batting_style,
          bowling_style: data.bowling_style
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPlayer = () => {
    setPlayer(initialPlayerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPlayer}>
            Add
          </button>
        </div>
      ) : (
        <>
        <Row>
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={player.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
          </Col>
          
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={player.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                required
                value={player.mobile}
                onChange={handleInputChange}
                name="mobile"
              />
            </div>
          </Col>
          
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                required
                value={player.gender}
                onChange={handleInputChange}
                name="gender"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                required
                value={player.age}
                onChange={handleInputChange}
                name="age"
              />
            </div>
          </Col>
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                required
                value={player.dob}
                onChange={handleInputChange}
                name="dob"
              />
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                required
                value={player.role}
                onChange={handleInputChange}
                name="role"
              />
            </div>
          </Col>
          <Col span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="batting_style">Batting Style</label>
              <input
                type="text"
                className="form-control"
                id="batting_style"
                required
                value={player.batting_style}
                onChange={handleInputChange}
                name="batting_style"
              />
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col  span={12} style={{padding: "5px"}}>
            <div className="form-group">
              <label htmlFor="bowling_style">Bowling Style</label>
              <input
                type="text"
                className="form-control"
                id="bowling_style"
                required
                value={player.bowling_style}
                onChange={handleInputChange}
                name="bowling_style"
              />
            </div>
          </Col>
        </Row>
        
        <button onClick={savePlayer} className="btn btn-success">
          Submit
        </button>
        </>
      )}
    </div>
  );
};

export default AddPlayer;