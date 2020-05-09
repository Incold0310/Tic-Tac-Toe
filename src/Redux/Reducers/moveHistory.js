const initialState = {
  moveInfo: [],
  gameHistory: []
};

export default function moveHistory(state=initialState, action) {

  switch (action.type) {
    case 'ADD_MOVE':
      return {
        ...state,
        moveInfo: [...state.moveInfo, action.move],
        gameHistory: [...state.gameHistory, action.gameState]
      }
      break;
    case 'REPLACE_HISTORY':
      return {
        ...state,
        moveInfo: [...action.newMoveInfo],
        gameHistory: [...action.newGameHistory]
      }
      break;
    case 'CLEAR_HISTORY':
      return {
        ...state,
        moveInfo: [],
        gameHistory: []
        }
        break;
    default:
      return state;
  }
}
