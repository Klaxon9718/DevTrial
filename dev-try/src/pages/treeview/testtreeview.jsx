//파일 import
import ComTreeView from './comtreeview';


//#region 테스트용 객체 childSetting, childSetting1
//테스트1
const childSetting = {
	phCode:'코드',		// 텍스트 박스 placeholder 코드힌트 + 검색 값
	phName:'이름',		// 텍스트 박스 placeholder 이름힌트 + 검색 값

	displayValue: 'DEPT_CODE',	//트리뷰에 들어가는 데이터 값 + DB검색 용
	displayText: 'DEPT_NAME',	// 트리뷰에 출력되는 내용 + DB검색 용
	parentValue: 'PARENT_DEPT', // 트리뷰 계층구조를 위해 설정되는 부모 노드 + DB검색 용

	TableName: 'DEPT',	// DB 검색 테이블 명
	
	Treewidth: '250', //Treeheight: null,	// 트리뷰 크기 설정 (넓이: 권장 / 높이: 옵션)
	// TextCodeWidth: '', TextCodeHeight: '',	//코드 텍스트박스 크기 설정 (넓이: 옵션 / 높이: 지양)
	// TextNameWidth: '', TextNameHeight: '',	//네임 텍스트박스 크기 설정 (넓이: 옵션 / 높이: 지양)

}

//테스트2
const childSetting1 = {
	phCode:'테스트코드',		// 텍스트 박스 placeholder 코드힌트 + 검색 값
	phName:'테스트이름',		// 텍스트 박스 placeholder 이름힌트 + 검색 값

	displayValue: 'ID',	//트리뷰에 들어가는 데이터 값 + DB검색 용
	displayText: 'PERSON',	// 트리뷰에 출력되는 내용 + DB검색 용
	parentValue: 'PARENT', // 트리뷰 계층구조를 위해 설정되는 부모 노드 + DB검색 용

	TableName: 'test_recursive',	// DB 검색 테이블 명
	
	Treewidth: '250', //Treeheight: null,	// 트리뷰 크기 설정 (넓이: 권장 / 높이: 옵션)
	// TextCodeWidth: '', TextCodeHeight: '',	//코드 텍스트박스 크기 설정 (넓이: 옵션 / 높이: 지양)
	// TextNameWidth: '', TextNameHeight: '',	//네임 텍스트박스 크기 설정 (넓이: 옵션 / 높이: 지양)

}
//#endregion


export default function TestTreeView() {

	//ComTreeView(자식으로부터 받아온 값) 출력 및 활용
	function getClickedItem (item) {
		console.log("자식 선택 item 출력", item);
	}

	return(
		<div>
			<ComTreeView tossData={childSetting1} clickedItem={getClickedItem}/>
		</div>
	)
}
