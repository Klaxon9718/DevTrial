import * as pages from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const {HomePage, TasksPage, ProfilePage, DeptPage, CustomerPage} = pages

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
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
