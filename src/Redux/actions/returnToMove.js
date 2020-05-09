import {newGame} from './newGame';

export const returnToMove = inputValue => {
  return (dispatch, getState) => {

    let gameHistory = getState().moveHistory.gameHistory;
    let moveInfo = getState().moveHistory.moveInfo;

    if (!gameHistory.length || !inputValue)  return;

    if (inputValue==1) return dispatch(newGame());

    dispatch({
      type: 'REPLACE_HISTORY',
      newMoveInfo: moveInfo.slice(0, inputValue-1),
      newGameHistory: gameHistory.slice(0, inputValue-1)
    })

    return dispatch({
      type: 'RETURN_TO_MOVE',
      oldArr: [...gameHistory[inputValue-2].array],
      oldPlayer: gameHistory[inputValue-1].currentPlayer,
      moveCount: gameHistory[inputValue-1].moveCount
    })
  }
}
