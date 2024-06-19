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

  return (
    <div className='botNav ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center'>
        <Nav defaultActiveKey="/" className="flex-row">
            <Nav.Link  style={{color : 'white'}} href="/subscribe">구독</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/individualPurchase">개별구매</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/webtoon">웹툰</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/finder">찾기</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/locker">보관함</Nav.Link>
        </Nav>
    </div>
  );
}

export default TopNav