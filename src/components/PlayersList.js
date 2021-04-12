import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePlayers,
  findPlayersByTitle,
  deleteAllPlayers,
} from "../actions/players";
import { Link } from "react-router-dom";

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
        <h4>Players List</h4>

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
            <h4>Player</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPlayer.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPlayer.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPlayer.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/players/" + currentPlayer.id}
              className="badge badge-warning"
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