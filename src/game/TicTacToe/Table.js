import React, {memo} from 'react';
import Tr from './Tr';

const Table = memo(({ tableData, dispatch }) => {
    return (
        <div className='TTT_Table'>
          <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => (<Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}
            </tbody>
        </table>
        </div>
        
    )
});
 
export default Table;   