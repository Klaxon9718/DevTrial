//라이브러리 관련
import React from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { selectedDeptTable, clickDeptItem } from '../../../recoil/atoms/deptState';

//Dev 컴포넌트
import TreeView from 'devextreme-react/tree-view';


const DeptList = React.memo(() => {

    const [deptT, setDeptT] = useRecoilState(selectedDeptTable);
	const clickedDept = useSetRecoilState(clickDeptItem);


    // 리스트를 펼치기 위해 expanded속성 추가
    const deptList = deptT.map((dept) => ({
        ...dept,
        expanded: true // 모든 항목을 처음부터 펼쳐지도록 설정
    }));
    console.log("deptList에서 출력", deptT); // 문제: 2번 이상 호출됨


    // TreeView 항목 선택 시 선택 값 recoil처리
    const onClickTreeViewItem = (e) => {
        console.log('클릭된 항목 정보:', e.itemData.DEPT_CODE);
		clickedDept(e.itemData.DEPT_CODE);
    };

    return (
		<div>
        <TreeView
			searchEnabled={true}
            items={deptList}
            dataStructure="plain"
            displayExpr="DEPT_NAME"
            parentIdExpr="PARENT_DEPT"
            keyExpr="DEPT_CODE"
            width={250}
            onItemClick={onClickTreeViewItem}
        >
			</TreeView>
			
		</div>
    );
});

export default DeptList;
