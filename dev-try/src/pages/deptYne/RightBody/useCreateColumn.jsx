import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DataGrid, { Column, Editing, SearchPanel, HeaderFilter, Selection,} from 'devextreme-react/data-grid';
import './useCreateColumn.css';
import themes from 'devextreme/ui/themes';
import { useRecoilState } from 'recoil';
import getDeptSearch from '../react-query/getDeptSearch';
import keywordState from '../../../recoil/atoms/deptYne'
import columnState from '../../../recoil/atoms/deptYneColumn.js'
import deptSave from '../react-query/deptSave.jsx';

const selectAllFieldLabel = { 'aria-label': 'Select All Mode' };
const showCheckboxesFieldLabel = { 'aria-label': 'Show Checkboxes Mode' };
const showCheckBoxesModes = ['none', 'onClick', 'onLongTap', 'always'];
const selectAllModes = ['allPages', 'page'];

function useCreateColumn(props) {

    const [allMode, setAllMode] = useState('allPages');
    const [checkBoxesMode, setCheckBoxesMode] = useState(
      themes.current().startsWith('material') ? 'always' : 'onClick',
    );
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [column, setColumn] = useRecoilState(columnState);
    const param = {column: column, keyword: keyword};

    const { data, error, isLoading } = useQuery({
        queryKey: ['deptSearch', param],
        queryFn: getDeptSearch,
        retry: 3,   //실패 시 재시도 횟수
        refetchOnWindowFocus: false, // 창 포커스 시 데이터 리패치 비활성화
    });

    const onCheckBoxesModeChanged = useCallback(({ value }) => {
      setCheckBoxesMode(value);
    }, []);
    const onAllModeChanged = useCallback(({ value }) => {
      setAllMode(value);
    }, []);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deptSave, 
		onSuccess: () => {
			queryClient.invalidateQueries(['deptSearch']);
		},
	});

    const onSaving = useCallback((e) => {
        const changes = e.changes;

        if(changes.length > 0){
            const { type, data } = changes[0];
            if(type === 'insert'){
                mutation.mutate( data );
                console.log("타입 : " + type + ", 데이터: " + JSON.stringify(data, null, 2));
            }
            else if(type === 'update')
                console.log("타입: " + type + ", 데이터: " + JSON.stringify(changes, null, 2));
        }
      }, []);

    const columns = props;
    return (
        <DataGrid
            showBorders={false}
            focusedRowEnabled={true}
            columnAutoWidth={false}
            columnHidingEnabled={true}
            dataSource={data}
            height={"100%"}
            keyExpr="DeptCode"
            color
            allowColumnResizing={true}
            onSaving={onSaving}
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