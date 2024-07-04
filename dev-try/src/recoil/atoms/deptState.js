import { atom, selector } from 'recoil';

// 전역 상태 정의
export const selectedDeptTable = atom({
  key: 'selectedDeptState',
  default: [],
});

// 선택된 부서 데이터 가져오는 selector
export const selectedDeptSelector = selector({
  key: 'selectedDeptSelector',
  get: ({ get }) => {
    const dept = get(selectedDeptTable);
    return dept;
  },
});

//test
export const selectedItem1 = atom({
  key: 'selectedItem1',
  default: false,
});

export const selectedItem1Selector = selector({
  key: 'selectedItem1Selector',
  get: ({ get }) => {
    const sitem = get(selectedItem1);
    return sitem;
  },
});

export const currentpath_now = atom({
  key: 'currentpath_now',
  default: JSON.stringify([]),
});

export const currentpath_nowSelector = selector({
  key: 'currentpath_nowSelector',
  get: ({ get }) => {
    const sitem = get(currentpath_now);
    return sitem;
  },
});
//test끝