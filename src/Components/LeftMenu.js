import React from 'react';
import {connect} from 'react-redux';
import {returnToMove} from '../Redux/actions/returnToMove';
import {returnToChooseMode} from '../Redux/actions/returnToChooseMode';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null
    };
  }

  searchCell(move) {
    let nums = move.textContent.slice(1).match(/\d+/g).map(num => +num-1); // Находим все цифры, кроме первой (индекс)
    let cell = this.props.tbody.children[nums[0]].children[nums[1]];
    cell.classList.toggle('findCell');
    move.classList.toggle('choosedMove');
    if (cell.classList.contains('findCell')) cell.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
  }

  noLetters(e) {
    let regexp = /^\d*$/;
    if (!regexp.test(e.value)) e.value = e.value.slice(0,-1);
    if (e.value) this.setState({inputValue: e.value})
  }

  render() {
    let message = !this.props.gameStatus ? `Ходит игрок: ${this.props.currentPlayer}` : this.props.gameStatus;
    return (
      <div id="leftMenu" className="text-center pt-3 pl-0">
        <div className="mb-3">{message}</div>
        <div id="moveInfo" className="pt-1">
          <h4 className="mb-0">История ходов
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip>
                  Нажмите на ход, чтобы выделить его на поле. Чтобы снять выделение повторите нажатие.
                </Tooltip>
              }
            >
              <span className="ml-3"><i className="fa fa-question-circle-o"></i></span>
            </OverlayTrigger>
          </h4>
          <div className="moves mt-2 text-left pl-3" onClick={(e)=>this.searchCell(e.target)}>
            {this.props.moveInfo.map((item, index) =>
              <div className="move" key={index}>{index+1}. {item}</div>
            )}
          </div>
        </div>
        <div id="returnToMove">
          <span>Введите номер хода, к которому хотите вернуться</span>
          <div className="row mt-4">
            <div className="col">
              <input className="form-control ml-4" onInput={e => this.noLetters(e.target)}/>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
              <button className="btn btn-sm btn-outline-primary"
                      onClick={()=>this.props.returnMove(this.state.inputValue)}>Вернуться</button>
            </div>
          </div>

          <div className="mt-4 pt-4">
          <button className="btn btn-sm btn-outline-info"
                  onClick={this.props.returnToMenu}>Назад к выбору режима</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentPlayer: state.game.currentPlayer,
    gameStatus: state.game.gameStatus,
    moveInfo: state.moveHistory.moveInfo
  }),
  dispatch => ({
    returnMove(value) {
      dispatch(returnToMove(value))
    },
    returnToMenu() {
      dispatch(returnToChooseMode())
    }
  })
)(LeftMenu);
