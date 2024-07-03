import React, { useMemo } from 'react';
import useCreateColumn from './useCreateColumn';

const columns = [
    {
        dataField: "DeptCode",
        caption: "부서코드",
        datatype: "string",
        width: 130,
    },
    {
        dataField: "DeptName",
        caption: "부서명",
        datatype: "string",
        width: 150,
    },
    {
        dataField: "ParentDept",
        caption: "상위부서",
        datatype: "string",
        width: 150,
    },
    {
        dataField: "DeptLocation",
        caption: "부서위치",
        datatype: "string",
        width: 180,
    },
    {
        dataField: "DeptHead",
        caption: "부서장",
        datatype: "string",
        width: 120,
    },
    {
        dataField: "DeptCnt",
        caption: "소속인원수",
        datatype: "number",
        width: 150,
    },

]

function RightBody(props) {
    const dataGrid = useCreateColumn(columns);
    
    return (
        <div className="contentbox">
            {dataGrid}
        </div>
    );
}

export default RightBody;