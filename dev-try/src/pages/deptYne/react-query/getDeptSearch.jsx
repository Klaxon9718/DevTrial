import axios from 'axios';

const getDeptSearch = async({ queryKey }) => {
    const [_key, param] = queryKey;

    const { data } = await axios.get('/deptYne/search', { params: {param}});

    return data;
};

export default getDeptSearch;
