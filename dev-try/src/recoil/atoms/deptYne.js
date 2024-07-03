import { atom } from 'recoil';

const keyword = atom({
	key: 'keywordState',
	default: '',
});

export default keyword;