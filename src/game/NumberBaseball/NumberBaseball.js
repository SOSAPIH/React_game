  import React, {useRef, useState} from 'react';
  import Try from './Try';

  const getNumbers = () => { //숫자 4개를 겹치지 않고 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
    [1, 2, 3, 4].forEach(() => {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        array.push(chosen);
    });
    return array;
  }

  const NumberBaseball = (props) => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);
  
  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join('')) {//홈런
        setResult('홈런!');
        setValue('');
        setTries(prev => {
            return [...prev, { try: value, result: '홈런!' }];
        });
        alert('게임을 다시 시작합니다!');
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
    } else { //오답
        const answerArray = value.split('').map(v => parseInt(v));//입력한 inputValue를 4자리 숫자로 저장
        let strike = 0;
        let ball = 0;
      if (tries.length >= 9) {//10번 실패
        let timer = 0;
        let time = setInterval(() => {
          timer += 1;
          if (timer >= 4) {
          clearInterval(time);
            setResult('');
        };
        }, 1000);
        
        setResult(`실패! 정답은 ${answer.join(',')}입니다.`);
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
        } else { //기회가 남음
            for (let i = 0; i < 4; i++){
                if (answerArray[i] === answer[i]) {
                    strike++;
                } else if (answer.includes(answerArray[i])) {
                    ball++;
                }
            }
            setTries(prev => 
                  [...prev, { try: value, result: `${strike} 스트라이크 ${ball} 볼 입니다.` }]
            );
            setValue('');
            inputRef.current.focus();
        }
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className='numberBaseball_home'>
      <h1><strong>0~9사이 서로다른 4자리의 숫자를 맞춰보세요!</strong></h1>
      <div className='baseball_table'>
        <tr>
          <td>4</td>
          <td>자</td>
          <td>리</td>
          <td>수</td>
        </tr>
      </div>
      <h1 className='baseball_result'>{result}</h1>        
      <form onSubmit={onSubmitForm}>
          <input ref={inputRef} minLength={4} maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ol className='tryInfo'>
          {tries.map((v, i) => {
              return <Try key={`${i + 1}차 시도: `} tryInfo={v} />
          })}
      </ol>
      </div>  
    );
  }

  export default NumberBaseball;