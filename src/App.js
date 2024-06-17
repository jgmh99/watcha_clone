import React from 'react';
import './App.css';

// import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
// import { Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//폰트 어썸에서 가져온거
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import MovieCard from './components/MovieCard';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

import Main from './pages/MainPage.js'
import Finder from './pages/Finder.js';
import Webtoon from './pages/Webtoon.js';
import IndividualPurchase from './pages/IndividualPurchase.js';
import Party from './pages/Party.js';
import Rating from './pages/Rating.js';
import Locker from './pages/Locker.js';
import Login from './pages/Login.js';
import Join from './pages/Join.js';

function App() {
  return (
    <div className="App">
      ㅎㅇㅎㅇㅎㅇ
        <TopNav />
        <div className='container-sec'>
          <LeftNav />
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/join' element={<Join/>}/>
            
            <Route path='/subscribe' element={<Finder/>}/>
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
        </div>
        
    </div>
  );
}

export default App;
