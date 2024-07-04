import Button from 'devextreme-react/button';
import Drawer from 'devextreme-react/drawer';
import { ScrollView } from 'devextreme-react/scroll-view';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Header, SideNavigationMenu, Footer } from '../../components';
import './side-nav-inner-toolbar.scss';
import { useScreenSize } from '../../utils/media-query';
import { Template } from 'devextreme-react/core/template';
import { useMenuPatch } from '../../utils/patches';
import { useRecoilState } from 'recoil';
import { selectedItem1 } from '../../recoil/atoms/deptState.js' 
import { currentpath_now } from '../../recoil/atoms/deptState.js' 

export default function SideNavInnerToolbar({ title, children, onnewitem }) {
  //test
  const [item1, setItem1] = useRecoilState(selectedItem1);
  const [currentPath_now, setCurrentPath_now] = useRecoilState(currentpath_now);
  //test끝
  const scrollViewRef = useRef(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed
  );

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    event.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus
    );
    return menuStatus === MenuStatus.Closed ? true : false;
  }, [isLarge, menuStatus]);

  const onNavigationChanged = useCallback(({ itemData, event, node }) => {
    if (menuStatus === MenuStatus.Closed || !itemData.path || node.selected) {
      
      event.preventDefault();
      return;
    }
    setItem1(!item1);
    setCurrentPath_now(JSON.stringify(itemData)); //recoil에서 props값을 직접 복사해서 변수에 넣어줄 때 오류발생함
                                                  //props를 저장하기 위해선 json형태로 복사해서 변수에 저장
	//console.log("SideNavInnerToolbar 진입");
	// navigate(); => 경로로 페이지 이동
    navigate(itemData.path);
    scrollViewRef.current.instance().scrollTo(0);

    if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
      setMenuStatus(MenuStatus.Closed);
      event.stopPropagation();
    }
  }, [navigate, menuStatus, isLarge]);

  return (
    <div className={'side-nav-inner-toolbar'}>
      <Drawer
        className={['drawer', patchCssClass].join(' ')}
        position={'before'}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? 'shrink' : 'overlap'}
        revealMode={isXSmall ? 'slide' : 'expand'}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template={'menu'}
      >
        <div className={'container'}>
          <Header
            menuToggleEnabled={isXSmall}
            toggleMenu={toggleMenu}
          />
          <ScrollView ref={scrollViewRef} className={'layout-body with-footer'}>
            <div className={'content'}>
              {React.Children.map(children, (item) => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className={'content-block'}>
              {React.Children.map(children, (item) => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name={'menu'}>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          >
            <Toolbar id={'navigation-header'}>
              {
                !isXSmall &&
                <Item
                  location={'before'}
                  cssClass={'menu-button'}
                >
                  <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
                </Item>
              }
              <Item location={'before'} cssClass={'header-title'} text={title} />
            </Toolbar>
          </SideNavigationMenu>
        </Template>
      </Drawer>
    </div>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3
};

