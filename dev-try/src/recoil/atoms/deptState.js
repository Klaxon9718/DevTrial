import { atom, selector } from 'recoil';

// 전역 상태 정의

// deptList 출력을 위한 상태
export const selectedDeptTable = atom({
  key: 'selectedDeptState',
  default: [],
});

// deptList에서 선택된 부서 상태
export const clickDeptItem = atom({
	key: 'clickDeptItem',
	default: '',
  });


//선택된 부서 테이블 데이터 가져오는 상태
export const getDeptTableData = atom({
	key: 'getDeptTableData',
	default: [],
})

// // 선택된 부서 데이터 가져오는 selector
// export const selectedDeptSelector = selector({
//   key: 'selectedDeptSelector',
//   get: ({ get }) => {
//     const dept = get(selectedDeptTable);
//     return dept;
//   },
// });
