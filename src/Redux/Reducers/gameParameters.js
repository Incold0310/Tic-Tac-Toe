const initialState = {
  fieldHeight: 0,
  fieldWidth: 0,
  winCombinationLength: 0,
  playersSymbols: [],
  symbolsPerTurn: 0,
  mode: ''
};


export default function gameParameters(state=initialState, action) {

  switch (action.type) {
    case 'SET_GAME_PARAMETERS':
      return {
        ...state,
        fieldHeight: action.height,
        fieldWidth: action.width,
        winCombinationLength: action.combLength,
        playersSymbols: [...action.symbols],
        symbolsPerTurn: action.symbolsCol,
        mode: action.mode
      }
      break;
    case 'CLEAR_PARAMETERS':
      return {
        ...state,
        fieldHeight: 0,
        fieldWidth: 0,
        winCombinationLength: 0,
        playersSymbols: [],
        symbolsPerTurn: 0,
        mode: ''
      }
      break;
    default:
      return state;
  }
}
