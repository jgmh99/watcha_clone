import React from 'react'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const LeftNav = () => {
  return (
    <div className='leftNavBar ms-3' >
        <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link  style={{color : 'white'}} href="/subscribe">구독</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/individualPurchase">개별구매</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/webtoon">웹툰</Nav.Link>
            <div className='hrLine'/>
            <Nav.Link  style={{color : 'white'}} href="/party">파티</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/finder">찾기</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/rating">평가</Nav.Link>
            <Nav.Link  style={{color : 'white'}} href="/locker">보관함</Nav.Link>
        </Nav>
  </div>
  )
}

export default LeftNav