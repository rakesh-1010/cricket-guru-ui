import { combineReducers } from "redux";
import players from "./players";
import skills from "./skills";

export default combineReducers({
  players,
  skills
});