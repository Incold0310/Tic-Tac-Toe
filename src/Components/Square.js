import React from 'react';
import {connect} from 'react-redux';
import {setSquareValue} from '../Redux/actions/setSquareValue.js';

function Square (props) {
  return (
    <div className="cell d-flex align-items-center justify-content-center" onClick={(e)=>{
        props.setSquareValue(props.location, e.currentTarget.innerHTML);
    }}>
      {props.squareValue}
    </div>
  );
}

export default connect(
  null,
  dispatch => ({
    setSquareValue(num, value) {
      dispatch(setSquareValue(num, value));
    }
  })
)(Square);
