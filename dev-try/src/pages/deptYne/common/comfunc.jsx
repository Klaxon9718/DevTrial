
// 공통 팝업 props
export default function createPopupProps(getClickedItem, popupVisible, setPopupVisible, windowName, codeLabel, nameLabel, tableName, codeColumn, nameColumn) {
    return {
        getClickedItem,
        popupVisible,
        setPopupVisible,
        windowName,
        codeLabel,
        nameLabel,
        tableName,
        codeColumn,
        nameColumn,
    };
}