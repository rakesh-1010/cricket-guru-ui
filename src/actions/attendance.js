import {
    CREATE_ATTENDANCE,
    UPDATE_ATTENDANCE
  } from "./types";
  
  import PlayerDataService from "../services/player.service";
  
  export const createAttendance = (player_id, date, status) => async (dispatch) => {
    try {
      const res = await PlayerDataService.createAttendance({ player_id, date, status });
  
      dispatch({
        type: CREATE_ATTENDANCE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateAttendance = (id, player_id, date, status) => async (dispatch) => {
    try {
      const res = await PlayerDataService.updateAttendance({ id, player_id, date, status });
  
      dispatch({
        type: UPDATE_ATTENDANCE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };