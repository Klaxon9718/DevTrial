import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './dx-styles.scss';
import LoadPanel from 'devextreme-react/load-panel';
import { NavigationProvider } from './contexts/navigation';
import { AuthProvider, useAuth } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import Content from './Content';
import UnauthenticatedContent from './UnauthenticatedContent';


import { RecoilRoot } from 'recoil';	// 상태관리 recoil
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";	//react-query 사용
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";  


const queryClient = new QueryClient();

// // React Query 기본 옵션 설정
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 	  queries: {
// 		refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 호출할 것인지
// 		retry: 0, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
// 	  },
// 	},
//   });


function App() {
	const { user, loading } = useAuth();

	if (loading) {
		return <LoadPanel visible={true} />;
	}

	if (user) {
		return <Content />;
	}

	return <UnauthenticatedContent />;
}

export default function Root() {
	const screenSizeClass = useScreenSizeClass();

	return (
		
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<Router>
						<AuthProvider>
							<NavigationProvider>
								<div className={`app ${screenSizeClass}`}>
									<App />
								</div>
							</NavigationProvider>
						</AuthProvider>
					</Router>
				</QueryClientProvider>
			</RecoilRoot>
	);
}
