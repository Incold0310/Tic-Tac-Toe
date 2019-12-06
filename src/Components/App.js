import React from 'react';
import Board from './Board.js';
import '../style.css';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    this.props.checkWin();
    let status = `Next player: ${this.props.isO ? 'X' : 'O'}`;
    if (this.props.win == 'DRAW!') {
      status = `${this.props.win}`;
    }
    else if (this.props.win) {
      status = `Winner: ${this.props.win}`;
    }

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board squareValue={this.props.squareValue} squareClass="square" click={this.props.changeValue}/>
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>
              {this.props.history.boards.map((board,i)=>{
                return <li key={i} className="historyStep" onClick={()=>{this.props.returnToStep(i)}}><div>
                    <h5>Ход: {this.props.history.stepValue[i]}</h5>
                    <Board squareValue={board} squareClass="squareInHistory" click={()=>{return;}}/>
                    </div>
                    <br />
                    </li>
              })}
            </ol>
          </div>
        </div>
        <div>
          <br />
          <button className="atFirst" onClick={this.props.atFirst}>At first</button>
          </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isO: state.oIsNext,
    win: state.winner,
    history: state.history,
    squareValue: state.squaresValue,
  }),
  dispatch => ({
    returnToStep(step) {
      dispatch({type:'RETURN_TO_LAST_STEP', step:step})
    },
    atFirst() {
      dispatch({type:'AT_FIRST'})
    },
    checkWin () {
      dispatch({type:'CHECK_WIN'});
    },
    changeValue (i) {
      dispatch({type:'CLICK_ON_FIELD', index: i});
    }
  })
)(App);
