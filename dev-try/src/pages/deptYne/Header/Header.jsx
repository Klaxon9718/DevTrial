import React from 'react';
import './Header.css';
import InputBox from './InputBox';
import { Button } from 'devextreme-react/button';
import SearchBtn from './SearchBtn';
import SearchButton from './SearchButton';

function Header(props) {
    return (
        <div className="containerbox">
            <label className="namelabel">상위부서</label>
            <InputBox placeholder="CODE" id="DEPT_CODE" />
            <InputBox placeholder="NAME" id="DEPT_NAME" />
            <SearchBtn />
            <SearchButton />
            <Button className="processbutton" type="normal" text="추가" />
            <Button className="processbutton" type="normal" text="저장" />
            <Button className="processbutton" type="normal" text="삭제" />
        </div>
    );
}

export default Header;