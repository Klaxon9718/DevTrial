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
