//파일 import
import './deptTable.scss'
import SearchPanel from '../searchPanel';

//라이브러리 관련
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickDeptItem, getDeptTableData } from '../../../recoil/atoms/deptState';

//Dev컴포넌트
import DataGrid, {	Column, Editing, Pager,	Paging,	FilterRow,	Lookup, Changes} from 'devextreme-react/data-grid';
import { useQuery } from '@tanstack/react-query';


export default function DeptTable() {

	const clickedDept = useRecoilValue(clickDeptItem);		//부서 리스트에서 선택된 부서 상태

	const [updateArray, setUpdateArray] = useState([]);		//그리드 변경 내용 저장
	const [saveFlag, setSaveFlag] = useState(false);		//저장 시점에서 useQuery를 사용하기 위해 상태 감지를 하는 상태

	//#region api 요청
	// 그리드 용 부서 정보 요청
	const {data : gridData, refetch: DeptTableDataRefetch } = useQuery({
		queryKey: ['selectDeptTable'],
		queryFn: async() => {
			const response = await axios.post('/dept/selectDeptTableData',
			{
				dept_code: clickedDept
			});
			
			// console.log("DeptTable useQuery 출력" , response.data);	
			return response.data;
		}
	});


	// Lookup에 들어가는 상위 부서 목록
	const { data : parentDepts , refetch: ParentDeptList} = useQuery({
		queryKey: ['selectParentDeptList'],
		queryFn : async() => {
			const response = await axios.post('/dept/selectParentDeptList');
			return response.data;
		}
	})


	// 데이터 저장을 실행하는 api
	const {data : savedData, refetch: savingDeptDateGrid } = useQuery({
		queryKey: ['savingDeptDateGrid'],
		queryFn : async() => {
			console.log("비동기에서 출력", updateArray[0]);
			const response = await axios.post('/dept/savingDeptDateGrid', updateArray[0]);
			return response.status;
		},
		enabled: false,		//최초렌더링 시 실행 안되도록 (https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries)
	})
	//#endregion



	//#region 이벤트 핸들러 구현

	//전체 저장 버튼 클릭 시
	const clickSavebtn = (e) => {
		console.log("clickSavebtn", e.changes);
		setUpdateArray([]);  // 변경 내용 담기 전 배열 초기화
		setUpdateArray((prev) => [...prev, e.changes]); 

		// //변경된 내용 map함수를 통해 필요 데이터만 추출 (사용 X)
		// e.changes.map((row) => {
		// 	//신규 행 : 입력 내용, 타입
		// 	if(row.type === 'insert') {
		// 		const newData = { ...row.data, TYPE: row.type }
		// 		setUpdateArray((prev) => [...prev, newData]);
		// 	}
		// 	//수정 행 : 수정 내용, 행 key값(DEPT_CODE), 타입
		// 	if(row.type === 'update') {
		// 		console.log("제발",row, " + ", row.data);
		// 		const newData = { ...row.data, DEPT_CODE: row.key, TYPE: row.type }
		// 		console.log(row);
		// 		setUpdateArray((prev) => [...prev, newData]);
		// 	}
		// 	//삭제 행 : 행 key값(DEPT_CODE), 타입
		// 	if(row.type === 'remove') {
		// 		const newData = { DEPT_CODE: row.key, TYPE: row.type }
		// 		setUpdateArray((prev) => [...prev, newData]);
		// 	}
		// });

		setSaveFlag(true);
	}
	//#endregion



	//최초실행과 부서 리스트에서 선택된 부서가 변경되었을 때 재렌더링
	useEffect (() => { 	
		console.log(clickDeptItem); 
		DeptTableDataRefetch();	
	},[clickedDept]);

	//저장 버튼을 눌러 updateArray 상태가 변경되면 재렌더링
	useEffect (() => { 	
		console.log(" useEffect배열", updateArray); 
		DeptTableDataRefetch(); 
	},[updateArray]);

	//저장 api 요청을 보낸다.
	/****[note]******
	1. DeptTableDataRefetch에서 saveFlag를 변경
	2. 의존성 배열과 조건에 따라 아래 useEffect가 실행된다.
	3. 완료 후 saveFlag 상태를 바꿔준다.
	*****************/
	useEffect(() => {
		if(saveFlag){
			console.log("으엉", updateArray);
			savingDeptDateGrid();
			DeptTableDataRefetch();
			setSaveFlag(false);
		}
	},[saveFlag]);


	const handleOpen = useCallback((e) => {
		console.log('Dropdown opened');
	})


	
	return(
	
		<DataGrid
		className={'dx-card wide-cards'}
		showBorders={false}
		focusedRowEnabled={true}
		defaultFocusedRowIndex={0}
		columnAutoWidth={true}
		columnHidingEnabled={true}
		dataSource={gridData}
		keyExpr="DEPT_CODE"
		onSaving={clickSavebtn}
		>

			<Editing
			 mode="batch"
			 allowUpdating={true}
			 allowAdding={true}
			 allowDeleting={true}
			 >
			 </Editing>

			<Column  dataField='DEPT_CODE' caption="부서코드" alignment='center' width={120} />
			<Column  dataField='DEPT_NAME' caption="부서 명" alignment='center' width={140}/>
			<Column  dataField='PARENT_DEPT' caption="상위부서" alignment='center' width={120} >
				<Lookup dataSource={parentDepts} valueExpr="PARENT_CODE" displayExpr="PARENT_NAME" hint="상위 부서 선택" />
		   	</Column>
			<Column  dataField='LOCATION' caption="부서위치" alignment='left' width={100} />
			<Column  dataField='DEPT_MANAGER' caption="부서장" alignment='center' width={100}/>
			<Column  dataField='DEPT_EMP_QTY' caption="소속인원 수" alignment='center' width={120}/>			
			
			
		</DataGrid>
	)
}