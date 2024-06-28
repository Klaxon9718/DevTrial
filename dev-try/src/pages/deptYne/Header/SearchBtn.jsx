import React, { useState } from 'react';
import { Button } from 'devextreme-react/button';
import { Popup } from 'devextreme-react/popup';
import { TextBox } from 'devextreme-react/text-box'; 
import './SearchBtn.css';
import DataGrid, {
    Column,
    HeaderFilter,
    Editing,
    FilterRow,
    SearchPanel,
    Pager,
    Paging,
    Lookup
  } from 'devextreme-react/data-grid';
  import data from './grid-data.js';

function SearchBtn() {

    const renderTitle = () => {
        return (
          <div className="rendertitle">
            <p>코드검색</p>
          </div>
        );
    };

    const renderContent = () =>  {
        return (
            <>
                <div className="contentheader">
                    <div className="item1">
                        <label className="searchLabel">부서코드</label>
                        <TextBox className="searchInput" />
                    </div>
                    <div>
                    <div className="item1">
                        <label className="searchLabel">&nbsp;&nbsp;부서명&nbsp;&nbsp;</label>
                        <TextBox className="searchInput" />
                    </div>
                    <Button className="searchbtn" type="normal" icon="search" />
                    </div>
                </div>
                <div className="contentbody">
                    <DataGrid
                        className="datagrid"
                        showBorders={false}
                        focusedRowEnabled={true}
                        defaultFocusedRowIndex={0}
                        columnAutoWidth={false}
                        columnHidingEnabled={true}
                        width={"100%"}
                        height={"100%"}
                        dataSource={data}
                        keyExpr="DeptCode"
                    >
                        <HeaderFilter visible={true} />
                        <Column 
                            dataField="DeptCode"
                            caption="부서코드"
                            datatype="string"
                            alignment="center"
                            width="130"
                        />
                        <Column 
                            dataField="DeptName"
                            caption="부서명"
                            datatype="string"
                            alignment="center"
                            width="150"
                        />
                    </DataGrid>
                </div>
                <div className="contentfooter">
                    <span className="cnt">8건</span>
                    <div>
                        <Button className="corfirmbtn" type="normal" text="확인" onClick={hideInfo}/>
                        <Button className="corfirmbtn" type="normal" text="취소" onClick={hideInfo}/>
                    </div>
                </div>
            </>            
        )
    }

    const [popupVisible, setPopupVisible] = useState(false);

    const handleClick = () => {
        setPopupVisible(true);
    };

    const hideInfo = () => {
        setPopupVisible(false);
    };

    return (
        <div>
             <Button className="searchbutton" type="normal" icon="search" onClick={handleClick} />
             <Popup
                className="popup"
                contentRender={renderContent}
                visible={popupVisible}  // visible 여부
                onHiding={hideInfo}     // 팝업창이 hide되기 전에 실행되는 함수
                dragEnabled={true}      // 드래그 가능 여부
                hideOnOutsideClick={true}   // 배경 클릭 시 hide 여부 
                showCloseButton={true}      // 닫기 버튼
                showTitle={true}
                titleRender={renderTitle}
                container=".dx-viewport"
                width={350}
                height={550}
            />
        </div>
    );
}

export default SearchBtn;