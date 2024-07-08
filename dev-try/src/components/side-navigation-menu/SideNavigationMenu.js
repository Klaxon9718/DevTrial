import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { TreeView } from 'devextreme-react/tree-view';
import { navigation } from '../../app-navigation';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './SideNavigationMenu.scss';
import { useRecoilState } from 'recoil';
import { currentpath_now } from '../../recoil/atoms/deptState.js' 

import * as events from 'devextreme/events';

export default function SideNavigationMenu(props) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady
  } = props;

  const { isLarge } = useScreenSize();
  function normalizePath () {
    return navigation.map((item) => (
      { ...item, expanded: isLarge, path: item.path && !(/^\//.test(item.path)) ? `/${item.path}` : item.path }
    ))
  }

  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { navigationData: { currentPath } } = useNavigation();
  const [currentPath_now, setCurrentPath_now] = useRecoilState(currentpath_now);
  const current = JSON.parse(currentPath_now);

  const treeViewRef = useRef(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback((element) => {
    const prevElement = wrapperRef.current;
    if (prevElement) {
      events.off(prevElement, 'dxclick');
    }

	//네비게이션 클릭 시 작동
    wrapperRef.current = element;
    events.on(element, 'dxclick', (e) => {
      openMenu(e);
    });
  }, [openMenu]);

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance();
    if (!treeView) {
      return;
    }
    //console.log('treeview ref = ', treeView);
    if (current !== undefined) {
      treeView.selectItem(current.path);
      treeView.expandItem(current.path);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath_now, compactMode]); //currentPath_now
  return (
    <div
      className={'dx-swatch-additional side-navigation-menu'}
      ref={getWrapperRef}
    >
      {children}
      <div className={'menu-container'}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={'100%'}
        />
      </div>
    </div>
  );
}
