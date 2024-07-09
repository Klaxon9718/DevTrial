const onCellPreparedCom = (cell, options) => {
	/*
	원본 글 : https://who-is-2t1.tistory.com/56
	  	1. 해당 예시에서는 “col1” 을 우선 병합하고,
		2. col1 + col4가 동일한 "col4"를 병합,
		3. col1 + col2 + col4 가 일치하는 "col2"가 있다면 병합합니다.
		우선순위 : col1[0], col4[3], col2[1]
	*/

	//인자로 가져온 행의 타입이 데이터 행인지 검사	
	if (cell.rowType == 'data') {	

		const mergeByColumnIndex = (columns, option) => {
			// console.log("mergeByColumnIndex columns : ", columns, " option : ", option);
			// if (cell.column.allowMerge && option.includes(cell.columnIndex)) {

			if (option.includes(cell.columnIndex)) {

				let r = cell.rowIndex; // 0에서 시작

				// c = columns값이 차례로 들어감
				const isSameCellDataRowUp = (c) => cell.component.cellValue(r - 1, c) == cell.component.cellValue(r, c);
				const isSameCellDataRowDown = (c) => cell.component.cellValue(r + 1, c) == cell.component.cellValue(r, c);


				if (cell.row.isNewRow) {	// 새로운 행일 경우 셀 병합 안함
					cell.cellElement.style.display = '';
				} else if (columns.every(isSameCellDataRowUp)) { // 자신 위의 데이터가 같으면 (인자로 받은 columns배열을 돌면서 조건 확인)
					cell.cellElement.style.display = 'none';	// 자기 셀 숨김
				} else {
					while (columns.every(isSameCellDataRowDown)) {	// r + 1과 r의 데이터가 같으면 span (인자로 받은 columns배열을 돌면서 조건 확인)
					r++;										//r 값을 올려, isSameCellDataRowDown 다음행 검사 
					cell.cellElement.rowSpan += 1;				//아래 행으로 셀 늘림
					}
				}
			}
		};
		//위의 mergeByColumnIndex

		let columns = [];	//옵션 수만큼 반복
		for (let option of options) {
			// console.log("포문 안에서",columns, option);
			columns = [...columns, ...option];	//배열에 추가 colums 0 => 0 ,1 이렇게 된다.
			mergeByColumnIndex(columns, option);
		}
	}
};

module.exports = {
	onCellPreparedCom,
}


/** [note]** 
1. .every() : every 안의 내용을 순회한다
	https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every 

2. 	참고자료
	cell.columnIndex : https://js.devexpress.com/React/Documentation/Guide/UI_Components/DataGrid/Columns/Column_and_Row_Indexes/
	row접근 : https://js.devexpress.com/React/Documentation/ApiReference/UI_Components/dxDataGrid/Row/#rowType

3. .cellValue() : 특정 행 인덱스와 데이터 필드, 열 캡션 또는 이름이 있는 셀의 값을 가져옴
	https://js.devexpress.com/React/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#cellValuerowIndex_dataField 
*/