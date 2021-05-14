import {
    CREATE_PLAYER,
    RETRIEVE_PLAYERS,
    UPDATE_PLAYER,
    DELETE_PLAYER,
    DELETE_ALL_PLAYERS,
    UPDATE_ATTENDANCE,
    GET_PLAYER,
  } from "../actions/types";
  
  const initialState = [];
  
  function playerReducer(players = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PLAYER:
        return [...players, payload];
  
      case RETRIEVE_PLAYERS:
        return payload;

      case GET_PLAYER:
        return {currentPlayer: payload}
  
      case UPDATE_PLAYER:
        return players.map((player) => {
          if (player.id === payload.id) {
            return {
              ...player,
              ...payload,
            };
          } else {
            return player;
          }
        });

      case UPDATE_ATTENDANCE:
        return players.map((player) => {
          if (player.id === payload.id) {
            return {
              ...player,
              ...payload,
            };
          } else {
            return player;
          }
        });
  
      case DELETE_PLAYER:
        return players.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_PLAYERS:
        return [];
  
      default:
        return players;
    }
  };
  
  export default playerReducer;