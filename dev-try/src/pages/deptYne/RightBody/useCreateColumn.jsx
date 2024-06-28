import React, { useState, useEffect, useCallback } from 'react';
import DataGrid, {
    Column,
    Editing,
    FilterRow,
    SearchPanel,
    HeaderFilter,
    Selection,
    Pager,
    Paging,
    Lookup
  } from 'devextreme-react/data-grid';
  import data from './grid-data.js';
  import './useCreateColumn.css';
  import themes from 'devextreme/ui/themes';

const selectAllFieldLabel = { 'aria-label': 'Select All Mode' };
const showCheckboxesFieldLabel = { 'aria-label': 'Show Checkboxes Mode' };
const showCheckBoxesModes = ['none', 'onClick', 'onLongTap', 'always'];
const selectAllModes = ['allPages', 'page'];

function useCreateColumn(props) {
    const [allMode, setAllMode] = useState('allPages');
    const [checkBoxesMode, setCheckBoxesMode] = useState(
      themes.current().startsWith('material') ? 'always' : 'onClick',
    );
    const onCheckBoxesModeChanged = useCallback(({ value }) => {
      setCheckBoxesMode(value);
    }, []);
    const onAllModeChanged = useCallback(({ value }) => {
      setAllMode(value);
    }, []);

    const columns = props;
    return (
        <DataGrid
            showBorders={false}
            focusedRowEnabled={true}
            defaultFocusedRowIndex={0}
            columnAutoWidth={false}
            columnHidingEnabled={true}
            dataSource={data}
            height={"100%"}
            keyExpr="DeptCode"
            color
            allowColumnResizing={true}
        >
             <Selection
                mode="multiple"
                selectAllMode={allMode}
                showCheckBoxesMode={checkBoxesMode}
            />
            <Editing
                mode="form"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
            />
            <HeaderFilter visible={true} />
            <SearchPanel visible={true} />

            {columns.map((column, index) => (
                <Column 
                    key={index}
                    dataField={column.dataField}
                    caption={column.caption}
                    datatype={column.datatype}
                    alignment="center"
                    width={column.width}
                />
            ))}
        </DataGrid>
    );
}

export default useCreateColumn;