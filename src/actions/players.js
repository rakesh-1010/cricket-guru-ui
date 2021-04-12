import {
    CREATE_PLAYER,
    RETRIEVE_PLAYERS,
    UPDATE_PLAYER,
    DELETE_PLAYER,
    DELETE_ALL_PLAYERS
  } from "./types";
  
  import PlayerDataService from "../services/player.service";
  
  export const createPlayer = (name, email, mobile, dob, age, gender, role, batting_style, bowling_style) => async (dispatch) => {
    try {
      const res = await PlayerDataService.create({ name, email, mobile, dob, age, gender, role, batting_style, bowling_style });
  
      dispatch({
        type: CREATE_PLAYER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrievePlayers = () => async (dispatch) => {
    try {
      const res = await PlayerDataService.getAll();
  
      dispatch({
        type: RETRIEVE_PLAYERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updatePlayer = (id, data) => async (dispatch) => {
    try {
      const res = await PlayerDataService.update(id, data);
  
      dispatch({
        type: UPDATE_PLAYER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deletePlayer = (id) => async (dispatch) => {
    try {
      await PlayerDataService.delete(id);
  
      dispatch({
        type: DELETE_PLAYER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllPlayers = () => async (dispatch) => {
    try {
      const res = await PlayerDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_PLAYERS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findPlayersByTitle = (title) => async (dispatch) => {
    try {
      const res = await PlayerDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_PLAYERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };