export const newGame = () => {
  return (dispatch, getState) => {
    let width = getState().gameParameters.fieldWidth;
    let height = getState().gameParameters.fieldHeight;

    dispatch({type: 'CLEAR_HISTORY'});

    return dispatch({
      type:'NEW_GAME',
      values: [...Array(height)].map(() => Array(width).fill(null)),
      nextPlayer: 'O',
      moveCount: 1,
      status: null});
  }
}
