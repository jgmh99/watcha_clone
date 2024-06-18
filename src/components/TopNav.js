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

  // 현재 경로가 숨길 페이지에 포함되어 있으면 null을 반환하여 숨김
  
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