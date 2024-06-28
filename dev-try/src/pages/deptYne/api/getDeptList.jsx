import axios from 'axios';

const getDeptList = async() => {
    const { data } = await axios.get('/deptYne');
    return data;
};

export default getDeptList;
