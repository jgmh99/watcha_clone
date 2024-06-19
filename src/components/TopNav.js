import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import logo from '../img/WATCHA_Logo/WATCHA_Logo_Main.png'

const TopNav = () => {
  const location = useLocation();

  // 숨길 페이지 경로를 배열로 지정
  const hiddenPages = ['/login', '/join']; // 예시: 로그인 페이지와 회원가입 페이지

  // if (hiddenPages.includes(location.pathname)) {
  //   return null;
  // }

  const hideJoinButton = location.pathname === '/join';
  const hideLoginButton = location.pathname === '/login';
  return (
    <>
    {
      hiddenPages.includes(location.pathname) == true ? 
      <div className='topNav ps-3 pe-3 pt-2 pb-2 d-flex justify-content-between align-items-center' style={{backgroundColor:'black', border:'none'}}>
        <Nav defaultActiveKey="/" className="flex">
          <Nav.Link href="/" className="d-flex align-items-center">
            <img className='logo-img me-2' src={logo} alt="Logo" style={{ width: '10em' }} />
          </Nav.Link>
        </Nav>
        <Nav className="flex" style={{fontSize : '16px'}}>
          <Nav.Link href="#">
            <Button style={{backgroundColor:'transparent', border:'none'}} >
              <FontAwesomeIcon icon={faBell} />
            </Button>
          </Nav.Link>
          {/* 현재 페이지가 login페이지,이면 회원가입 버튼 안보이게 */}
          {!hideLoginButton && (
            <Nav.Link href="/login">
            <Button variant="dark">로그인</Button>
          </Nav.Link>
          )}
          {/* 현재 페이지가 join페이지,이면 회원가입 버튼 안보이게 */}
          {!hideJoinButton && (
            <Nav.Link href="/join">
              <Button style={{ backgroundColor: "rgb(255,4,88)", border: 'none' }}>회원가입</Button>
            </Nav.Link>
          )}
        </Nav>
      </div> : 
        <div className='topNav ps-3 pe-3 pt-2 pb-2 d-flex justify-content-between align-items-center'>
        <Nav defaultActiveKey="/" className="flex">
          <Nav.Link href="/" className="d-flex align-items-center">
            <img className='logo-img me-2' src={logo} alt="Logo" style={{ width: '10em' }} />
          </Nav.Link>
        </Nav>
        <Nav className="flex" style={{fontSize : '16px'}}>
          <Nav.Link href="/#">
            <Button variant="dark">
              <FontAwesomeIcon icon={faBell} />
            </Button>
          </Nav.Link>
          <Nav.Link href="/login">
            <Button variant="dark">로그인</Button>
          </Nav.Link>
          <Nav.Link href="/join">
            <Button style={{backgroundColor : "rgb(255,4,88)", border:'none'}}>회원가입</Button>
          </Nav.Link>
        </Nav>
      </div>
    }
    </>
    
  );
}

export default TopNav