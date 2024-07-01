import React, { useState, useRef, useEffect } from 'react';
import './searchPanel.scss'
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query'
import {selectedDeptTable} from '../../recoil/atoms/deptState' 


import TextBox, { TextBoxTypes } from 'devextreme-react/text-box';


export default function SearchPanel() {

	const [codeInput, setCodeInput] = useState('');		//부서코드 입력 textbox
	const [nameInput, setNameInput] = useState('');		//부서명 입력 textbox
  
	const setDeptTable = useSetRecoilState(selectedDeptTable);	//받아온 부서정보 recoil저장


	//dept정보 요청
	// refetch : useQuery를 다시 재실행 할 수 있도록 한다 (https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
	const { data , refetch: DataRefetch } = useQuery({
		queryKey: ['selectDept'],
		queryFn: async() => { 
			const response = await axios.post('/dept/selectDeptT', 
			{ dept_code: codeInput, 
			  dept_name: nameInput
			});
			// console.log("실행", codeInput, nameInput);

			//atom으로 상태 전달
			setDeptTable(response.data);
			console.log("SearchPanel useQuery 출력" , response.data);
			return response.data;
		 }
		});


	//엔티키 이벤트
	const handleEnterKeyPress = async (e) => {
		await DataRefetch();
	}

	//TextBox 변경 감지
	const onChangeInput = (e) => {
		const { name, text } = e.component.option();
		console.log("컴포넌트", name, text);
		if(name === "DEPT_CODE") {setCodeInput(text);}
		if(name === "DEPT_NAME") {setNameInput(text);}
	  };	


	return (
		<React.Fragment>
			<div className='section'>
				<h6 className='title'>부서정보</h6>
				<TextBox name='DEPT_CODE' placeholder="부서코드" className="text_box" onChange={onChangeInput} onEnterKey={handleEnterKeyPress}/>
				<TextBox name='DEPT_NAME' placeholder="부서 명" className="text_box" onChange={onChangeInput} onEnterKey={handleEnterKeyPress}/>
			</div>
		</React.Fragment >
	)
};
