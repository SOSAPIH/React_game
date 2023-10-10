import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import RSP from './game/RSP';
import ResponseCheck from './game/ResponseCheck';
import TicTacToe from './game/TicTacToe/TicTacToe';
import NumberBaseball from './game/NumberBaseball/NumberBaseball';
import MineSweeper from './game/MineSweeper/MineSweeper'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
            <Route path='/rsp' element={<RSP/>}/>
            <Route path='/res_check' element={<ResponseCheck/>}/>
            <Route path='/tictactoe' element={<TicTacToe/>}/>
            <Route path='/find_mine' element={<MineSweeper/>}/>
            <Route path='/num_baseball' element={<NumberBaseball />} />
        </Routes>
      </div>
    </BrowserRouter>
      
  );
}

export default App;