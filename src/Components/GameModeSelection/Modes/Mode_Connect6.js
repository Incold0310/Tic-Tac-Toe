import React from 'react';
import img_gomoku from '../../../image/gomoku.jpg';


function Mode_Connect6 () {
    return (
      <div className="text-left">
        <p>
          Правила игры основаны на традиционной азиатской игре гомоку.
          Два игрока по очереди выставляют на свободные клетки поля 19x19 знаки.
          Первым ходом "нолики" выставляют один знак в центр доски, а во все последующие ходы обоих игроков выставляется по два знака.
          Выигрывает тот, кто своим ходом выставит шесть знаков подряд по горизонтали, вертикали или диагонали.
          <br />
          <img src={img_gomoku} alt={img_gomoku} />
        </p>
      </div>
    );
}

export default Mode_Connect6;
