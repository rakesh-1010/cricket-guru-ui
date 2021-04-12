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
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPlayer.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPlayer.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPlayer.published ? "Published" : "Pending"}
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
