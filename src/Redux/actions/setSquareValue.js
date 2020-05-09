import { addMove } from './addMove';

function gameStatus(array, winLength, symbol, location) {
  let count = {
    column: 1,
    row: 1,
    diagonal_toRight: 1,
    diagonal_toLeft: 1
  }
  let status = null;
  let indexArray = [];

  let sliceLength = null;

  if (array.every(item => !item.includes(null))) return status = 'НИЧЬЯ!';

  // Чтобы не пробегать по всему полю (а оно может быть 100х100), нужно создать квадрат от того места, где кликнули (location),
  // размером winLength*2-1 x winLength*2-1 (т.к. последовательность может тянуться во все стороны)
  // С учётом того, чтобы не вылезти за пределы основного квадрата
  for (let i = 0; i < winLength*2-1; i++) {
    let checkCorrectIndex_Y = location[0]+winLength-1-i < 0 || location[0]+winLength-1-i > array.length-1
      ? null
      : location[0]+winLength-1-i;
    let checkCorrectIndex_X_end = location[1]+winLength > array[0].length ? array[0].length : location[1]+winLength;
    let checkCorrectIndex_X_start = location[1]-winLength+1 < 0 ? 0 : location[1]-winLength+1;
    if (checkCorrectIndex_Y == null) continue;
    let sliceArr = array[checkCorrectIndex_Y].slice(checkCorrectIndex_X_start, checkCorrectIndex_X_end);
    if (!sliceLength) sliceLength = sliceArr.length;
    indexArray = [...indexArray, ...sliceArr];
  }
  // Уберём из массива, всё кроме текущего символа и преобразуем символы в их индекс
  indexArray = indexArray.map(
    (item, index) => item == symbol ? index : null
  ).filter(
    item => item != null
  )

  // Теперь проверим находятся ли символы рядом (в строке, столбце или по диогонали)
  for (var i = 0; i < indexArray.length; i++) {
    if (Object.values(count).some(item => item >= winLength)) {
      status = `Победил игрок: ${symbol}`;
      break;
    }

    if (i == indexArray.length-1) { // "Обнуляем" все счётчики
      for (let key in count) {
        count[key] = 1;
      }
      break;
    }

    // Условие indexArray[i+1]%sliceLength!=0, нужно, чтобы фиксить такие случаи (для 3х3): 1,2,3
    // вроде всё хорошо, но если вспомнить, что нумерация начинается с 0, то станет понятно, что символ с индексом 3 находится на другой строке
    if (indexArray[i] == indexArray[i+1]-1 && indexArray[i+1]%sliceLength!=0) {
      count.row++;
    }
    // Если здесь не поставить else, то возможна, например, такая ситуация (для 3x3): 1,2,7,8 => count.row = 3
    else {
      count.row = 1;
    }

    if (indexArray.filter(item => item%sliceLength==indexArray[i]).length == winLength) {
      count.column = winLength;
    }

    // Здесь условия indexArray[i]%(sliceLength+/-1)==0) необходимы чтобы отбрасывать индексы, через которые не может пройти диогональ длиной winLength
    if (indexArray.includes(indexArray[i]+sliceLength+1) && indexArray[i]%(sliceLength+1)==0) {
      count.diagonal_toLeft++;
    }

    if (indexArray.includes(indexArray[i]+sliceLength-1) && indexArray[i]%(sliceLength-1)==0) {
    // Тут нужно ещё одно условие, т.к. существует уникальная ситуация только! для поля 3x3, когда индексы равны: 0, 2, 4 или 4, 6, 8
    // Для таких ситуаций произойдёт победа, но её не должно быть, поэтому приходится прибегнуть к такому костылю, т.к. пока, к сожалению, не придумал как обойти эту ситуацию
      if (sliceLength == 3 && (indexArray[i] == 0 || indexArray[i]+sliceLength-1 == 8)) continue;
      else count.diagonal_toRight++;
    }
  }

  return status;
}



export const setSquareValue = (num, value) => {
  return (dispatch, getState) => {

    if (value) return;

    if (num === undefined) {
      let width = getState().gameParameters.fieldWidth;
      let height = getState().gameParameters.fieldHeight;
      return dispatch({
        type:'NEW_GAME',
        values: [...Array(height)].map(() => Array(width).fill(null)),
        nextPlayer: 'O',
        moveCount: 1,
        status: null});
    }
    else {
      let playersSymbols = getState().gameParameters.playersSymbols;
      let move = getState().game.moveCount;
      let symbolsPerTurn =  getState().gameParameters.symbolsPerTurn;
      let array = getState().game.squaresValue.map(row => [...row]);
      let currentPlayer = getState().game.currentPlayer;

      array[num[0]][num[1]] = currentPlayer;
      dispatch(addMove(currentPlayer, num, {array: array, currentPlayer: currentPlayer, moveCount: move}));

      let nextPlayer;
      let index = playersSymbols.indexOf(currentPlayer);

      if (symbolsPerTurn == 1) {
        nextPlayer = index == playersSymbols.length-1 ? playersSymbols[0] : playersSymbols[index+1]
      }
      else {
        nextPlayer = index == playersSymbols.length-1 && move == symbolsPerTurn
                      ? playersSymbols[0] : move != symbolsPerTurn
                      ? currentPlayer : playersSymbols[index+1]
      }

      let status = gameStatus(array, getState().gameParameters.winCombinationLength, currentPlayer, num);

      return dispatch({
        type:'SET_SQUARE_VALUE',
        values: [...array],
        status: status,
        nextPlayer: nextPlayer,
        moveCount: move == symbolsPerTurn ? 1 : move+=1
       })
    }
  }
}
