import React from 'react';
import Header from './Header/Header';
import Splitter, { Item } from 'devextreme-react/splitter';
import LeftBody from './LeftBody/LeftBody';
import RightBody from './RightBody/RightBody';

export default function DeptYne() {

  return (
    // <React.Fragment>: 여러 요소를 그룹화할 때 사용(<>으로 대체 가능, 불필요한 <div>사용 안해도 됨)
    <React.Fragment> 
      <Header />
         <Splitter
            width={"100%"}
            height={"800px"}>
            <Item resizable={false} size={"18%"}>
              <LeftBody />
            </Item>
            <Item size={"82%"}>
              <RightBody />
            </Item>
        </Splitter>
    </React.Fragment>
)};

