export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },


  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      }
    ]
  },


  {
    text: '테스트 화면',
    icon: 'folder',
	items: [
		{
			text:'부서정보',
			path: '/dept',
		},
		{
			text:'거래처정보',
			path: '/customer',
		},
    	{
			text:'부서정보-yne',
			path: '/deptYne',
		},
		{
			text:'트리뷰 작성',
			path: '/treeview',
		},
		{
			text:'cell병합',
			path: '/comDataGrid',
		},
	]
  },

  ];
