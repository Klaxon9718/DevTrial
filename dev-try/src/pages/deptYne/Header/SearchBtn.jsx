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
import getDeptList from '../react-query/getDeptList';
import { useQuery } from '@tanstack/react-query';

function SearchBtn() {
    const param = "popup";

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['deptSearch', param],
        queryFn: getDeptList,
        retry: 3,   //실패 시 재시도 횟수
        refetchOnWindowFocus: false, // 창 포커스 시 데이터 리패치 비활성화
        enabled: false,
    });

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
                        keyExpr="DEPT_CODE"
                    >
                        <HeaderFilter visible={true} />
                        <Column 
                            dataField="DEPT_CODE"
                            caption="부서코드"
                            datatype="string"
                            alignment="center"
                            width="130"
                        />
                        <Column 
                            dataField="DEPT_NAME"
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
        refetch();
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