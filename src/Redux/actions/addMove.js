export const addMove = (currentPlayer, location, gameState) => {
  return ({
    type: 'ADD_MOVE',
    move: `Ходит "${currentPlayer}" на позицию [${location.map(item => item+1)}]`,
    gameState: gameState
  })
}
