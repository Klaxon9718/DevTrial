import React from 'react';
import './LeftBody.css';
import { TreeView } from 'devextreme-react/tree-view';

function LeftBody(props) {
    return (
        <div className="contentbox">
            <TreeView 
            id="treeView"
        />
        </div>
    );
}

export default LeftBody;