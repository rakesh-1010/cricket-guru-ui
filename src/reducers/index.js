import { combineReducers } from "redux";
import players from "./players";
import skills from "./skills";
import auth from "./auth";
import message from "./message";

export default combineReducers({
  players,
  skills,
  auth,
  message
});