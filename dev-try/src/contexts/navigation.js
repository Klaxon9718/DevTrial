import React, { useState, createContext, useContext, useEffect } from 'react';


const NavigationContext = createContext({});
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props) {
  const [navigationData, setNavigationData] = useState({ currentPath: '' });
  return (
    <NavigationContext.Provider
      value={{ navigationData, setNavigationData }}
      {...props}
    />
  );
}

//네비게이션 변화 감지
function withNavigationWatcher(Component, path) {
  const WrappedComponent = function (props) {
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData({ currentPath: path });
    }, [setNavigationData]);

    return <Component {...props} />;
  }
  return <WrappedComponent />;
}

export {
  NavigationProvider,
  useNavigation,
  withNavigationWatcher
}
