//라이브러리
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'

//Dev 컴포넌트
import TextBox from 'devextreme-react/cjs/text-box';
import TreeView from 'devextreme-react/tree-view';


export default function ComTreeView (props) {

		const getData = props.tossData;	//부모로부터 받아온 값
		//#region props 변수 설정
		const phCode = getData.phCode;		// 텍스트 박스 placeholder 코드힌트
		const phName = getData.phName;		// 텍스트 박스 placeholder 이름힌트

		const displayValue = getData.displayValue;	//트리뷰에 들어가는 데이터 값 + DB검색 용
		const displayText = getData.displayText;	// 트리뷰에 출력되는 내용 + DB검색 용
		const parentValue = getData.parentValue;	// 트리뷰 계층구조를 위해 설정되는 부모 노드 + DB검색 용

		const TableName = getData.TableName;	//DB 검색 테이블 명

		const Treewidth = (getData.Treewidth? getData.Treewidth : null);	//트리뷰 넓이
		const Treeheight = (getData.Treeheight? getData.Treeheight : null); //트리뷰 높이
		
		const TextCodeWidth = (getData.TextCodeWidth? getData.TextCodeWidth : null);	// 코드 텍스트박스 넓이
		const TextCodeHeight = (getData.TextCodeHeight? getData.TextCodeHeight : null); // 코드 텍스트박스 높이

		const TextNameWidth = (getData.TextNameWidth? getData.TextNameWidth : null);	// 네임 텍스트박스 넓이
		const TextNameHeight = (getData.TextNameHeight? getData.TextNameHeight : null);	// 네임 텍스트박스 높이
		//#endregion props 변수 설정

		const [codeInput, setCodeInput] = useState('');		//코드 텍스트박스 입력 값
		const [nameInput, setNameInput] = useState('');		//네임 텍스트박스 입력 값

		//TextBox 변경 감지
		const onChangeInput = (e) => {
			const { name, text } = e.component.option();
			// console.log("컴포넌트", name, text, displayValue);

			// 이벤트로 들어온 텍스트박스 이름과 설정해둔 텍스트박스 이름이 동일 할 경우 상태 변경
			if(name === displayValue) {setCodeInput(text);}
			if(name === displayText) {setNameInput(text);}
	  	};
		
		//엔티키 이벤트
		const handleEnterKeyPress = async (e) => {
			await DataRefetch();
		}

		//TreeView 데이터 요청 (body : 테이블명, 코드 칼럼, 네임 칼럼, 부모 칼럼)
		const { data: TreeData , refetch: DataRefetch } = useQuery({
			queryKey: ['selectDept'], 
			queryFn: async() => { 
				const response = await axios.post('/common/getComTreeViewList', 
					{ 	TableName: TableName, 	//테이블 명
						CodeCol: displayValue, 	//코드 칼럼
						NameCol: displayText, 	//네일 칼럼
						ParentCol: parentValue,	//부모 칼럼
						SearchCode: codeInput,	//코드 검색
						SearchName: nameInput,	//네임 검색
					});		
				return response.data;
				}
			});

		//부모에게 선택 값 전달
		const onClickTreeViewItem = (e) => {
			//console.log("선택", e.itemData);
			props.clickedItem(e.itemData);
		}
		

	return(
		<div>
			<div className="dx-field">
			<TextBox
					name={displayValue}
					placeholder={phCode}
					width={TextCodeWidth}
					height={TextCodeHeight}
					onChange={onChangeInput} onEnterKey={handleEnterKeyPress}
					> 
			</TextBox>

			<TextBox
					name={displayText}
					placeholder={phName}
					width={TextNameWidth}
					height={TextNameHeight}
					style={{ marginLeft: '1%' }}
					onChange={onChangeInput} onEnterKey={handleEnterKeyPress}
					> 
			</TextBox>
			</div>
		
		
			<TreeView 
				dataStructure="plain"
				dataSource={TreeData}
				displayExpr={displayText}
				parentIdExpr={parentValue}
				keyExpr={displayValue}
				width={Treewidth}
				height={Treeheight}
				expandedExpr="expanded"
				onItemClick={onClickTreeViewItem}
			/>			
		</div>
	)
}

/*
 [자식에서 부모로 데이터를 전송하는 방법]
→ 함수를 이용한다.

자식은 props를 사용해서 부모에게 데이터를 건네줄 수 없다.
따라서 부모가 함수를 넣어 props로 자식에게 넘겨주면, 자식이 데이터를 파라미터로 넣어 호출하는 방식으로 동작한다.

즉, 부모가 props로 함수를 넣어주면 자식이 그 함수를 이용해 값을 건네주는 방식이다.
https://technicolour.tistory.com/56
https://squirmm.tistory.com/entry/React-%EB%8B%A4%EB%A5%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90-%EC%A0%95%EB%B3%B4-%EC%A0%84%EB%8B%AC
 */