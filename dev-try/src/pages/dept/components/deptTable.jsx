//파일 import
import './deptTable.scss'

//라이브러리 관련
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickDeptItem, getDeptTableData } from '../../../recoil/atoms/deptState';

//Dev컴포넌트
import DataGrid, {	Column, Editing, Pager,	Paging,	FilterRow,	Lookup} from 'devextreme-react/data-grid';
import { useQuery } from '@tanstack/react-query';



export default function DeptTable() {


	const clickedDept = useRecoilValue(clickDeptItem);
	const [deptDataTable, setDeptTable] = useRecoilState(getDeptTableData)


	const {data, refetch: DeptTableDataRefetch } = useQuery({
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

	useEffect (() => {
		DeptTableDataRefetch();

	},[clickedDept])

	
	return(
	
		<DataGrid
		className={'dx-card wide-cards'}
		showBorders={false}
		focusedRowEnabled={true}
		defaultFocusedRowIndex={0}
		columnAutoWidth={true}
		columnHidingEnabled={true}
		dataSource={deptDataTable}
		>

			<Editing
			 mode="batch"
			 allowUpdating={true}
			 allowAdding={true}
			 allowDeleting={true}
			 keyExpr="DEPT_CODE">
			 </Editing>

			<Column  dataField='DEPT_CODE' caption="부서코드" alignment='center' width={120}/>
			<Column  dataField='DEPT_NAME' caption="부서 명" alignment='center' width={140}/>
			<Column  dataField='PARENT_DEPT' caption="상위부서" alignment='center' width={120}>
				{/*<Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text"/>*/}
		   	</Column>
			<Column  dataField='LOCATION' caption="부서위치" alignment='left' width={100} />
			<Column  dataField='DEPT_MANAGER' caption="부서장" alignment='center' width={100}/>
			<Column  dataField='DEPT_EMP_QTY' caption="소속인원 수" alignment='center' width={120}/>			
			
			
		</DataGrid>
	)
}