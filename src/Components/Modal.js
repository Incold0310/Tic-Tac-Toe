import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {returnToChooseMode} from '../Redux/actions/returnToChooseMode';
import {newGame} from '../Redux/actions/newGame';


function ModalComponent(props) {
    return (
      <Modal
        show={props.gameStatus=="НИЧЬЯ!" || /победил/i.test(props.gameStatus)}
        centered
        dialogClassName="text-center"
      >
        <Modal.Body>
          <h1 className="display-4">{props.gameStatus}</h1>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={props.returnToMenu}>Вернуться к выбору режима</button>
          <button className="btn btn-success" onClick={props.startNewGame}>Новая игра</button>
        </Modal.Footer>
      </Modal>
    );
}

export default connect(
  state => ({
    gameStatus: state.game.gameStatus,
  }),
  dispatch => ({
    returnToMenu() {
      dispatch(returnToChooseMode())
    },
    startNewGame() {
      dispatch(newGame())
    }
  })
)(ModalComponent);
