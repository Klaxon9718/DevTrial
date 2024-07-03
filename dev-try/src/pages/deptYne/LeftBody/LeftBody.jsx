import React, { useState, useCallback, useEffect, useRef } from 'react';
import './LeftBody.css';
import { TreeView, SearchEditorOptions } from 'devextreme-react/tree-view';
import { useQuery } from '@tanstack/react-query';
import getDeptList from '../react-query/getDeptList';
import { useRecoilState } from 'recoil';
import keywordState from '../../../recoil/atoms/deptYne'


function LeftBody(props) {
    const [keyword, setKeyword] = useRecoilState(keywordState);

    const { data, error, isLoading } = useQuery({
        queryKey: ['deptList'],
        queryFn: getDeptList,
        retry: 3,   //실패 시 재시도 횟수
        refetchOnWindowFocus: false, // 창 포커스 시 데이터 리패치 비활성화
    });

    const handleItemClick = useCallback((e) => {
        setKeyword(e.itemData.DEPT_CODE);
      }, []);

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;

    return (
        <div className="contentbox">
            <TreeView 
                id="treeView"
                items={data}
                searchEnabled={true}
                parentIdExpr="PARENT_DEPT"
                displayExpr="DEPT_NAME"
                onItemClick={handleItemClick}
                activeStateEnabled={true}
            >
                 <SearchEditorOptions
                    placeholder="Type search value here..."
                    width={300}
                />      
            </TreeView>
        </div>
    );
}

export default LeftBody;