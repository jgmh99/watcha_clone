import React, { useState, useEffect } from 'react';
import './App.css';
import {Alert, Button} from 'react-bootstrap';
// import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
// import { Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav } from 'react-bootstrap';
//폰트 어썸에서 가져온거
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faTicket} from '@fortawesome/free-solid-svg-icons';

import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import MovieCard from './components/MovieCard';
import {Routes, Route, Link, useNavigate, Outlet, useLocation} from 'react-router-dom';

import Main from './pages/MainPage.js'
import Finder from './pages/Finder.js';
import Webtoon from './pages/Webtoon.js';
import IndividualPurchase from './pages/IndividualPurchase.js';
import Party from './pages/Party.js';
import Rating from './pages/Rating.js';
import Locker from './pages/Locker.js';
import Login from './pages/Login.js';
import Join from './pages/Join.js';
import Subscribe from './pages/Subscribe.js';
import Loginalert from './components/LoginAlert.js'



function App() {
  const [login,setLogin] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//         setLogin(true);
//     }, 4000);

//     return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어
// }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <div className="App">
        <TopNav />
        <div className='container-sec'>
          <LeftNav />
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/join' element={<Join/>}/>
            
            <Route path='/subscribe' element={<Subscribe/>}/>
            <Route path='/individualPurchase' element={<IndividualPurchase/>}/>
            <Route path='/webtoon' element={<Webtoon/>}/>
            <Route path='/party' element={<Party/>}/>
            <Route path='/finder' element={<Finder/>}/>
            <Route path='/rating' element={<Rating/>}/>
            <Route path='/locker' element={<Locker/>}/>
          </Routes>
          {/* <div className='movie-container'>
            <MovieCard/>
          </div > */}
          {
            login == false ? <Loginalert/> : null
          }
        </div>
        
    </div>
  );
}

export default App;
