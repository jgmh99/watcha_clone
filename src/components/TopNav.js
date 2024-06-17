import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from '@fortawesome/free-solid-svg-icons';

const TopNav = () => {
  return (
    <div className='topNav ms-3 me-3 pt-2 pb-2'>
        <Nav defaultActiveKey="/" className="flex">
            <Nav.Link href="/">Watcha</Nav.Link>
            <Nav.Link href="/login">로그인</Nav.Link>
            <Nav.Link href="/join">회원가입</Nav.Link>
        </Nav>
    </div>
  )
}

export default TopNav