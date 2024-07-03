import React from 'react';
import { Button } from 'devextreme-react/button';
import { useRecoilState } from 'recoil';
import keywordState from '../../../recoil/atoms/deptYne'

function SearchButton(props) {
    const [keyword, setKeyword] = useRecoilState(keywordState);

    function handleClick(){
        setKeyword('');
    }

    return (
        <div>
            <Button className="processbutton" type="normal" text="조회" onClick={handleClick} />
        </div>
    );
}

export default SearchButton;