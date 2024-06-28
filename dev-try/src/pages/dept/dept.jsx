import React from 'react';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';

export default function Dept() {
  return (
    <React.Fragment>
      <h2 className={'content-block'}>dept</h2>

      <DataGrid
        className={'dx-card wide-card'}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
      </DataGrid>
    </React.Fragment>
)};
