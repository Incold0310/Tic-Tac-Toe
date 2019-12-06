import React from 'react';
import '../style.css';

function Square (props) {
    return (
      <button className={props.squareClass} onClick={props.clickONButton}>
        {props.squareValue}
      </button>
    );
}

export default Square;
