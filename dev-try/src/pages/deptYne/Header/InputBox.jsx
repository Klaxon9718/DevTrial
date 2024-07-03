import React, { useState, useCallback } from 'react';
import { TextBox } from 'devextreme-react/text-box'; 
import { useRecoilState } from 'recoil';
import keywordState from '../../../recoil/atoms/deptYne'
import columnState from '../../../recoil/atoms/deptYneColumn.js'

function InputBox(props) {
    const {placeholder, id} = props;
    const [value, setValue] = useState('');
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [column, setColumn] = useRecoilState(columnState);

    // TextBox value 상태 관리
    const onValueChange = useCallback((v) => {
        setValue(v)
    }, []);
    //빈 배열을 의존성으로 주면 컴포넌트가 마운트될 때 한 번만 함수가 생성되고 이후에는 동일한 함수 참조를 유지(함수의 실행이 아님!!!)

    // enter키 이벤트
    const onEnterKey = useCallback((e) => {
        console.log("호출한 곳: " + e.event.target.name + " 입력값: " + e.event.target.value);
        setKeyword(e.event.target.value);
        setColumn(e.event.target.name);
    }, [value]);

    // focusout 이벤트
    const onFocusOut = useCallback((e) => {
        console.log("호출한 곳: " + e.event.target.name + " 입력값: " + e.event.target.value);
    }, [value]);

    return (
        <div>
             <TextBox 
                name={id}
                mode="text"
                className="searchinput" 
                placeholder= {placeholder} 
                value={value} 
                valueChangeEvent="input"   //UI 구성 요소의 값을 업데이트해야 하는 DOM 이벤트를 지정
                onValueChange={onValueChange}
                onEnterKey={onEnterKey}
                onFocusOut={onFocusOut}
            />
        </div>
    );
}

export default InputBox;