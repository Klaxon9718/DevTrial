import React, {useMemo, useState} from 'react';
import { List } from 'devextreme-react/list';

import Home from './pages/home/home.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import routes from './app-routes.js';
import {currentpath_now} from './recoil/atoms/deptState.js' 
import { useRecoilState, useRecoilValue } from 'recoil';
function itemRender(data) {
  return <div>{data.Subject}</div>;
}
function PageTemplate(props) {
  //const navigate = useNavigate();
  //const tasks = service.getTasks().filter((task) => task.EmployeeID === props.data.ID);
  // const {
  //   FirstName, LastName, Picture, Position, Notes,
  // } = props.data;
  //const completedTasks = tasks.filter((task) => task.Status === 'Completed');
  // const testmemo = useMemo(
  //   () => {
  //     return {data: props.data,
  //     index: props.index,
  //     onRendered: props.onRendered}
  //   },
  //   [props]
  // );
  // console.log("testmemo : ", testmemo);
  
  console.log("pagetemp : ", props);


  return (
    <React.Fragment>    {/*탭 안에 내용 */}
        <Routes>
        {/* <Route
            key={props.data.path}
            path={props.data.path}
            element={props.data.element}
          /> */}
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
        
        {/* <Route
          path='*'
          element={<Navigate to={props.data.path} />}
        /> */}
      </Routes>
      {/* <div className="employeeInfo">
        <img
          alt={`${FirstName} ${LastName}`}
          className="employeePhoto"
          src={Picture}
        />
        <p className="employeeNotes">
          <b>{`Position: ${Position}`}</b>
          <br />
          {Notes}
        </p>
      </div>
      <div className="caption">{`${FirstName} ${LastName}'s Tasks:`}</div>
      <div className="task-list">
        <List
          dataSource={tasks}
          showSelectionControls={true}
          selectedItems={completedTasks}
          disabled={true}
          selectionMode="multiple"
          itemRender={itemRender}
        ></List>
      </div> */}
    </React.Fragment>
  );
}
export default React.memo(PageTemplate);
