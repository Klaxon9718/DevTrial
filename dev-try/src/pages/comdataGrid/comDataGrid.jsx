import React from 'react';
import DataGrid, {   Column,   Pager,   Paging,   FilterRow,   Lookup} from 'devextreme-react/data-grid';
import COMMON from '../../common/dataGrid'



export default function comDataGrid() {
 
	
	const data = ([
		{ id: 0, col1: '가 다', col2: '나', col3: '다', col4: '' },
		{ id: 1, col1: '가 다', col2: '나', col3: '카', col4: 'ex' },
		{ id: 2, col1: '나', col2: '다', col3: '키', col4: '' },
		{ id: 3, col1: '나', col2: '사', col3: '쿠', col4: 'ex' },
		{ id: 4, col1: '다다', col2: '가가', col3: '', col4: '' },
		{ id: 5, col1: '마', col2: '가가', col3: '케', col4: '' },
		{ id: 6, col1: '다다', col2: '파파', col3: '코', col4: '' }
	 ]);
   
	const mergeColums = [[0], [1]];

  return (
    <React.Fragment>
               <DataGrid
                  keyExpr={"id"}
                  className={'dx-card wide-card'}
                  showBorders={false}
                  focusedRowEnabled={true}
                  defaultFocusedRowIndex={0}
                  columnAutoWidth={true}
                  columnHidingEnabled={true}
                  dataSource={data}
                  showRowLines={true}
                  onCellPrepared={(...args) => COMMON.onCellPreparedCom(...args, mergeColums)} 
               >
				  {/*데이터 그리드의 값들과 셀 merge를 하고 싶은 칼럼 전달
				  https://js.devexpress.com/React/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onCellPrepared (셀 색상 변경 예제)
  					*/}  

               <Column caption="Test">
               <Column
                  dataField='col1'
                  width={120}        
               />       
               <Column
                  dataField='col2'                  
                  width={150}
               />
               </Column>
               <Column caption="Test2">
               <Column>
               
               
               </Column>

               <Column
                  dataField='col3'                  
                  width={350}
               />
               <Column
                  dataField='col4'                  
                  width={100}
               />
               </Column>
               </DataGrid>
    </React.Fragment>
)};