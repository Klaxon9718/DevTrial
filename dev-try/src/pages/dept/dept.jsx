import React from 'react';
import './dept.scss';
import SearchPanel from './searchPanel';

import DataGrid, {	Column,	Pager,	Paging,	FilterRow,	Lookup} from 'devextreme-react/data-grid';
import TreeView from 'devextreme-react/tree-view';
import Splitter, { Item } from 'devextreme-react/splitter';
import { useRecoilState } from 'recoil';
import {selectedDeptTable} from '../../recoil/atoms/deptState' 

const PaneContentWithTitle = () => {
	return <div><DataGrid
		className={'dx-card wide-card'}
		showBorders={false}
		focusedRowEnabled={true}
		defaultFocusedRowIndex={0}
		columnAutoWidth={true}
		columnHidingEnabled={true}
	>

	</DataGrid></div>
}


export default function Dept() {

	const [deptT, setDeptT] = useRecoilState(selectedDeptTable);

	console.log("dept에서 출력", deptT);

	return (
		<React.Fragment>
			
			<SearchPanel/>

			<Splitter >
				<Item
					resizable={true}
					size="250px"
					text="panel 1">
						<TreeView
							id="tree-view"
							items={deptT}
							dataStructure="plain"
							displayExpr="DEPT_NAME"
							parentIdExpr="PARENT_DEPT"
							keyExpr="DEPT_CODE"
							width={250}
						></TreeView>
				</Item>

				<Item
					resizable={true}
					render={PaneContentWithTitle}>

					<DataGrid
						className={'dx-card wide-card'}
						showBorders={false}
						focusedRowEnabled={true}
						defaultFocusedRowIndex={0}
						columnAutoWidth={true}
						columnHidingEnabled={true}
					>

					</DataGrid>
				</Item>
			</Splitter>
		</React.Fragment >
	)
};

