import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faThumbtack, faMagnifyingGlass, faFolder, faFaceLaughSquint } from '@fortawesome/free-solid-svg-icons';

const BotNav = () => {
  const location = useLocation();

  // 현재 경로를 기준으로 활성화된 링크의 텍스트 색상을 결정하는 함수
  const getTextColor = (path) => {
    return location.pathname === path ? 'text-white' : 'text-dark';
  };

  return (
    <div className='botNav ps-3 pe-3 pt-2 pb-2 d-flex justify-content-around align-items-center'>
      <Nav className="w-100 justify-content-around" >
        <NavLink
          style={{textDecoration: 'none'}}
          className={`d-flex flex-column align-items-center nav-item ${getTextColor('/subscribe')}`}
          to="/subscribe"
        >
          <FontAwesomeIcon icon={faThumbtack} style={{ fontSize: '30px' }} />
          <p style={{ margin: 0, fontSize: '14px' }}>구독</p>
        </NavLink>
        <NavLink
          style={{textDecoration: 'none'}}
          className={`d-flex flex-column align-items-center nav-item ${getTextColor('/individualPurchase')}`}
          to="/individualPurchase"
        >
          <FontAwesomeIcon icon={faTv} style={{ fontSize: '30px' }} />
          <p style={{ margin: 0, fontSize: '14px' }}>개별구매</p>
        </NavLink>
        <NavLink
          style={{textDecoration: 'none'}}
          className={`d-flex flex-column align-items-center nav-item ${getTextColor('/webtoon')}`}
          to="/webtoon"
        >
          <FontAwesomeIcon icon={faFaceLaughSquint} style={{ fontSize: '30px' }} />
          <p style={{ margin: 0, fontSize: '14px' }}>웹툰</p>
        </NavLink>
        <NavLink
          style={{textDecoration: 'none'}}
          className={`d-flex flex-column align-items-center nav-item ${getTextColor('/finder')}`}
          to="/finder"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '30px' }} />
          <p style={{ margin: 0, fontSize: '14px' }}>찾기</p>
        </NavLink>
        <NavLink
          style={{textDecoration: 'none'}}
          className={`d-flex flex-column align-items-center nav-item ${getTextColor('/locker')}`}
          to="/locker"
        >
          <FontAwesomeIcon icon={faFolder} style={{ fontSize: '30px' }} />
          <p style={{ margin: 0, fontSize: '14px' }}>보관함</p>
        </NavLink>
      </Nav>
    </div>
  );
};

export default BotNav;
