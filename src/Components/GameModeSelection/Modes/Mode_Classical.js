import React from 'react';
import img_classical from '../../../image/classical.gif';

function Mode_Classical () {
    return (
      <div className="text-left">
        <p>
          Классический режим игры в Крестики-Нолики.<br />
          В игре принимают участие 2 игрока, которые по очереди ставят на свободные клетки поля знаки.
          Первый, выстроивший в ряд 3 своих фигуры по вертикали, горизонтали или диагонали, выигрывает.
          Первый ход делает игрок, ставящий нолики.
          <br />
          <img src={img_classical} alt={img_classical}/>
        </p>
      </div>
    );
}

export default Mode_Classical;
