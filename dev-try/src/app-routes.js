import * as pages from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const {HomePage, TasksPage, ProfilePage, DeptPage, CustomerPage, DeptYnePage, TestTreeView, ComDataGrid} = pages

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path: '/dept',
        element: DeptPage
    },
	{
        path: '/customer',
        element: CustomerPage
    },
    {
        path: '/deptYne',
        element: DeptYnePage
    },
	{
        path: '/treeview',
        element: TestTreeView
    },
	{
        path: '/comDataGrid',
        element: ComDataGrid
    },
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
