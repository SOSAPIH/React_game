import React, {useState, useCallback, useContext, memo} from 'react';
import { TableContext } from './MineSweeper';
import { START_GAME } from './MineSweeper';

const Form = memo(() => {
  let row = 0;
  let cell = 0;
  let mine = 0;
  
  const [difficulty, setDifficulty] = useState(0);
  const { dispatch } = useContext(TableContext);
  
  const chooseDifficulty = e => {
    setDifficulty(e.target.value);
    console.log('difficulty:', e.target.value);
  }
  
  const onClickBtn = useCallback(() => {
    if (difficulty === "1") {
      row = 7;
      cell = 7;
      mine = 10;
    } else if (difficulty === "2") {
      row = 12;
      cell = 12;
      mine = 30;
    } else if (difficulty === "3") {
      row = 15;
      cell = 15;
      mine = 40;
    }

    dispatch({ type: START_GAME, row, cell, mine, difficulty });
  }, [difficulty, dispatch]);
  
  return (
    <form onSubmit={e => e.preventDefault()}>
      <select onChange={chooseDifficulty} value={difficulty}>
        <option value={0}>-- 난이도 선택 --</option>
        <option value={1}>Easy</option>
        <option value={2}>Normal</option>
        <option value={3}>Hard</option>
      </select>
      <button onClick={onClickBtn}>시작</button>
    </form>
  )
})

export default Form;

// <input type="number" placeholder='가로' value={cell} onChange={onChangeCell} />
//       <input type="number" placeholder='세로' value={row} onChange={onChangeRow} />
//       <input type="number" placeholder='지뢰' value={mine} onChange={onChangeMine} />