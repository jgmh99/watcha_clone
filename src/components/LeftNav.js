import React from 'react'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
const LeftNav = () => {

  const location = useLocation();

  // 숨길 페이지 경로를 배열로 지정
  const hiddenPages = ['/login', '/join']; // 예시: 로그인 페이지와 회원가입 페이지

  // 현재 경로가 숨길 페이지에 포함되어 있으면 null을 반환하여 숨김
  if (hiddenPages.includes(location.pathname)) {
    return null;
  }
  
  return (
    <div className='leftNavBar ps-3 d-none d-md-block d-lg-block d-xl-block '>
        <Nav className="flex-column">
            <Link  style={{color : 'white'}} to="/subscribe">구독</Link>
            <Link  style={{color : 'white'}} to="/individualPurchase">개별구매</Link>
            <Link  style={{color : 'white'}} to="/webtoon">웹툰</Link>
            <div className='hrLine'/>
            <Link  style={{color : 'white'}} to="/party">파티</Link>
            <Link  style={{color : 'white'}} to="/finder">찾기</Link>
            <Link  style={{color : 'white'}} to="/rating">평가</Link>
            <Link  style={{color : 'white'}} to="/locker">보관함</Link>
        </Nav>
  </div>
  )
}

export default LeftNav