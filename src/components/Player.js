import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePlayer, deletePlayer } from "../actions/players";
import PlayerDataService from "../services/player.service";

const Player = (props) => {
  const initialPlayerState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayerState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getPlayer = id => {
    PlayerDataService.get(id)
      .then(response => {
        setCurrentPlayer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPlayer(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPlayer({ ...currentPlayer, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentPlayer.id,
      title: currentPlayer.title,
      description: currentPlayer.description,
      published: status
    };

    dispatch(updatePlayer(currentPlayer.id, data))
      .then(response => {
        console.log(response);

        setCurrentPlayer({ ...currentPlayer, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePlayer(currentPlayer.id, currentPlayer))
      .then(response => {
        console.log(response);

        setMessage("The Player was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removePlayer = () => {
    dispatch(deletePlayer(currentPlayer.id))
      .then(() => {
        props.history.push("/players");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPlayer ? (
        <div className="edit-form">
          <h4>Player</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentPlayer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={currentPlayer.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              required
              value={currentPlayer.mobile}
              onChange={handleInputChange}
              name="mobile"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              required
              value={currentPlayer.gender}
              onChange={handleInputChange}
              name="gender"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              className="form-control"
              id="age"
              required
              value={currentPlayer.age}
              onChange={handleInputChange}
              name="age"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              required
              value={currentPlayer.dob}
              onChange={handleInputChange}
              name="dob"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              required
              value={currentPlayer.role}
              onChange={handleInputChange}
              name="role"
            />
          </div>

          <div className="form-group">
            <label htmlFor="batting_style">Batting Style</label>
            <input
              type="text"
              className="form-control"
              id="batting_style"
              required
              value={currentPlayer.batting_style}
              onChange={handleInputChange}
              name="batting_style"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bowling_style">Bowling Style</label>
            <input
              type="text"
              className="form-control"
              id="bowling_style"
              required
              value={currentPlayer.bowling_style}
              onChange={handleInputChange}
              name="bowling_style"
            />
          </div>

          </form>

          {currentPlayer.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removePlayer}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Player...</p>
        </div>
      )}
    </div>
  );
};

export default Player;
