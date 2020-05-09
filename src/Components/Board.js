import React from 'react';
import Square from './Square';
import LeftMenu from './LeftMenu';
import ModalComponent from './Modal';
import {connect} from 'react-redux';
import {setSquareValue} from '../Redux/actions/setSquareValue.js';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.tBody = React.createRef();
  }
  componentDidMount() {
    this.props.setSquareValue();
  }

  render() {
    return (
      <div className="row d-flex flex-fill container-fluid p-0">
        <div className="col-3 pl-0">
          <LeftMenu tbody={this.tBody.current} />
        </div>

        <div className="col-9 d-flex align-items-center justify-content-center px-0 py-2">
          <div id="board" className="table-responsive">
            <table>
              <tbody ref={this.tBody}>
              {this.props.squaresValue.map((item , i) =>
                <tr key={`row_${i}`}>
                  {item.map((square, j) =>
                    <td key={`row_${i}-col_${j}`}>
                      <Square key={`row_${i}-col_${j}`} location={[i, j]} squareValue={square}/>
                    </td>
                  )}
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <ModalComponent />
      </div>
    );
  }
}

export default connect(
  state => ({
    squaresValue: state.game.squaresValue,
    gameStatus: state.game.gameStatus
  }),
  dispatch => ({
    setSquareValue(num) {
      dispatch(setSquareValue(num));
    }
  })
)(Board);
