import { Link } from 'react-router-dom';

export default function Header() {
    
  return (<div className='header'>
    <h1 className='theme'>게임을 선택하여 플레이하세요</h1>
    <div className='game_all'>
      <Link className="game" to='/tictactoe'>TicTacToe</Link>|   
      <Link className="game" to='/res_check'>Response Check</Link>|  
      <Link className="game" to='/rsp'>Rock Scissors Paper</Link>|
      <Link className="game" to='/find_mine'>Mine Sweeper</Link>|
      <Link className="game" to='/num_baseball'>Number Baseball</Link>
    </div>
    </div>
    )
}