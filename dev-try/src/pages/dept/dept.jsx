//파일 import
import './dept.scss';

//라이브러리
import React from 'react';

//컴포넌트
import SearchPanel from './searchPanel';
import DeptList from './components/deptList';
import DeptTable from './components/deptTable';

//Dev컴포넌트
import Splitter, { Item } from 'devextreme-react/splitter';



export default function Dept() {
		
		console.log("dept쪽 ", );

	return (
		<React.Fragment>
			<SearchPanel/>
				<Splitter >
					<Item
						resizable={true}
						size="250px"
						text="panel 1">
						<DeptList/>
					</Item>

					<Item
						resizable={true}>	
						<DeptTable/>			
					</Item>
				</Splitter>
		</React.Fragment >
	)
};
