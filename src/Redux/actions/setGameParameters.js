export const setGameParameters = (gameMode, userMode = [3, 3, 2, 3, 1]) => {

  const symbols = ['O','X','#','+','::','%'];
  switch (gameMode) {
    case "Классический":
      return ({
        type: 'SET_GAME_PARAMETERS',
        height: 3,
        width: 3,
        combLength: 3,
        symbols: symbols.slice(0, 2),
        symbolsCol: 1,
        mode: gameMode
      })
      break;
    case "Connect6":
      return ({
        type: 'SET_GAME_PARAMETERS',
        height: 19,
        width: 19,
        combLength: 6,
        symbols: symbols.slice(0, 2),
        symbolsCol: 2,
        mode: gameMode
      })
      break;
    case "Свой режим":
      return ({
          type: 'SET_GAME_PARAMETERS',
          height: userMode[0],
          width: userMode[1],
          combLength: userMode[3],
          symbols: symbols.slice(0, userMode[2]),
          symbolsCol: userMode[4],
          mode: gameMode
      })
      break;
  }

}
