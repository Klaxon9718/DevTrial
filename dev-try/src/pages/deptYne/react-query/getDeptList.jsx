import axios from 'axios';

const getDeptList = async({ queryKey }) => {

    const [_key, param] = queryKey;

    const { data } = await axios.get('/deptYne', { params: {param}});
    // params의 옵션은 객체로 전달해야 함
    // 내부적으로 "param=안녕하세유" 이런 형태로 전해짐

    return data;
};

export default getDeptList;
