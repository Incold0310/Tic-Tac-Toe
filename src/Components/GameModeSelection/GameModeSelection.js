import React from 'react';
import '../../style.scss';
import {connect} from 'react-redux';
import Mode_Classical from './Modes/Mode_Classical';
import Mode_Connect6 from './Modes/Mode_Connect6';
import Mode_UserMode from './Modes/Mode_UserMode';
import {setGameParameters} from '../../Redux/actions/setGameParameters.js';
import {Route, Link} from 'react-router-dom';


class GameModeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMode: 'Классический',
      userParameters: undefined
    }
  }

  setUserParameters(form) {
    this.setState({userParameters: Array.from(form).map(inp=>+inp.value)});
  }

  changeActiveLink(event) {
    let mode = event.currentTarget;
    let parent = Array.from(mode.parentNode.children);
    parent.filter(link=>link.classList.contains("active"))[0].classList.remove('active');
    mode.classList.add('active');
    this.setState({gameMode: mode.textContent});
  }

  render() {
    return (
      <div className="col-7 text-center" id="gamemodeselection">
        <h1>Выберите режим игры</h1>
        <br />
        <div className="row">
          <div className="col-4">
            <div className="btn-group-vertical btn-block">
              <Link to="/gamemode/classic" type='button' className="btn btn-outline-primary active"
                    onClick={this.changeActiveLink.bind(this)}>Классический</Link>
              <Link to="/gamemode/connect6" type='button' className="btn btn-outline-primary"
                    onClick={this.changeActiveLink.bind(this)}>Connect6</Link>
              <Link to="/gamemode/usermode" type='button' className="btn btn-outline-primary"
                    onClick={this.changeActiveLink.bind(this)}>Свой режим</Link>
            </div>
          </div>
          <div className="col-8">
            <Route path="/gamemode/classic" component={Mode_Classical}/>
            <Route path="/gamemode/connect6" component={Mode_Connect6}/>
            <Route path="/gamemode/usermode" render={() => <Mode_UserMode setForm={this.setUserParameters.bind(this)} />}/>
          </div>
        </div>
        <div className="text-left">
          <button className="btn btn-outline-success" onClick={()=>{
            this.props.startGame(this.state.gameMode, this.state.userParameters)
          }}>Начать игру</button>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    startGame(mode, userParam) {
      dispatch(setGameParameters(mode, userParam));
    }
  })
)(GameModeSelection);
