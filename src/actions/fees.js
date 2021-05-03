import {
    CREATE_FEE,
    UPDATE_FEE
  } from "./types";
  
  import PlayerDataService from "../services/player.service";
  
  export const createFees = (player_id, month, status, amount) => async (dispatch) => {
    try {
      const res = await PlayerDataService.createFee({ player_id, month, status, amount });
  
      dispatch({
        type: CREATE_FEE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateFees = (id, data) => async (dispatch) => {
    try {
      const res = await PlayerDataService.updateFee( id, data );
  
      dispatch({
        type: UPDATE_FEE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };