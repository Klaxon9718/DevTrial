import React from 'react';
import Header from './Header';
import Splitter, { Item } from 'devextreme-react/splitter';
import LeftBody from './LeftBody';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';

export default function DeptYne() {
  return (
    // <React.Fragment>: 여러 요소를 그룹화할 때 사용(<>으로 대체 가능, 불필요한 <div>사용 안해도 됨)
    <React.Fragment> 
      <Header />
         <Splitter
            width={"100%"}
            height={"680px"}
        >
            <Item resizable={false} size={"20%"}>
              <LeftBody />
            </Item>
            <Item size={"80%"}>
              {/* { 
              <DataGrid
                className={'dx-card wide-card'}
                showBorders={false}
                focusedRowEnabled={true}
                defaultFocusedRowIndex={0}
                columnAutoWidth={true}
                columnHidingEnabled={true}
              >
              </DataGrid> } */}
            </Item>
        </Splitter>
    </React.Fragment>
)};

