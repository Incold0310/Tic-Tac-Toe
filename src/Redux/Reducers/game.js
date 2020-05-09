const initialState = {
  squaresValue: [],
  currentPlayer: '',
  gameStatus: null,
  moveCount: 1
};

export default function game(state=initialState, action) {

  switch (action.type) {
    case 'SET_SQUARE_VALUE':
    case 'NEW_GAME':
      return {
        ...state,
        squaresValue: [...action.values],
        currentPlayer: action.nextPlayer,
        gameStatus: action.status,
        moveCount: action.moveCount
      }
      break;
    case 'RETURN_TO_MOVE':
        return {
          ...state,
          squaresValue: [...action.oldArr],
          currentPlayer: action.oldPlayer,
          moveCount: action.moveCount
        }
        break;
    case 'CLEAR_GAME':
        return {
          ...state,
          squaresValue: [],
          currentPlayer: '',
          moveCount: 1,
          gameStatus: null
        }
        break;
    default:
      return state;
  }
}
