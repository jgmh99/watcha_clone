// import React, { useState, useEffect } from 'react';
// import './App.css';

// // import {Alert, Button} from 'react-bootstrap';
// // import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
// // import { Nav } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import Container from 'react-bootstrap/Container';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import { Nav } from 'react-bootstrap';
// //폰트 어썸에서 가져온거
// // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
// // import {faTicket} from '@fortawesome/free-solid-svg-icons';

// import LeftNav from './components/LeftNav';
// import TopNav from './components/TopNav';
// // import MovieCard from './components/MovieCard';
// import {Routes, Route} from 'react-router-dom';
// // import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// import Main from './pages/MainPage.js'
// import Finder from './pages/Finder.js';
// import Webtoon from './pages/WebtoonList.js';
// import IndividualPurchase from './pages/IndividualPurchase.js';
// import Party from './pages/Party.js';
// import Rating from './pages/Rating.js';
// import Locker from './pages/Locker.js';
// import Login from './pages/Login.js';
// import Join from './pages/Join.js';
// import Subscribe from './pages/Subscribe.js';
// import Loginalert from './components/LoginAlert.js'
// import BottomNav from './components/BottomNav.js';
// import Info from './pages/Info';
// import Genre from './pages/Genre';
// import WebtoonInfo from './pages/WebtoonInfo';

// function App() {
//   const [login,setLogin] = useState(false);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //         setLogin(true);
// //     }, 4000);

// //     return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어
// // }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   // 창 크기가 변경될 때마다 상태 업데이트
//   const handleResize = () => {
//     setWindowWidth(window.innerWidth);
//   };

//   useEffect(() => {
//     // 컴포넌트가 마운트될 때와 창 크기 변경 시에 이벤트 리스너 등록
//     window.addEventListener('resize', handleResize);
//     return () => {
//       // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []); // 빈 배열을 넘겨 초기 렌더링 시에만 실행되도록 함
//   return (
//     <div className="App">
//         <TopNav />
//         <div className='container-sec'>
//           <LeftNav />
//           <Routes>
//             <Route path='/' element={<Main/>}/>
//             <Route path='/login' element={<Login/>}/>
//             <Route path='/join' element={<Join/>}/>
            
//             <Route path='/subscribe' element={<Subscribe/>}/>
//             <Route path='/individualPurchase' element={<IndividualPurchase/>}/>
//             <Route path='/webtoon' element={<Webtoon/>}/>
//             <Route path='/party' element={<Party/>}/>
//             <Route path='/finder' element={<Finder/>}/>
//             <Route path='/rating' element={<Rating/>}/>
//             <Route path='/locker' element={<Locker/>}/>
//             <Route path="/info/:movieId" element={<Info />} />
//             <Route path="/genre/:id/:name" element={<Genre/>} />
//             <Route path="/webtoon/:id" element={<WebtoonInfo />} />
//           </Routes>
//           {/* <div className='movie-container'>
//             <MovieCard/>
//           </div > */}
//           {
//             login === false ? <Loginalert/> : null
//           }
//           {windowWidth < 768 && <BottomNav />}
//         </div>
//         {/* <div style={{width:'100%', height:'100px', backgroundColor:'#fff',position:'absolute', bottom:'0'}}>gdgdg</div> */}
        
        
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/MainPage';
import Finder from './pages/Finder';
import Webtoon from './pages/WebtoonList';
import IndividualPurchase from './pages/IndividualPurchase';
import Party from './pages/Party';
import Rating from './pages/Rating';
import Locker from './pages/Locker';
import Login from './pages/Login';
import Join from './pages/Join';
import Subscribe from './pages/Subscribe';
import Loginalert from './components/LoginAlert';
import BottomNav from './components/BottomNav';
import Info from './pages/Info';
import Genre from './pages/Genre';
import WebtoonInfo from './pages/WebtoonInfo';
import InstallPrompt from './components/InstallPrompt';

function App() {
  const [login, setLogin] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const lastDismissed = localStorage.getItem('installPromptDismissed');
    if (lastDismissed) {
      const now = new Date().getTime();
      const dismissTime = new Date(parseInt(lastDismissed)).getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (now - dismissTime > oneWeek) {
        setShowInstallPrompt(true);
      }
    } else {
      setShowInstallPrompt(true);
    }
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleInstallPrompt = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('사용자가 앱 설치를 수락했습니다.');
        } else {
          console.log('사용자가 앱 설치를 거부했습니다.');
        }
        setDeferredPrompt(null);
      });
    }
    setShowInstallPrompt(false);
  };

  const handleClosePrompt = () => {
    localStorage.setItem('installPromptDismissed', new Date().getTime().toString());
    setShowInstallPrompt(false);
  };

  return (
    <div className="App">
      <InstallPrompt 
        show={showInstallPrompt} 
        handleClose={handleClosePrompt} 
        handleInstall={handleInstallClick} 
      />
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
          <Route path="/info/:movieId" element={<Info />} />
          <Route path="/genre/:id/:name" element={<Genre/>} />
          <Route path="/webtoon/:id" element={<WebtoonInfo />} />
        </Routes>
        {
          login === false ? <Loginalert/> : null
        }
        {windowWidth < 768 && (
          <BottomNav />
        )}
      </div>
    </div>
  );
}

export default App;
