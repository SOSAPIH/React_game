import React, { memo, useState } from 'react';

const Try = memo(({tryInfo}) => {
    const [result, setResult] = useState(tryInfo.result);//부모로부터 온 props변경
    //자식은 props를 변경하지 않는다. 부모로부터 왔기 때문에 => 변경하고 싶다면 state로 변경할 것
    
    const onClick = (e) => {
        setResult('1');
    }
        return (
            <li className='tryInfo_try'>
                <span className='tryInfo_try_num'>{tryInfo.try} : </span>
                <span onClick={onClick}>{result}</span>
            </li>
    );
});
Try.displayName = 'Try'; 

export default Try;