import * as pages from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const {HomePage, TasksPage, ProfilePage, DeptPage, CustomerPage, DeptYnePage} = pages

const routes = [
    {
        path: '/tasks',
        element: TasksPage,
        name: 'tasks'
    },
    {
        path: '/profile',
        element: ProfilePage,
        name: 'profile',
    },
    {
        path: '/home',
        element: HomePage,
        name: 'home',
    },
    {
        path: '/dept',
        element: DeptPage,
        name: '부서정보',
    },
	{
        path: '/customer',
        element: CustomerPage,
        name: '거래처정보',
    },
    {
        path: '/deptYne',
        element: DeptYnePage,
        name: '부서정보-yne',
    },
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
