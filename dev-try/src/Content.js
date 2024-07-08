import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import { SideNavInnerToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';
import pageTemplate from './PageTemplate.js';
import TabPanel, { Item } from 'devextreme-react/tab-panel'
import React , { useCallback, useState, useEffect, useRef, useMemo } from 'react';

import 'devextreme/data/odata/store';
import { useNavigate } from 'react-router';
import { useNavigation } from './contexts/navigation.js';
import {selectedItem1} from './recoil/atoms/deptState.js'
import {currentpath_now} from './recoil/atoms/deptState.js' 
import { useRecoilState, useRecoilValue } from 'recoil';
import { TabPanelOptions } from 'devextreme-react/cjs/form.js';


const allTabpage = routes;
export default function Content(props) {
  const navigate = useNavigate();
  //const { navigationData: { currentPath } } = useNavigation();
  const [route, setRoute] = useState(routes[2]);
  const [tabpage, setTabpage] = useState(allTabpage.slice(0,3));
  const [selectedItem, setSelectedItem] = useState(routes[routes.findIndex((item) => item.path === '/home')]);
  // const addButtonHandler = useCallback(() => {
  //   const newItem = routes[routes.findIndex((item) => item.path === currentPath)];
    
  //   setTabpage([...tabpage, newItem]);
  //   setSelectedItem(newItem);
  // }, [tabpage, setTabpage, setSelectedItem]);
  const tabRef = useRef(null); //탭 화면

  //test
  const location = useLocation();
  const [flag, setFlag] = useState(false);
  const onnewitem = useCallback(

  )
  //const [prevPath, setPrevPath] = useState(currentPath);
  const [item1, setItem1] = useRecoilState(selectedItem1);
  const test = useRecoilValue(selectedItem1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMounted = useRef(false);
  const [currentPath_now, setCurrentPath_now] = useRecoilState(currentpath_now);
  const testEventHandler = useCallback((e) => {
    console.log("테스트 : ", e);
}, []);

  const changeTitle = useCallback((id, title) => {
    const opt = tabRef.current?.instance.option();
    const index = opt?.items?.findIndex((value) => value.id === id);
    if (index === -1) {
      return;
    }
    tabRef.current?.instance.option(`items[${index}].title`, title);
  }, [currentPath_now]);
  //test 끝

  const closeButtonHandler = useCallback(
    (item) => {
      
      const newRoute = [...tabpage];
      const index = newRoute.indexOf(item);
      console.log('지울 탭 : ', newRoute[index]);
      newRoute.splice(index, 1);
      setTabpage(newRoute);
      if (newRoute.length === 0) {
        setCurrentPath_now(JSON.stringify(routes[2]));
      }
      if (index >= newRoute.length && index > 0) {  //마지막 탭 닫기 버튼 눌렀을 때
        
        navigate(newRoute[index - 1].path);
        setSelectedItem(newRoute[index - 1]);
        setCurrentPath_now(JSON.stringify(newRoute[index-1]));
        setSelectedIndex(index-1);
      }
      else if (index >= 0) { //중간 탭 닫기 버튼 눌렀을 때
        if (newRoute.length !== 0) {
          navigate(newRoute[index].path);
          setSelectedItem(newRoute[index]);
          setCurrentPath_now(JSON.stringify(newRoute[index]));
          setSelectedIndex(index);
        }
      }

      //240708 todo 탭을 전부 종료했을 때 사이드바 선택해제
    },
    [tabpage],
  );

  const renderTitle = useCallback(  //처음 동작시 TITLE을 설정해줄 때 한번 더 랜더링됨
    (data) => (
      ///console.log('data = ', tabpage),
      <React.Fragment>
        <span>
          {data.name}
        </span>
        {(
          <i
            className="dx-icon dx-icon-close"
            onClick={() => {
              closeButtonHandler(data);
            }}
          />
        )}
        
      </React.Fragment>
    ),
    [closeButtonHandler],
  );
  const onSelectionChanged = useCallback(
    (args) => {
      //console.log(tabpage);
      //setSelectedIndex(tabpage.findIndex((item) => item.path === args.addedItems[0].path));
      setSelectedItem(args.addedItems[0]);   //탭바에서 눌렀을 때 여기서 탭만큼 호출 해결! 여기 주석처리하면됨
      navigate(args.addedItems[0].path);
      //changeTitle(args.addedItems[0].path, renderTitle)
      setCurrentPath_now(JSON.stringify(args.addedItems[0]));
    },
    [],
  );
  useEffect(() => {
    //tabpage.findIndex((item) => {item.path === currentPath_now});
    if (isMounted.current){
      const current = JSON.parse(currentPath_now);
      const index = routes.findIndex((item) => item.path === current.path);
      const newItem = routes[index];
      const tabpageIndex = tabpage.findIndex((item) => item.path === current.path);
      const tab = tabRef.current && tabRef.current.instance();
      if (newItem !== undefined){
        if (tabpageIndex >= 0) { //사이드바 클릭시 활성화된 탭이 이미 있는경우
          //tab.selectedItem(newItem);
          //console.log("selecteditem = ", tabRef.current.selectedIndex = tabpageIndex);
          //setSelectedIndex(tabpageIndex);
          setSelectedItem(newItem);
          
        }
        else {  //활성화된 탭이 없는 경우
          setTabpage([...tabpage, newItem]);
          //setSelectedIndex(tabpageIndex);
          setSelectedItem(newItem);
        }
      }
    }
    else {
      isMounted.current = true;
    }
    
    
    
    // if (){
    // console.log('current path : ', currentPath);
    // console.log('current path now : ', currentPath_now);
    // }
    // const tabView = tabRef.current && tabRef.current.instance();
    // if (!tabView) {
    //   tabRef.selectedItem = selectedItem;
    // }
    // if (currentPath !== undefined) {
    //   console.log("tabpage : ", tabpage);
    //   const index = routes.findIndex((item) => item.path === currentPath);
    //   const newItem = routes[index];
    //   //현재 주소가 undefined가 아닐경우
    //   for (var i = 0; i < tabpage.length; i++) {
    //     if (tabpage[i].path === currentPath) {
    //       // console.log('currentPath_now : ', currentPath_now);
    //       // console.log('currentpath : ', currentPath);
    //       // console.log("tabpage[i].path : ", tabpage[i].path);
    //       setSelectedItem(newItem);   //사이드 네비바에서 눌렀을 때 여기서 2번 호출
    //       return;
    //     }
    //   }
    //   // if (tabpage.length === 0){
    //   //   return;
    //   // }
    //   console.log("newitem : ", newItem);
    //   if (newItem !== undefined) {
    //     console.log("여기");
    //     if (tabpage.length === 0) {
          
    //       setTabpage([newItem]);
    //     }
    //     else {
    //       setTabpage([...tabpage, newItem]);
          
    //       setSelectedItem(newItem);
    //     }

    //   }
      // else {
      //   isMounted.current = true;
      // }
      //const newRoute = [...tabpage];
      //newRoute.splice(index, 1);
    // }

  }, [currentPath_now]); //currentPath_now

  
  return (    
    <SideNavBarLayout title={appInfo.title}>
      
        {/* <TabPanel
        ref={tabRef}
        noDataText='데이터 없음'
        dataSource={tabpage}
        height={1000}
        itemTitleRender={renderTitle}
        onItemRendered={testEventHandler}
        deferRendering={true}
        showNavButtons={true}
        selectedItem={selectedItem}
        repaintChangesOnly={true}
        onSelectionChanged={onSelectionChanged}
        itemComponent={pageTemplate}
        /> */}
        
        <TabPanel
          ref={tabRef}
          keyExpr={'path'}
          width="100%"
          height="100%"
          itemTitleRender={renderTitle}
          //items={tabpage}
          animationEnabled={true}
          swipeEnabled={true}
          dataSource={tabpage}
          tabsPosition={'top'}
          //stylingMode={'primary'}          
          repaintChangesOnly={true}
          deferRendering={true}
          onSelectionChanged={onSelectionChanged}
          selectedItem={selectedItem}
          itemComponent={pageTemplate}
        />
      
      {/* <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
        <Route
          path='*'
          element={<Navigate to='/home' />}
        />
      </Routes> */}
      
      <Footer>
        Copyright © 2011-{new Date().getFullYear()} {appInfo.title} Inc.
        <br />
        All trademarks or registered trademarks are property of their
        respective owners.
      </Footer>
      </SideNavBarLayout>      
  );
}
