import React, { useState } from 'react';
import './Header.css';
import InputBox from './InputBox';
import { Button } from 'devextreme-react/button';
import SearchBtn from './SearchBtn';
import SearchButton from './SearchButton';

function Header() {
    const [ txt_codeValue, txt_setCodeValue ] = useState(''); // CODE 텍스트 필드 값
    const [ txt_nameValue, txt_setNameValue ] = useState(''); // NAME 텍스트 필드 값

    return (
        <div className="containerbox">
            <label className="namelabel">상위부서</label>
            <InputBox placeholder="CODE" id="DEPT_CODE" value={txt_codeValue} onValueChange={(value) => txt_setCodeValue(value)} />
            <InputBox placeholder="NAME" id="DEPT_NAME" value={txt_nameValue} onValueChange={(value) => txt_setNameValue(value)} />
            <SearchBtn txt_setCodeValue={txt_setCodeValue} txt_setNameValue={txt_setNameValue} />

            <SearchButton />
            <Button className="processbutton" type="normal" text="추가" />
            <Button className="processbutton" type="normal" text="저장" />
            <Button className="processbutton" type="normal" text="삭제" />
        </div>
    );
}

export default Header;