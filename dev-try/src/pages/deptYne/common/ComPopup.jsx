import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPopupList from '../react-query/getPopupList';
import './ComPopup.css';
import DataGrid, { Column, HeaderFilter } from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import { TextBox } from 'devextreme-react/text-box'; 
  
function ComPopup(props) {
    const { popupVisible, setPopupVisible } = props; // popup상태
    const { windowName, codeLabel, nameLabel, tableName, codeColumn, nameColumn, getClickedItem } = props;
    const [ totalCount, setTotalCount ] = useState(0); // 행 수
    const [ codeValue, setCodeValue ] = useState(''); // CODE 텍스트 필드 값
    const [ nameValue, setNameValue ] = useState(''); // NAME 텍스트 필드 값
    const [ selectValue, setSelectValue ] = useState({}); // 선택한 데이터를 담을 변수
    const [ resultValue, setResultValue ] = useState([]); // 데이터 그리드에 필터링 후 세팅될 데이터

    const param = {tableName: tableName, codeColumn: codeColumn, nameColumn: nameColumn};
    const { data, error, isLoading } = useQuery({
        queryKey: ['popupList', param],
        queryFn: getPopupList,
        retry: 3,   //실패 시 재시도 횟수
        refetchOnWindowFocus: false, // 창 포커스 시 데이터 리패치 비활성화
    });

    // data가 준비되면 resultValue의 초기값으로 설정
    useEffect(() => {
        if(data) {
            setResultValue(data);
        }
    }, [data]);

    // 데이터 로드 시 자동 포커스된 첫번째 행의 데이터를 selectValue에 저장 => default값
    useEffect(() => {
        if(isLoading) return;

        else if (data.length > 0) {
          setSelectValue(data[0]);
        }
    }, [data]);


    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;

    const renderTitle = () => {
        return (
          <div className="rendertitle">
            <p>{windowName}</p>
          </div>
        );
    };

    // #region 이벤트 핸들러

    // 검색 시 데이터 필터링
    const handleSearch = () => {
        const filteredData = data.filter(item => 
            (codeValue === '' || (item[codeColumn].toLowerCase().includes(codeValue.toLowerCase()))) &&
            (nameValue === '' || (item[nameColumn].toLowerCase().includes(nameValue.toLowerCase())))
        );

        setResultValue(filteredData);
    };

    // 그리드 데이터가 준비되면 행 수 체크
    const getTotalCount = (e) => {
        setTotalCount(e.component.totalCount());
    };

    // 행 선택 시 클릭한 데이터를 selectValue에 저장
    const rowClick = (e) => {
        setSelectValue(e.data);
    };

    // 확인 버튼 or 행 더블클릭 시 선택한 데이터를 부모로 보낸 후 창 닫기
    const confirmData = () =>{
        getClickedItem(selectValue);

        setPopupVisible(false);
    };

    // 취소 버튼 클릭 시 창 닫기
    const canclePopup = () => {
        setPopupVisible(false);
    };
    // #endregion

    const renderContent = () =>  {
        return (
            <>
                <div className="searchField">
                    <div className="searchFieldItem">
                        <TextBox 
                            name={codeColumn}
                            mode="text"
                            className="searchinput" 
                            value={codeValue} 
                            valueChangeEvent="input"   //UI 구성 요소의 값을 업데이트해야 하는 DOM 이벤트를 지정
                            onValueChange={(value) => setCodeValue(value)}
                            onEnterKey={handleSearch}
                            maxLength={50}
                            label={codeLabel}
                            labelMode="floating"
                        /> 
                    </div>
                    <div>
                    <div className="searchFieldItem">
                        <TextBox 
                            name={nameColumn}
                            mode="text"
                            className="searchinput" 
                            value={nameValue} 
                            valueChangeEvent="input"   //UI 구성 요소의 값을 업데이트해야 하는 DOM 이벤트를 지정
                            onValueChange={(value) => setNameValue(value)}
                            onEnterKey={handleSearch}
                            maxLength={50}
                            label={nameLabel}
                            labelMode="floating"
                        />
                    </div>
                    <Button className="searchbtn" type="normal" icon="search" onClick={handleSearch} />
                    </div>
                </div>
                <div className="contentbody">
                    <DataGrid
                        className="datagrid"
                        showBorders={false}         // 테두리 표시 여부
                        focusedRowEnabled={true}    // 행 포커스 여부
                        defaultFocusedRowIndex={0}  // 초기 포커스 행 인덱스
                        columnAutoWidth={false}     // 열 너비 자동 조정 여부
                        allowColumnResizing={true}  // 열 너비 조정 기능 사용 여부
                        width={"100%"}
                        height={"100%"}
                        dataSource={resultValue}
                        keyExpr={codeColumn}
                        onContentReady={getTotalCount}
                        onRowClick={rowClick}
                        onRowDblClick={confirmData}
                    >
                        <HeaderFilter visible={true} />
                        <Column 
                            dataField={codeColumn}
                            caption={codeLabel}
                            datatype="string"
                            alignment="center"
                            width="140"
                        />
                        <Column 
                            dataField={nameColumn}
                            caption={nameLabel}
                            datatype="string"
                            alignment="center"
                            width="160"
                        />
                    </DataGrid>
                </div>
                <div className="contentfooter">
                    <span className="cnt">{totalCount + "건"}</span>
                    <div>
                        <Button className="corfirmbtn" type="normal" text="확인" onClick={confirmData}/>
                        <Button className="corfirmbtn" type="normal" text="취소" onClick={canclePopup}/>
                    </div>
                </div>
            </>            
        )
    }

    return (
        <Popup
            className="popup"
            contentRender={renderContent}
            visible={popupVisible}  // visible 여부
            dragEnabled={true}      // 드래그 가능 여부
            showTitle={true}
            titleRender={renderTitle}
            container=".dx-viewport"
            width={350}
            height={550}
        />
    );
    
}

export default ComPopup;