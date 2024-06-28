import React from 'react';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';


export default function Customer() {
  // const [data, setData] = useState([]);
  	
  // useEffect(() => {
  // const fetchData = async() => {
  //       const res = await axios.get('https://localhost:3001/hello');
  //       return res.data;
  //     }	
      
  //     fetchData().then(res => setData(res));
  // }, []);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Customer</h2>

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
