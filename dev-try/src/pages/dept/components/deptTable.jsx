//파일 import
import './deptTable.scss'

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

	const [deptDataTable, setDeptTable] = useRecoilState(getDeptTableData)	// 그리드에 출력할 부서정보
	const [updateArray, setUpdateArray] = useState([]);		//그리드 변경 내용 저장


	//#region api 요청
	// 그리드 용 부서 정보 요청
	const {data : gridData, refetch: DeptTableDataRefetch } = useQuery({
		queryKey: ['selectDeptTable'],
		queryFn: async() => {
			const response = await axios.post('/dept/selectDeptTableData',
			{
				dept_code: clickedDept
			});

			setDeptTable(response.data);
			console.log("DeptTable useQuery 출력" , response.data);	
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
	// console.log("밖에서 상위부서 출력", parentDepts);
	// console.log("밖에서 updateArray 출력", updateArray);


	//그리드 변경 내용 저장

	//#endregion



	//#region 이벤트 핸들러 구현

	//전체 저장 버튼 클릭 시
	const clickSavebtn = (e) => {
		console.log("clickSavebtn", e.changes);

		//변경된 내용 map함수를 통해 필요 데이터만 추출
		e.changes.map((row) => {
			//신규 행 : 입력 내용, 타입
			if(row.type === 'insert') {
				const newData = { ...row.data, TYPE: row.type }
				setUpdateArray([...updateArray, newData])
			}
			//수정 행 : 수정 내용, 행 key값(DEPT_CODE), 타입
			if(row.type === 'update') {
				const newData = { ...row.data, DEPT_CODE: row.key, TYPE: row.type }
				setUpdateArray([...updateArray, newData])
			}
			//삭제 행 : 행 key값(DEPT_CODE), 타입
			if(row.type === 'remove') {
				const newData = { DEPT_CODE: row.key, TYPE: row.type }
				setUpdateArray([...updateArray, newData])
			}

		})
	}
	//#endregion



	//최초실행과 부서 리스트에서 선택된 부서가 변경되었을 때 재렌더링
	useEffect (() => { 	console.log(clickDeptItem); DeptTableDataRefetch();	},[clickedDept])
	// useEffect (() => { 	console.log(" useEffect배열", updateArray);},[updateArray])


	const handleOpen = useCallback((e) => {
		console.log('Dropdown opened');
	})


	// console.log("설마",deptDataTable )

	
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


/**
 * 해결 필요 문제
 * 1. Lookup에서 드롭박스가 열리면 api호출하도록
 * 2. 부서목록에서 선택하지 않고 데이터 입력 후 행 저장 시, 오류 발생
 */