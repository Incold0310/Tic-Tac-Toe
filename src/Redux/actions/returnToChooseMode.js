export const returnToChooseMode = () => {
  return (dispatch) => {
    dispatch({type: 'CLEAR_GAME'});
    dispatch({type: 'CLEAR_HISTORY'});
    dispatch({type: 'CLEAR_PARAMETERS'});
  }
}
