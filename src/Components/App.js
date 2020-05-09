import React from 'react';
import Board from './Board.js';
import GameModeSelection from './GameModeSelection/GameModeSelection.js';
import '../style.scss';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

class App extends React.Component {
  render() {

    return (
      <div className="d-flex flex-column flex-fill">
        <div className="pl-0 container-fluid d-flex flex-column flex-fill align-items-center justify-content-center">
          <Route path="/gamemode" component={GameModeSelection}/>
          <Route path="/game" component={Board}/>
          { this.props.game ? <Redirect to="/game" /> : <Redirect to="/gamemode/classic" /> }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    game: state.gameParameters.playersSymbols.length
  }),
  null
)(App);
