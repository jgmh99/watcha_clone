import React from 'react'
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/WATCHA_Logo/WATCHA_Logo_Main.png'
import MobileLoginBtn from './MobileLoginBtn';


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
      <div className='topNav ps-3 pe-3 pt-2 pb-2 d-flex align-items-center' style={{backgroundColor:'black', border:'none'}}>
        <Nav defaultActiveKey="/" className="flex">
          <Link to="/" className="d-flex align-items-center">
            <img className='logo-img me-2' src={logo} alt="Logo" style={{ width: '10em' }} />
          </Link>
        </Nav>
        <Nav className="flex" style={{fontSize : '16px'}}>
          <Link to="#" className='hidden'>
            <Button style={{backgroundColor:'transparent', border:'none'}} >
              <FontAwesomeIcon icon={faBell} />
            </Button>
          </Link>
          {/* 현재 페이지가 login페이지,이면 회원가입 버튼 안보이게 */}
          {!hideLoginButton && (
            <Link to="/login" className='hidden'>
              <Button variant="dark">로그인</Button>
            </Link>
          )}
          {/* 현재 페이지가 join페이지,이면 회원가입 버튼 안보이게 */}
          {!hideJoinButton && (
            <Link to="/join" className='hidden'>
              <Button style={{ backgroundColor: "rgb(255,4,88)", border: 'none' }}>회원가입</Button>
            </Link>
          )}
          
        </Nav>
        {
          window.innerWidth < 768 ? <MobileLoginBtn/> : null
        }
      </div> 
      : 
      <div className='topNav ps-3 pe-3 pt-2 pb-2 d-flex align-items-center'>
        <Nav defaultActiveKey="/" className="flex">
          <Link to="/" className="d-flex align-items-center">
            <img className='logo-img me-2' src={logo} alt="Logo" style={{ width: '10em' }} />
          </Link>
        </Nav>

        <Nav className="flex navLinks" style={{fontSize : '16px'}}>
          <Link to="/#">
            <Button variant="dark">
              <FontAwesomeIcon icon={faBell} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="dark">로그인</Button>
          </Link>
          <Link to="/join">
            <Button style={{backgroundColor : "rgb(255,4,88)", border:'none'}}>회원가입</Button>
          </Link>
          
        </Nav>
        {
          window.innerWidth < 768 ? <MobileLoginBtn/> : null
        }
      </div>
    }
    </>
    
  );
}

export default TopNav