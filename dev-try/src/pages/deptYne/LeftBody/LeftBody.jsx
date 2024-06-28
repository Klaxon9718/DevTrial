import React from 'react';
import './LeftBody.css';
import { TreeView } from 'devextreme-react/tree-view';
import { useQuery } from '@tanstack/react-query';
import getDeptList from '../api/getDeptList';


function LeftBody(props) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['deptList'],
        queryFn: getDeptList,
    });

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;

    return (
        <div className="contentbox">
            <TreeView 
                id="treeView"
                items={data}
            />
        </div>
    );
}

export default LeftBody;