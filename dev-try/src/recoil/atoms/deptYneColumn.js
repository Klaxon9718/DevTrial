import { atom } from 'recoil';

// atom 정의
const column = atom({
	key: 'columnState',
	default: 'DEPT_CODE',
});

export default column;