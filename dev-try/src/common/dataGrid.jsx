const onCellPreparedCom = (cell, options) => {
	
	//setdata([[0], [3], [1]]);
	/**https://who-is-2t1.tistory.com/56
	  * 1. 해당 예시에서는 “col1” 을 우선 병합하고,
		2. col1 + col4가 동일한 "col4"를 병합,
		3. col1 + col2 + col4 가 일치하는 "col2"가 있다면 병합합니다.
		우선순위 : col1[0], col4[3], col2[1]
	*/
	
	//인자로 가져온 행의 타입이 데이터 행인지 검사
	// https://js.devexpress.com/React/Documentation/ApiReference/UI_Components/dxDataGrid/Row/#rowType
	if (cell.rowType == 'data') {	

		const mergeByColumnIndex = (columns, option) => {
			// console.log("mergeByColumnIndex columns : ", columns, " option : ", option);
			// if (cell.column.allowMerge && option.includes(cell.columnIndex)) {
			if (option.includes(cell.columnIndex)) {
				//cell.columnIndex = 
				//https://js.devexpress.com/React/Documentation/Guide/UI_Components/DataGrid/Columns/Column_and_Row_Indexes/
				let r = cell.rowIndex;

				const isSameCellDataRowUp = (c) => cell.component.cellValue(r - 1, c) == cell.component.cellValue(r, c);
				const isSameCellDataRowDown = (c) => cell.component.cellValue(r + 1, c) == cell.component.cellValue(r, c);
		
				//.every() : every 안의 내용을 순회한다
				//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every
				if (columns.every(isSameCellDataRowUp)) { // r-1의 데이터와 r의 데이터가 같으면 none
					cell.cellElement.style.display = 'none';
				} else {
					while (columns.every(isSameCellDataRowDown)) {	// r + 1과 r의 데이터가 같으면 span
					r++;
					cell.cellElement.rowSpan += 1;
					}
				}
			}
		};

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