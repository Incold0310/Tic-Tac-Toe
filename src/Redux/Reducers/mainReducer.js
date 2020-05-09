import {combineReducers} from 'redux';
import gameParameters from './gameParameters.js';
import game from './game.js';
import moveHistory from './moveHistory';


export default combineReducers({
  gameParameters,
  game,
  moveHistory
});
