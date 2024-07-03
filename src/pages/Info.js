import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../redux/MovieDetailSlice';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import PlusLocker from '../components/PlusLocker';
import PlusEvaluation from '../components/PlusEvaluation';
import PlusParty from '../components/PlusParty';
import PlusMore from '../components/PlusMore';
import Loading from '../components/Loading';

import CharactersInfo from '../components/CharactersInfo';

const Info = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movieDetails.movie); // Redux 상태에서 movie 객체 가져오기
  const status = useSelector((state) => state.movieDetails.status); // Redux 상태에서 status 가져오기
  const error = useSelector((state) => state.movieDetails.error); // Redux 상태에서 error 가져오기

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId)); // 컴포넌트가 마운트되면 영화 정보 가져오기
  }, [dispatch, movieId]);

  console.log(movieId);
  
  useEffect(() => {
    console.log('Movie state:', movie); // Redux 상태 변화를 콘솔에서 확인
  }, [movie]);

  let content;

  if (status === 'loading') {
    content = <Loading/>
  } else if (status === 'succeeded' && movie) {
    // 성공적으로 데이터를 가져오면 영화 정보 표시
    console.log(movie);

    const isDesktop = window.innerWidth >= 768;
    content = (
      <Container fluid>
      {isDesktop ? (
        <Row style={{ boxSizing:'border-box', height:'100%'}}>
          <Col >
            {/* 데스크탑 환경 - 왼쪽 */}
            Left Content
          </Col>
          <Col style={{padding:'0', zIndex:9}}>
            {/* 데스크탑 환경 - 오른쪽 */}
            <img src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt="Right Image" style={{maxWidth: '100%', height: 'auto' }} />
          </Col>
          <div className='info-box' style={{width:'100%',height:'100%',padding:'0px',position:'absolute',zIndex:'99',background: 'linear-gradient(0.25turn, black 50%, transparent),linear-gradient(1turn, black 20%, transparent )', boxSizing:'border-box'}}>
            <div style={{position:'absolute', bottom:'0', width:'50%', padding:'0.5em'}}>
              <h3>{movie.title}</h3>
              <div style={{
                alignItems:'center',
                color:'#babac1',
                display:'flex',
                flexWrap:'wrap',
                fontSize:'15px',
                fontWeight:'400',
                gap:'8px',
                lineHeight:'20px',
                marginBottom:'1em'
              }}>
                <span>{movie.adult == false ? 'All' : '성인'}</span> · 
                <span>{movie.vote_average.toFixed(2)}</span> · 
                <span>{movie.release_date.substring(0,4)}</span> · 
                <span>{movie.runtime}분</span> · 
                <span>{movie.genres[0].name}</span> · 
                <span>{movie.origin_country[0]}</span> · 
              </div>
              
              <p style={{fontSize:'14px', margin:'0'}}>{movie.tagline}
                <span> 
                  <Button onClick={() => setShow(true)} style={{padding:'0 0 0 5px', fontSize:'1em', backgroundColor:'transparent', border:'none', textDecoration:'underLine'}}>
                    더보기
                  </Button>
                </span>
              </p>

              {/* <CharactersInfo/> */}
              
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                style={{marginTop:'10em'}}
              >
                <Modal.Header closeButton style={{border:'none'}}>
                  <Modal.Title id="example-custom-modal-styling-title" >
                    <p style={{fontWeight:'900'}}>{movie.title}</p>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p style={{fontSize:'16px', fontWeight:'700', letterSpacing:'0', lineHeight:'22px'}}>기본정보</p>

                  <div style={{ display:'grid', gap: '12px 10px', gridTemplateColumns: 'minmax(56px, auto) 1fr', gap:'13px'}}>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>개봉연도</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.release_date.substring(0,4)}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>장르</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.genres[0].name}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>국가</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.origin_country[0]}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>상영시간</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.runtime}분</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>평점</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.vote_average.toFixed(2)}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>연령등급</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.adult == false ? 'All' : '성인'}</p>
                  </div>

                  <hr/>

                  <div style={{display:'flex',flexDirection: 'column', gap:'13px'}}>
                    <p style={{fontSize:'16px', fontWeight:'700', letterSpacing:'0', lineHeight:'22px'}}>줄거리</p>
                    <p style={{color:'#babac1', alignSelf:'stretch',fontSize:'13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>{movie.overview}</p>
                  </div>
                </Modal.Body>
              </Modal>
            </div>

            <div style={{width:'50%', position:'absolute', bottom:'0', right:'0', display:'flex', justifyContent: 'space-evenly'}}>
              <PlusLocker/>
              <PlusEvaluation/>
              <PlusParty/>
              <PlusMore/>
            </div>
          </div>

          <div style={{width:'100%',height:'100%', position:'absolute', bottom:'-120%'}}>
            <CharactersInfo movieId={movieId} />
          </div>

        </Row>
      ) : (
        <>
          {/* 모바일 환경 */}
          <Row>
            <Col xs={12} style={{ padding: '0' }}>
              {/* 모바일 환경 - 위쪽 */}
              <img src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt="Top Image" style={{ maxWidth: '100%', height: 'auto' }} />
            </Col>
          </Row>
          <Row style={{position:'absolute', width:'100%', bottom:'-15%', borderBottom:'1px solid #404040', background: 'linear-gradient(0.5turn, black 5%, transparent)',paddingTop:'0.5em'}}>
            <Col xs={12} style={{ height: 'auto', }}>
              {/* 모바일 환경 - 아래쪽 */}
              <h3>{movie.title}</h3>
              <div style={{
                alignItems:'center',
                color:'#babac1',
                display:'flex',
                flexWrap:'wrap',
                fontSize:'12px',
                fontWeight:'400',
                gap:'8px',
                lineHeight:'20px',
                marginBottom:'1em'
              }}>
                <span>{movie.adult == false ? 'All' : '성인'}</span> · 
                <span>{movie.vote_average.toFixed(2)}</span> · 
                <span>{movie.release_date.substring(0,4)}</span> · 
                <span>{movie.runtime}분</span> · 
                <span>{movie.genres[0].name}</span> · 
                <span>{movie.origin_country[0]}</span> · 
              </div>

              <p style={{fontSize:'10px', margin:'0'}}>{movie.tagline}
                <span> 
                  <Button onClick={() => setShow(true)} style={{padding:'0 0 0 5px', fontSize:'1em', backgroundColor:'transparent', border:'none', textDecoration:'underLine', color:'#ff0458'}}>
                    더보기
                  </Button>
                </span>
              </p>
              <div style={{display:'flex', justifyContent: 'space-evenly'}}>
                <PlusLocker/>
                <PlusEvaluation/>
                <PlusParty/>
                <PlusMore/>
              </div>
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                style={{marginTop:'10em'}}
              >
                <Modal.Header closeButton style={{border:'none'}}>
                  <Modal.Title id="example-custom-modal-styling-title" >
                    <p style={{fontWeight:'900'}}>{movie.title}</p>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p style={{fontSize:'16px', fontWeight:'700', letterSpacing:'0', lineHeight:'22px'}}>기본정보</p>

                  <div style={{ display:'grid', gap: '12px 10px', gridTemplateColumns: 'minmax(56px, auto) 1fr', gap:'13px'}}>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>개봉연도</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.release_date.substring(0,4)}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>장르</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.genres[0].name}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>국가</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.origin_country[0]}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>상영시간</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.runtime}분</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>평점</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.vote_average.toFixed(2)}</p>

                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>연령등급</p>
                    <p style={{fontSize: '13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px', color:'#babac1'}}>{movie.adult == false ? 'All' : '성인'}</p>
                  </div>

                  <hr/>

                  <div style={{display:'flex',flexDirection: 'column', gap:'13px'}}>
                    <p style={{fontSize:'16px', fontWeight:'700', letterSpacing:'0', lineHeight:'22px'}}>줄거리</p>
                    <p style={{color:'#babac1', alignSelf:'stretch',fontSize:'13px',fontWeight: '400',letterSpacing: '0',lineHeight: '18px'}}>{movie.overview}</p>
                  </div>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
          <div style={{width:'100%',height:'100%', position:'absolute', bottom:'-140%'}}>
            <CharactersInfo movieId={movieId} />
          </div>
        </>
      )}
      </Container>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>; // 실패 시 에러 메시지 표시
  }

  return (
    <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
        {content}
    </div>
  );
  
};

export default Info;
