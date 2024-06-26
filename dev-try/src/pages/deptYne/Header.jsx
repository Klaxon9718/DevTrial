import React from 'react';
import './Header.css';
import { TextBox } from 'devextreme-react/text-box'; 
import { Button } from 'devextreme-react/button';

function Header(props) {
    return (
        <div className="containerbox">
            <label className="namelabel">상위부서</label>
            <TextBox className="searchinput" />
            <TextBox className="searchinput"/>
            <Button className="searchbutton" type="normal" icon="search" />
        </div>
    );
}

export default Header;