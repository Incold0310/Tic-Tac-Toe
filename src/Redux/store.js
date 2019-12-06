import {createStore} from 'redux';

const initialState = {
  squaresValue: Array(9).fill(null),
  oIsNext: false,
  currentValue: 'O',
  winner: null,
  history: {
    boards: [],
    stepValue: []
  }
};

function paintWinCombination(array) {
  let winCombination = document.querySelectorAll('.square');
  for (let i of array) {
    winCombination[i].style.color = 'red';
  }
}

function clearStyle() {
  let squares = document.querySelectorAll('.square');
  for (let i of squares) {
    i.style.color = 'black';
  }
}

function app(state = initialState, action) {

  if (action.type==='CLICK_ON_FIELD') {
    let newArr = [...state.squaresValue];
    let currentValue_copy;
    let oIsNext_copy = state.oIsNext;
    let win;

    if (state.winner || newArr[action.index]) {
      return state;
    }

    newArr[action.index] = state.currentValue;

    for (let i of newArr) {
      win = 'DRAW!';
      if (!i) {
        win = null;
        break;
      }
    }

    if (oIsNext_copy) currentValue_copy = 'O';
    else currentValue_copy = 'X';
    oIsNext_copy = !oIsNext_copy;

    return {
      ...state,
      squaresValue: newArr,
        oIsNext: oIsNext_copy,
        currentValue: currentValue_copy,
        winner: win,
        history: {
          boards: [...state.history.boards, newArr],
          stepValue: [...state.history.stepValue, state.currentValue]
        }
    };
  }


  if (action.type==='CHECK_WIN') {
    let win;
    let winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i of winCombinations) {
      let [a, b, c] = i;
      if (state.squaresValue[a] && state.squaresValue[a] === state.squaresValue[b] && state.squaresValue[a] === state.squaresValue[c]) {
        win = state.squaresValue[a];
        paintWinCombination([a,b,c]);
        return {
          ...state,
          winner: win
        }
      }
    };
  }


  if (action.type==='RETURN_TO_LAST_STEP') {
    let newHistoryBoard = [...state.history.boards].slice(0, action.step + 1);
    let newHistoryStepValue = [...state.history.stepValue].slice(0, action.step + 1);
    let valueOnStep = newHistoryStepValue[action.step];
    let newOIsNext;
    if (valueOnStep == 'O') {
      valueOnStep = 'X';
      newOIsNext = true;
    } else {
      valueOnStep = 'O';
      newOIsNext = false;
    }
    if (state.winner) {
      clearStyle();
    }
    return {
      ...state,
      squaresValue: newHistoryBoard[action.step],
        currentValue: valueOnStep,
        oIsNext: newOIsNext,
        winner: null,
        history: {
          boards: newHistoryBoard,
          stepValue: newHistoryStepValue
        }
    };
  }

  if (action.type==='AT_FIRST') {
    if (state.winner) {
      clearStyle();
    }
    return state=initialState;
  }

  return state;
}

const store = createStore(app);

export default store;
