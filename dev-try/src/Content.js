import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import { SideNavInnerToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';
import pageTemplate from './PageTemplate.js';
import TabPanel from 'devextreme-react/tab-panel'
import React , { useCallback, useState, useEffect, useRef } from 'react';

import 'devextreme/data/odata/store';
import { useNavigate } from 'react-router';
import { useNavigation } from './contexts/navigation.js';

const allTabpage = routes;
export default function Content() {
  const navigate = useNavigate();
  const { navigationData: { currentPath } } = useNavigation();
  const [route, setRoute] = useState(routes[2]);
  const [tabpage, setTabpage] = useState(allTabpage);
  const [selectedItem, setSelectedItem] = useState(routes[routes.findIndex((item) => item.path === '/home')]);
  const addButtonHandler = useCallback(() => {
    const newItem = routes[routes.findIndex((item) => item.path === currentPath)];
    
    setTabpage([...tabpage, newItem]);
    setSelectedItem(newItem);
  }, [tabpage, setTabpage, setSelectedItem]);
  const tabRef = useRef(null); //탭 화면

  //test
  const location = useLocation();
  const [flag, setFlag] = useState(false);
  //test 끝

  const closeButtonHandler = useCallback(
    (item) => {
      const newRoute = [...tabpage];
      const index = newRoute.indexOf(item);
      newRoute.splice(index, 1);
      setTabpage(newRoute);
      if (newRoute.length === 0){
        setFlag(true);
      }
      if (index >= newRoute.length && index > 0) {  //마지막 탭 닫기 버튼 눌렀을 때
        navigate(newRoute[index - 1].path);
        setSelectedItem(newRoute[index - 1]);
      }
      else if (index >= 0) { //중간 탭 닫기 버튼 눌렀을 때
        //todo : index 0일때 path오류 해결해야됨
        if (newRoute.length !== 0) {
          navigate(newRoute[index].path);
          setSelectedItem(newRoute[index]);
        }
      }

    },
    [],
  );

  const renderTitle = useCallback(
    (data) => (
      <React.Fragment>
        <span>
          {data.path}
        </span>
        {  (
          <i
            className="dx-icon dx-icon-close"
            onClick={() => {
              closeButtonHandler(data);
            }}
          />
        )}
        
      </React.Fragment>
    ),
    [routes, closeButtonHandler],
  );
  const onSelectionChanged = useCallback(
    (args) => {
      setSelectedItem(args.addedItems[0]);   
      navigate(args.addedItems[0].path);
      // console.log("selected item = ", selectedItem);
      // console.log(args.addedItems[0]);
    },
    [setSelectedItem],
    
  );
  useEffect(() => {
    //const tabView = tabRef.current && tabRef.current.instance();
    // if (!tabView) {
    //   return;
    // }

    if (currentPath !== undefined) {
      const index = routes.findIndex((item) => item.path === currentPath);
      const newItem = routes[index];

      //현재 주소가 undefined가 아닐경우
      for(var i=0; i<tabpage.length; i++){
        if (tabpage[i].path === currentPath){
          setSelectedItem(newItem); 
          return;
        }
      }
      // if (tabpage.length === 0){
      //   return;
      // }
      if (newItem !== undefined){
        if (tabpage.length === 0){
          setTabpage([newItem]);
        }
        else{
          setTabpage([...tabpage, newItem]);
          setSelectedItem(newItem);
          setFlag(false);  
        }
      
      }
      else{
        
      }
      //const newRoute = [...tabpage];
      //newRoute.splice(index, 1);
    }

  }, [currentPath]);
  useEffect (() => {
    if (tabpage.length === 0){
      setFlag(true);
    }
    
  }, [location])

  return (
    <SideNavBarLayout title={appInfo.title}>
      
      <TabPanel
        noDataText='데이터 없음'
        dataSource={tabpage}
        height={1000}
        itemTitleRender={renderTitle}
        deferRendering={false}
        showNavButtons={true}
        selectedItem={selectedItem}
        repaintChangesOnly={true}
        onSelectionChanged={onSelectionChanged}
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
