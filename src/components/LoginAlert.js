import React, { useState } from 'react';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Nav } from 'react-bootstrap';
import {Alert} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
const LoginAlert = () => {
    const [login,setLogin] = useState(false);
    const location = useLocation();

    // 숨길 페이지 경로를 배열로 지정
    const hiddenPages = ['/login', '/join']; // 예시: 로그인 페이지와 회원가입 페이지
  
    // 현재 경로가 숨길 페이지에 포함되어 있으면 null을 반환하여 숨김
    if (hiddenPages.includes(location.pathname)) {
      return null;
    }
    return (
        <Alert variant="danger" className='alert-box' style={{backgroundColor:'#ff0458', border:'none', color:'#fff', zIndex:'9999'}} onClose={() => setLogin(false)} dismissible >
            <Alert.Heading>
                <FontAwesomeIcon icon={faTicket} />
                <b> 매주 500편 이상 신작 업데이트!</b>
            </Alert.Heading>
            <h6>지금 구독 시작하고 모든 콘텐츠를 무제한 감상해보세요</h6>
            <Nav>
                <Nav.Link style={{color : 'white', textDecoration:'underLine'}} href="/subscribe">구독 시작하기</Nav.Link>
            </Nav> 
        </Alert>
    )
}

export default LoginAlert