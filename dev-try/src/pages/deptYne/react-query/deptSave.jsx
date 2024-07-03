import axios from 'axios';

const deptSave = async({ dept }) => {
    const { data } = await axios.post('/deptYne/save', dept);
    return data;
};

export default deptSave;
