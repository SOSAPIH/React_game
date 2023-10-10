import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react';
import Table from './Table';

const initialState = {// 초기설정 값
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
}
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {// 함수
    switch (action.type) {
        case SET_WINNER: 
        //state.winner = action.winner 이런식으로 직접 변경 XX
            return {
                ...state, // 기존부분
                winner: action.winner, // 추가사항
            }
        case CLICK_CELL: { // immer 라이브러리에서 가독성 해결 가능
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; //기존의 row 복사
            tableData[action.row][action.cell] = state.turn; //tableData[rowIndex][cellIndex]에 O or X 할당
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell], // 현재상태와 update된 tableData & recentCell의 업데이트까지 return해줌
                }
        }
        case CHANGE_TURN: {
            return {                            
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O', 
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1],
            }
        }    
        default:
            return state;
        }        
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState); //함수와 초기설정
    const { tableData, turn, winner, recentCell } = state;
    const [draw, setDraw] = useState(false);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' }) // 이 객체가 action객체 => action을 해석해서 state를 변경시켜 주는 것이 reducer => action을 dispatch할 때마다 reducer가 실행됨
    }, []);

    useEffect(() => {
        //승자 검사를 useEffect 내부에서 하는 이유: useEffect를 하지 않는다면, turn은 클릭하기 전 turn이 할당된 상태일 것 => 왜why? useReducer의 state 변경은 비동기임
        //따라서 비동기 외부에서 state에 일을 처리하면 변경 전의 state 값을 활요하게 됨 
        const [row, cell] = recentCell;
        if (row < 0) return; // 시작 렌더링에서 돌아가지 않게
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        } else if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        } else if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        } else if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
            win = true;
        }
        let all = true;
        if (win) { // 승리
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
            setDraw(false);
        } else {// 승리자없음
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) { // 하나라도 안차있으면 무승부 아님
                        all = false;
                    }
                })
            })
            if (all) {
                setDraw(true);
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN});//CHANGE_TURN이 여기있는 이유: CLICK_CELL 후 CHANGE_TURN을 하면, turn이 클릭한 후 CHANGE된 상태에서 turn으로 winner 검사하게 됨
            }
        }
    }, [recentCell]); //클릭한 cell이 바뀔 때마다 동작하기 위해 recentCell을 생성, 후 의존성배열에 할당  
    
    return (
        <div className='tictactoe_home'>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            <div className='tictactoeResult'>
                {winner && !draw ? <div>{winner}님의 승리!</div> : null}
                {draw ? <div>무승부!</div> : null}
            </div>
        </div>
    )
} 

export default TicTacToe;