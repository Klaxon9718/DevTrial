import React, { useState } from 'react';
import { Button } from 'devextreme-react/button';
import ComPopup from '../common/ComPopup.jsx';
import createPopupProps from '../common/comfunc.jsx'

function SearchBtn(props) {
    const { txt_setCodeValue, txt_setNameValue } = props;
    const [popupVisible, setPopupVisible] = useState(false);

    // 팝업창에서 선택한 데이터를 받아오는 함수
    function getClickedItem (item) {
        // txt_setCodeValue(item[params.codeColumn]);
        // txt_setNameValue(item[params.nameColumn]);
        txt_setCodeValue(item.DEPT_CODE);
        txt_setNameValue(item.DEPT_NAME);
    }

    const params = createPopupProps(
        getClickedItem,
        popupVisible,
        setPopupVisible,
        '코드검색',
        '부서코드',
        '부서명',
        'dept',
        'DEPT_CODE',
        'DEPT_NAME'
    );

    const handleClick = () => {
        setPopupVisible(true);
    };

    return (
        <div>
             <Button className="searchbutton" type="normal" icon="search" onClick={handleClick} />
             {popupVisible && <ComPopup {...params} />}
        </div>
    );
}

export default SearchBtn;