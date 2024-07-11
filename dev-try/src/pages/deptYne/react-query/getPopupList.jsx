import axios from 'axios';

const getPopupList = async({ queryKey }) => {

    const [_key, param] = queryKey;

    const { data } = await axios.post('/deptYne/getPopup',  param );

    return data;
};

export default getPopupList;
